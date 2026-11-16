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

  const reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  const stackHtml = () => `
    <section class="stack" id="stack" style="--n:${P.length}">
      <div class="stage">
        <div class="trail" id="trail"></div>
        <div class="st-top"><span id="cur"></span></div>
        <h1 class="st-title">MAICON<br>MOURA</h1>
        <p class="st-tag">Designer &amp; visual storyteller. Marcas com personalidade, estratégia e histórias para contar.</p>
        <div class="st-cards" id="cards">${P.map((p, i) => `<a class="sc" data-i="${i}" href="#/projeto/${p.slug}" aria-label="${esc(p.title)}"><img src="${img(coverOf(p))}" alt="${esc(p.title)}" ${i > 6 ? 'loading="lazy"' : ""} decoding="async"></a>`).join("")}</div>
        <a class="st-hint" href="#/" data-scroll="trabalhos">Role para ver os projetos ↓</a>
      </div>
    </section>`;

  function card(p){
    return `<a class="card rv" href="#/projeto/${p.slug}">
      <div class="im"><img src="${img(coverOf(p))}" alt="${esc(p.title)}" loading="lazy"></div>
      <h3>${esc(p.title)}</h3><p>${esc(p.category)} · ${esc(p.date)}</p></a>`;
  }
  let mode = "list"; try { mode = localStorage.getItem("mm-view2") || "list"; } catch(e){}
  function listBody(){
    return mode === "list"
      ? `<ul class="list">${P.map((p)=>`<li><a href="#/projeto/${p.slug}" data-peek="${esc(img(coverOf(p)))}"><b>${esc(p.title)}</b><span>${esc(p.category)} · ${esc(p.date)}</span></a></li>`).join("")}</ul>`
      : `<div class="grid">${P.map(card).join("")}</div>`;
  }
  function home(){
    app.innerHTML = stackHtml() + `<section class="wrap" id="trabalhos"><h2 class="sec-title">Trabalhos selecionados</h2>
      <div class="view" role="group" aria-label="Modo de exibição"><button data-view="list" class="${mode==="list"?"on":""}">Lista</button><button data-view="grid" class="${mode==="grid"?"on":""}">Grade</button></div><div id="lw">${listBody()}</div></section>`;
    initStack();
  }
  // pilha 3D: ao rolar, as capas passam em perspectiva, uma na frente da outra
  let stackRaf = 0;
  function initStack(){
    const sec = $("#stack"), cards = [...document.querySelectorAll(".sc")], cur = $("#cur"), top = $(".top");
    if(!sec) return;
    const N = P.length; let p = 0, target = 0;
    const STEP = 0.5; // altura de rolagem por projeto, em telas
    const R = 0.8;
    function dims(){ const vh = window.innerHeight; return { vh, w: Math.min(Math.max(vh * .62, 260), window.innerWidth * (window.innerWidth < 700 ? .74 : .38), 580) }; }
    let dm = dims();
    function layout(){
      dm = dims(); sec.style.height = (dm.vh + N * STEP * dm.vh) + "px";
      cards.forEach((c) => { c.style.width = dm.w + "px"; c.style.height = dm.w * .8 + "px"; });
    }
    function place(){
      const H = dm.vh, h = dm.w * .8, y0 = H * .70;
      cards.forEach((c, i) => {
        const d = i - p; let yc, sc, op, bl;
        if(d >= 0){ sc = Math.pow(R, d); yc = y0 - H * .24 * (1 - Math.pow(R, d)) / (1 - R); op = d > 7 ? 0 : 1; bl = Math.min(d * 1.1, 8); }
        else { const k = -d; sc = 1 + k * .22; yc = y0 + k * H * .75; op = Math.max(0, 1 - k * 1.25); bl = k * 6; }
        c.style.display = op <= 0.01 ? "none" : "block";
        c.style.opacity = op; c.style.zIndex = 1000 - Math.round(d * 10);
        c.style.pointerEvents = (d > -.4 && d < .6) ? "auto" : "none";
        c.style.filter = bl > .3 ? `blur(${bl.toFixed(1)}px)` : "none";
        c.style.transform = `translate3d(-50%, ${(yc - h / 2).toFixed(1)}px, 0) rotateX(${Math.max(0, 14 - Math.max(d, 0) * 0)}deg) scale(${sc.toFixed(4)})`;
      });
      const k = Math.min(N - 1, Math.max(0, Math.round(p))); const pr = P[k];
      cur.textContent = pr.title + " · " + pr.date;
      const over = sec.getBoundingClientRect().bottom > 80;
      top.classList.toggle("dark", over);
    }
    function read(){ const r = sec.getBoundingClientRect(); target = Math.min(N - 1, Math.max(0, -r.top / (dm.vh * STEP))); }
    function tick(){ p += (target - p) * .14; if(Math.abs(target - p) < .002) p = target; place(); stackRaf = (p !== target) ? requestAnimationFrame(tick) : 0; }
    function onScroll(){ read(); if(!stackRaf) stackRaf = requestAnimationFrame(tick); }
    layout(); read(); p = target; place();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", () => { layout(); read(); place(); });
    sec._off = () => { window.removeEventListener("scroll", onScroll); top.classList.remove("dark"); cancelAnimationFrame(stackRaf); stackRaf = 0; };
  }
  function about(){
    const a = D.about;
    app.innerHTML = `<section class="wrap fade"><div class="about">
      <img class="ph" src="${img(a.photo)}" alt="Maicon Moura">
      <div><h1>${a.headingLines.map(esc).join("<br>")}</h1>
        <p class="bio">${esc(a.bio)}</p>
        <div class="stats">${a.stats.map((s)=>`<div><span>${esc(s.label)}</span><b>${esc(s.value)}</b></div>`).join("")}</div>
        <ul class="svc">${D.services.items.map((s)=>`<li><b>${esc(s.title)}</b><span>${esc(s.description)}</span></li>`).join("")}</ul>
      </div></div></section>`;
  }
  function contact(){
    const L = [
      ["E-mail", S.email, "mailto:" + S.email],
      ["WhatsApp", S.phoneDisplay, S.phoneHref],
      ["Behance", "behance.net/maiconsmoura", "https://www.behance.net/maiconsmoura"],
      ["LinkedIn", "linkedin.com/in/maiconsmoura", "https://www.linkedin.com/in/maiconsmoura/"],
      ["Pedir orçamento", "Formulário", S.dockCtaUrl],
    ];
    app.innerHTML = `<section class="wrap contact fade"><h1 class="sec-title" style="margin-top:0">Vamos conversar</h1>
      <ul class="links">${L.map(([k,v,h])=>`<li><a href="${esc(h)}" ${h.startsWith("http")?'target="_blank" rel="noopener"':""}><span>${esc(v)}</span><i>↗</i></a></li>`).join("")}</ul></section>`;
  }
  function project(slug){
    const i = P.findIndex((p) => p.slug === slug); const p = P[i];
    if(!p){ location.hash = "#/"; return; }
    const nx = P[(i + 1) % P.length];
    const cr = (p.credits || []).map((c)=>`<div><span>${esc(c.role)}</span><b>${esc(c.name)}</b></div>`).join("");
    const blocks = [["Visão geral", p.overview], ["Desafio", p.challenge], ["Solução", p.solution]]
      .filter((b)=>b[1]).map(([h,t])=>`<div class="txt"><h2>${h}</h2><div>${paras(t)}</div></div>`).join("");
    app.innerHTML = `<article class="wrap fade"><div class="proj"><h1>${esc(p.title)}</h1>
      <div class="meta"><div><span>Categoria</span><b>${esc(p.category)}</b></div><div><span>Ano</span><b>${esc(p.date)}</b></div>${cr}</div>${blocks}</div>
      <div class="gal">${(p.gallery||[]).map((g)=>`<img src="${img(g)}" alt="${esc(p.title)}" loading="lazy">`).join("")}</div>
      <a class="next" href="#/projeto/${nx.slug}"><small>Próximo projeto</small><b>${esc(nx.title)} →</b></a></article>`;
  }

  const io = "IntersectionObserver" in window ? new IntersectionObserver((es) => es.forEach((e) => { if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" }) : null;
  function reveal(){ document.querySelectorAll(".rv").forEach((el) => io ? io.observe(el) : el.classList.add("in")); }

  function route(){
    const old = $("#stack"); if(old && old._off) old._off(); $(".top").classList.remove("dark");
    const h = location.hash.replace(/^#\/?/, "");
    const [r, arg] = h.split("/");
    document.querySelectorAll("[data-nav]").forEach((a)=>a.classList.remove("on"));
    if(r === "sobre"){ about(); $('[data-nav=about]').classList.add("on"); document.title = "Sobre — " + S.ownerName; }
    else if(r === "contato"){ contact(); $('[data-nav=contact]').classList.add("on"); document.title = "Contato — " + S.ownerName; }
    else if(r === "projeto"){ project(arg); const p = P.find((x)=>x.slug===arg); if(p) document.title = p.title + " — Maicon Moura"; $('[data-nav=work]').classList.add("on"); }
    else { home(); $('[data-nav=work]').classList.add("on"); document.title = S.title; }
    reveal();
    if(r !== "" ) window.scrollTo(0, 0);
  }
  $("#foot").innerHTML = `<span>© ${new Date().getFullYear()} Maicon Moura</span><span>${esc(S.ownerRole)}</span>`;
  document.addEventListener("click", (e) => { const a = e.target.closest("[data-scroll]"); if(a){ e.preventDefault(); document.getElementById(a.dataset.scroll).scrollIntoView({behavior:"smooth"}); } });
  document.addEventListener("click", (e) => { const b = e.target.closest("[data-view]"); if(b){ mode = b.dataset.view; try { localStorage.setItem("mm-view2", mode); } catch(x){} document.querySelectorAll("[data-view]").forEach((x)=>x.classList.toggle("on", x.dataset.view === mode)); $("#lw").innerHTML = listBody(); reveal(); } });
  // trilha de fotos: ao passar o mouse sobre o título da home, as capas dos projetos surgem no cursor
  const fine = window.matchMedia("(hover:hover) and (pointer:fine)").matches && !window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  let lx = -999, ly = -999, ti = 0;
  document.addEventListener("mousemove", (e) => {
    if(!fine) return;
    const hero = e.target.closest && e.target.closest(".st-title"); const trail = $("#trail");
    if(!hero || !trail) return;
    if(Math.hypot(e.clientX - lx, e.clientY - ly) < 90) return;
    lx = e.clientX; ly = e.clientY;
    const r = trail.getBoundingClientRect(); const p = P[ti++ % P.length];
    const im = document.createElement("img"); im.src = img(coverOf(p)); im.alt = ""; im.decoding = "async";
    im.style.left = (e.clientX - r.left) + "px"; im.style.top = (e.clientY - r.top) + "px"; im.style.setProperty("--r", (Math.random() * 14 - 7).toFixed(1) + "deg");
    trail.appendChild(im); setTimeout(() => im.remove(), 1500);
    while(trail.children.length > 14) trail.firstChild.remove();
  });
  const peek = document.createElement("div"); peek.className = "peek"; peek.innerHTML = "<img alt=''>"; document.body.appendChild(peek);
  const pimg = peek.firstChild; let px = 0, py = 0, tx = 0, ty = 0, raf = 0;
  function loop(){ px += (tx - px) * .16; py += (ty - py) * .16; peek.style.left = px + "px"; peek.style.top = py + "px"; raf = peek.classList.contains("on") ? requestAnimationFrame(loop) : 0; }
  document.addEventListener("mousemove", (e) => { tx = e.clientX + 40; ty = e.clientY; });
  document.addEventListener("mouseover", (e) => {
    const a = e.target.closest("[data-peek]");
    if(a){ if(pimg.getAttribute("src") !== a.dataset.peek) pimg.src = a.dataset.peek; if(!peek.classList.contains("on")){ px = tx; py = ty; peek.classList.add("on"); if(!raf) raf = requestAnimationFrame(loop); } }
    else peek.classList.remove("on");
  });
  window.addEventListener("hashchange", () => peek.classList.remove("on"));
  window.addEventListener("hashchange", route);
  route();
})();
