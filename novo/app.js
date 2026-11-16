(function(){
  const D = window.PORTFOLIO_DATA, S = D.siteConfig;
  // do mais novo para o mais antigo (empate mantém a ordem do data.js)
  const P = D.projects.map((p, i) => [p, i]).sort((a, b) => (parseInt(b[0].date, 10) || 0) - (parseInt(a[0].date, 10) || 0) || a[1] - b[1]).map((x) => x[0]);
  const A = "../";
  const $ = (s) => document.querySelector(s);
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const paras = (t) => String(t).split(/\n\n+/).map((x) => `<p>${esc(x)}</p>`).join("");
  const img = (src) => A + src;
  const coverOf = (p) => p.cover || p.icon || (p.gallery && p.gallery[0]);
  const app = $("#app");
  // categorias do filtro (agrupam as categorias detalhadas de cada projeto)
  const groupOf = (p) => /Editorial|Capas|Dire[cç][aã]o/i.test(p.category) ? "Editorial" : /S[ií]mbolos|Iconografia|Ilustra[cç][aã]o de Marca|Explora/i.test(p.category) ? "Símbolos & Ilustração" : "Identidade Visual";
  const short = (t) => { const s = String(t || "").split(/\n\n/)[0]; const first = s.split(/(?<=[.!?])\s/)[0]; return (first.length > 130 ? first.slice(0, 127).replace(/\s+\S*$/, "") + "…" : first); };
  let off = null;

  /* ---------- HOME: carrossel em arco ---------- */
  function home(){
    app.innerHTML = `<section class="arc" id="arc"><div class="stage">
        <div class="a-info" id="ai"><h2></h2><p></p><small></small></div>
        <div class="a-cat" id="ac"></div>
        <div class="a-cards">${P.map((p, i) => `<a class="ac" data-i="${i}" href="#/projeto/${p.slug}" aria-label="${esc(p.title)}"><img src="${img(coverOf(p))}" alt="${esc(p.title)}" ${i > 5 ? 'loading="lazy"' : ""} decoding="async"></a>`).join("")}</div>
        <div class="a-hint">Role para navegar</div>
      </div></section>`;
    const sec = $("#arc"), cards = [...document.querySelectorAll(".ac")], ai = $("#ai"), acat = $("#ac");
    const N = P.length, STEP = .42; let p = 0, target = 0, raf = 0, shown = -1, W = 0, vh = 0, cw = 0;
    function size(){
      vh = window.innerHeight; W = window.innerWidth;
      cw = Math.min(vh * .43, W * (W < 700 ? .56 : .3), 380);
      sec.style.height = (vh + (N - 1) * STEP * vh) + "px";
      cards.forEach((c) => { c.style.width = cw + "px"; c.style.height = cw + "px"; });
    }
    function setInfo(k){
      if(k === shown) return; shown = k; const pr = P[k];
      ai.classList.add("sw"); acat.classList.add("sw");
      setTimeout(() => { ai.querySelector("h2").textContent = pr.title; ai.querySelector("p").textContent = short(pr.overview); ai.querySelector("small").textContent = pr.date; acat.textContent = pr.category; ai.classList.remove("sw"); acat.classList.remove("sw"); }, 120);
    }
    function place(){
      const yc = vh * .5 - cw / 2 - vh * .02;
      cards.forEach((c, i) => {
        const d = i - p, a = Math.abs(d);
        if(a > 3.4){ c.style.display = "none"; return; }
        const sc = Math.pow(.74, a), x = d * cw * 1.25 * (1 - .06 * Math.min(a, 3)), y = yc + a * vh * .097, rot = d * 7;
        c.style.display = "block"; c.style.zIndex = 100 - Math.round(a * 10);
        c.style.transform = `translate3d(calc(-50% + ${x.toFixed(1)}px), ${y.toFixed(1)}px, 0) rotate(${rot.toFixed(2)}deg) scale(${sc.toFixed(4)})`;
        c.style.opacity = a > 2.8 ? Math.max(0, (3.4 - a) / .6) : 1;
      });
      setInfo(Math.min(N - 1, Math.max(0, Math.round(p))));
    }
    function read(){ const r = sec.getBoundingClientRect(); target = Math.min(N - 1, Math.max(0, -r.top / (vh * STEP))); }
    function tick(){ p += (target - p) * .12; if(Math.abs(target - p) < .002) p = target; place(); raf = p !== target ? requestAnimationFrame(tick) : 0; }
    function onScroll(){ read(); if(!raf) raf = requestAnimationFrame(tick); }
    function onResize(){ size(); read(); place(); }
    // clicar numa capa lateral leva ela ao centro; a do centro abre o projeto
    sec.addEventListener("click", (e) => {
      const c = e.target.closest(".ac"); if(!c) return;
      const i = +c.dataset.i; if(Math.abs(i - p) < .35) return;
      e.preventDefault(); const top = sec.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + i * STEP * vh, behavior: "smooth" });
    });
    size(); read(); p = target; place();
    window.addEventListener("scroll", onScroll, { passive: true }); window.addEventListener("resize", onResize);
    off = () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); cancelAnimationFrame(raf); };
  }

  /* ---------- TRABALHOS: duas colunas + filtro ---------- */
  function wcard(p){
    return `<a class="wc rv" href="#/projeto/${p.slug}"><div class="im"><img src="${img(coverOf(p))}" alt="${esc(p.title)}" loading="lazy"></div>
      <div class="cap"><h3>${esc(p.title)}</h3><span>${esc(p.category)} · ${esc(p.date)}</span></div></a>`;
  }
  function works(){
    const groups = ["Todos", "Identidade Visual", "Editorial", "Símbolos & Ilustração"];
    const count = (g) => g === "Todos" ? P.length : P.filter((p) => groupOf(p) === g).length;
    app.innerHTML = `<section class="wrap page fade"><div class="works">
        <div class="col l" id="cl"></div>
        <ul class="filter" role="group" aria-label="Filtrar por categoria">${groups.filter((g) => count(g) > 0).map((g, i) => `<li><button data-g="${esc(g)}" class="${i === 0 ? "on" : ""}">${esc(g)}<sup>(${count(g)})</sup></button></li>`).join("")}</ul>
        <div class="col r" id="cr"></div></div></section>`;
    function render(g){
      const list = g === "Todos" ? P : P.filter((p) => groupOf(p) === g);
      $("#cl").innerHTML = list.filter((_, i) => i % 2 === 0).map(wcard).join("");
      $("#cr").innerHTML = list.filter((_, i) => i % 2 === 1).map(wcard).join("");
      reveal();
    }
    app.querySelector(".filter").addEventListener("click", (e) => {
      const b = e.target.closest("button"); if(!b) return;
      app.querySelectorAll(".filter button").forEach((x) => x.classList.toggle("on", x === b)); render(b.dataset.g);
    });
    render("Todos");
  }

  /* ---------- SOBRE / CONTATO / PROJETO ---------- */
  function about(){
    const a = D.about;
    app.innerHTML = `<section class="wrap page fade"><div class="about">
      <img class="ph" src="${img(a.photo)}" alt="Maicon Moura">
      <div><h1>${a.headingLines.map(esc).join("<br>")}</h1>
        <p class="bio">${esc(a.bio)}</p>
        <div class="stats">${a.stats.map((s)=>`<div><span>${esc(s.label)}</span><b>${esc(s.value)}</b></div>`).join("")}</div>
        <ul class="svc">${D.services.items.map((s)=>`<li><b>${esc(s.title)}</b><span>${esc(s.description)}</span></li>`).join("")}</ul>
      </div></div></section>`;
  }
  function contact(){
    const L = [
      [S.email, "mailto:" + S.email], [S.phoneDisplay, S.phoneHref],
      ["behance.net/maiconsmoura", "https://www.behance.net/maiconsmoura"],
      ["linkedin.com/in/maiconsmoura", "https://www.linkedin.com/in/maiconsmoura/"],
      ["Pedir orçamento", S.dockCtaUrl],
    ];
    app.innerHTML = `<section class="wrap page contact fade"><h1>Vamos conversar</h1>
      <ul class="links">${L.map(([v,h])=>`<li><a href="${esc(h)}" ${h.startsWith("http")?'target="_blank" rel="noopener"':""}><span>${esc(v)}</span><i>↗</i></a></li>`).join("")}</ul></section>`;
  }
  function project(slug){
    const i = P.findIndex((p) => p.slug === slug); const p = P[i];
    if(!p){ location.hash = "#/trabalhos"; return; }
    const nx = P[(i + 1) % P.length];
    const cr = (p.credits || []).map((c)=>`<div><span>${esc(c.role)}</span><b>${esc(c.name)}</b></div>`).join("");
    const blocks = [["Visão geral", p.overview], ["Desafio", p.challenge], ["Solução", p.solution]]
      .filter((b)=>b[1]).map(([h,t])=>`<div class="txt"><h2>${h}</h2><div>${paras(t)}</div></div>`).join("");
    app.innerHTML = `<article class="wrap page fade"><div class="proj"><h1>${esc(p.title)}</h1>
      <div class="meta"><div><span>Categoria</span><b>${esc(p.category)}</b></div><div><span>Ano</span><b>${esc(p.date)}</b></div>${cr}</div>${blocks}</div>
      <div class="gal">${(p.gallery||[]).map((g)=>`<img src="${img(g)}" alt="${esc(p.title)}" loading="lazy">`).join("")}</div>
      <a class="next" href="#/projeto/${nx.slug}"><small>Próximo projeto</small><b>${esc(nx.title)} →</b></a></article>`;
  }

  const io = "IntersectionObserver" in window ? new IntersectionObserver((es) => es.forEach((e) => { if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -6% 0px" }) : null;
  function reveal(){ document.querySelectorAll(".rv").forEach((el) => io ? io.observe(el) : el.classList.add("in")); }

  function route(){
    if(off){ off(); off = null; }
    const [r, arg] = location.hash.replace(/^#\/?/, "").split("/");
    document.querySelectorAll("[data-nav]").forEach((a) => a.classList.remove("on"));
    const on = (k) => $(`[data-nav=${k}]`).classList.add("on");
    document.body.classList.toggle("home", !r);
    if(r === "sobre"){ about(); on("about"); document.title = "Sobre — " + S.ownerName; }
    else if(r === "contato"){ contact(); on("contact"); document.title = "Contato — " + S.ownerName; }
    else if(r === "trabalhos"){ works(); on("work"); document.title = "Trabalhos — " + S.ownerName; }
    else if(r === "projeto"){ project(arg); const p = P.find((x) => x.slug === arg); if(p) document.title = p.title + " — Maicon Moura"; on("work"); }
    else { home(); on("home"); document.title = S.title; }
    reveal();
    window.scrollTo(0, 0);
  }
  $("#foot").innerHTML = `<span>© ${new Date().getFullYear()} Maicon Moura</span><span>${esc(S.ownerRole)}</span>`;
  window.addEventListener("hashchange", route);
  route();
})();
