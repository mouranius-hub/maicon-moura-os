(function(){
  const D = window.PORTFOLIO_DATA, S = D.siteConfig;
  // do mais novo para o mais antigo (empate mantém a ordem do data.js)
  const P = D.projects.map((p, i) => [p, i]).sort((a, b) => (parseInt(b[0].date, 10) || 0) - (parseInt(a[0].date, 10) || 0) || a[1] - b[1]).map((x) => x[0]);
  const A = (document.currentScript && document.currentScript.getAttribute("data-base")) || "";
  const $ = (s) => document.querySelector(s);
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const paras = (t) => String(t).split(/\n\n+/).map((x) => `<p>${esc(x)}</p>`).join("");
  const img = (src) => A + src;
  const coverOf = (p) => p.cover || p.icon || (p.gallery && p.gallery[0]);
  const app = $("#app");

  const hero = `
    <section class="hero fade" id="hero"><div class="trail" id="trail"></div>
      <small>${esc(S.ownerName)}</small>
      <h1>${D.about.headingLines.map(esc).join("<br>")}</h1>
      <p>Crio marcas com personalidade, estratégia e histórias para contar.</p>
      <a class="cue" href="#/" data-scroll="trabalhos">Trabalhos selecionados ↓</a>
    </section>`;

  function card(p){
    return `<a class="card rv" href="#/projeto/${p.slug}">
      <div class="im"><img src="${img(coverOf(p))}" alt="${esc(p.title)}" loading="lazy"></div>
      <h3>${esc(p.title)}</h3><p>${esc(p.category)} · ${esc(p.date)}</p></a>`;
  }
  let mode = "list"; try { mode = localStorage.getItem("mm-view2") || "list"; } catch(e){}
  function home(){
    const all = P;
    const body = mode === "list"
      ? `<ul class="list">${all.map((p)=>`<li><a href="#/projeto/${p.slug}" data-peek="${esc(img(coverOf(p)))}"><b>${esc(p.title)}</b><span>${esc(p.category)} · ${esc(p.date)}</span></a></li>`).join("")}</ul>`
      : `<div class="grid">${all.map(card).join("")}</div>`;
    app.innerHTML = hero + `<section class="wrap" id="trabalhos"><h2 class="sec-title">Trabalhos selecionados</h2>
      <div class="view" role="group" aria-label="Modo de exibição"><button data-view="list" class="${mode==="list"?"on":""}">Lista</button><button data-view="grid" class="${mode==="grid"?"on":""}">Grade</button></div>${body}</section>`;
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
  const soc = [["Acervo", "https://acervo.maiconmoura.com/"], ["Behance", "https://www.behance.net/maiconsmoura"], ["LinkedIn", "https://www.linkedin.com/in/maiconsmoura/"], ["WhatsApp", S.phoneHref], ["E-mail", "mailto:" + S.email], ["Pedir orçamento", S.dockCtaUrl]];
  $("#foot").innerHTML = `<div class="f-in">
      <div class="f-big" id="fbig" aria-hidden="true">Maicon Moura</div>
      <div class="f-cols">
        <div>${soc.map(([n, h]) => `<a href="${esc(h)}" target="_blank" rel="noopener">${n}</a>`).join("")}</div>
        <div><a href="#/">Trabalhos</a><a href="#/sobre">Sobre</a><a href="#/contato">Contato</a></div>
      </div>
      <div class="f-base"><span>Maicon Moura ${new Date().getFullYear()}</span><span>Todos os direitos reservados©</span></div></div>`;
  function fit(){ const el = $("#fbig"); if(!el) return; el.style.fontSize = "100px"; const box = el.parentElement.clientWidth - parseFloat(getComputedStyle(el.parentElement).paddingLeft) * 2; el.style.fontSize = (100 * box / el.scrollWidth) + "px"; }
  fit(); window.addEventListener("resize", fit); if(document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  document.addEventListener("click", (e) => { const a = e.target.closest("[data-scroll]"); if(a){ e.preventDefault(); document.getElementById(a.dataset.scroll).scrollIntoView({behavior:"smooth"}); } });
  document.addEventListener("click", (e) => { const b = e.target.closest("[data-view]"); if(b){ mode = b.dataset.view; try { localStorage.setItem("mm-view2", mode); } catch(x){} const y = window.scrollY; home(); reveal(); window.scrollTo(0, y); } });
  // trilha de fotos: ao passar o mouse sobre o título da home, as capas dos projetos surgem no cursor
  const fine = window.matchMedia("(hover:hover) and (pointer:fine)").matches && !window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  let lx = -999, ly = -999, ti = 0;
  document.addEventListener("mousemove", (e) => {
    if(!fine) return;
    const hero = e.target.closest && e.target.closest("#hero"); const trail = $("#trail");
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
