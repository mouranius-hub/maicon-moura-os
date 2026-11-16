(function(){
  const D = window.PORTFOLIO_DATA, S = D.siteConfig, P = D.projects;
  const A = "../";
  const $ = (s) => document.querySelector(s);
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const paras = (t) => String(t).split(/\n\n+/).map((x) => `<p>${esc(x)}</p>`).join("");
  const img = (src) => A + src;
  const coverOf = (p) => p.cover || p.icon || (p.gallery && p.gallery[0]);
  const app = $("#app");

  const hero = `
    <section class="hero fade">
      <small>${esc(S.ownerName)}</small>
      <h1>${D.about.headingLines.map(esc).join("<br>")}</h1>
      <p>Crio marcas com personalidade, estratégia e histórias para contar.</p>
      <a class="cue" href="#/" data-scroll="trabalhos">Trabalhos selecionados ↓</a>
    </section>`;

  function card(p){
    return `<a class="card" href="#/projeto/${p.slug}">
      <div class="im"><img src="${img(coverOf(p))}" alt="${esc(p.title)}" loading="lazy"></div>
      <h3>${esc(p.title)}</h3><p>${esc(p.category)} · ${esc(p.date)}</p></a>`;
  }
  function home(){
    // novos primeiro: quem tem desktopSlot (os destaques) vem antes, depois o resto
    const feat = P.filter((p) => p.desktopSlot !== null && p.desktopSlot !== undefined).sort((a,b)=>a.desktopSlot-b.desktopSlot);
    const rest = P.filter((p) => !feat.includes(p));
    app.innerHTML = hero + `<section class="wrap" id="trabalhos"><h2 class="sec-title">Trabalhos selecionados</h2><div class="grid">${feat.concat(rest).map(card).join("")}</div></section>`;
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

  function route(){
    const h = location.hash.replace(/^#\/?/, "");
    const [r, arg] = h.split("/");
    document.querySelectorAll("[data-nav]").forEach((a)=>a.classList.remove("on"));
    if(r === "sobre"){ about(); $('[data-nav=about]').classList.add("on"); document.title = "Sobre — " + S.ownerName; }
    else if(r === "contato"){ contact(); $('[data-nav=contact]').classList.add("on"); document.title = "Contato — " + S.ownerName; }
    else if(r === "projeto"){ project(arg); const p = P.find((x)=>x.slug===arg); if(p) document.title = p.title + " — Maicon Moura"; $('[data-nav=work]').classList.add("on"); }
    else { home(); $('[data-nav=work]').classList.add("on"); document.title = S.title; }
    if(r !== "" ) window.scrollTo(0, 0);
  }
  $("#foot").innerHTML = `<span>© ${new Date().getFullYear()} Maicon Moura</span><span>${esc(S.ownerRole)}</span>`;
  document.addEventListener("click", (e) => { const a = e.target.closest("[data-scroll]"); if(a){ e.preventDefault(); document.getElementById(a.dataset.scroll).scrollIntoView({behavior:"smooth"}); } });
  window.addEventListener("hashchange", route);
  route();
})();
