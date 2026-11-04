(function () {
  "use strict";

  const DATA = window.PORTFOLIO_DATA;
  if (!DATA) return;

  const DOCK_ICONS = {
    behance: `<svg viewBox="0 0 30 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M18.83,14.38a2.78,2.78,0,0,0,.65,1.9,2.31,2.31,0,0,0,1.7.59,2.31,2.31,0,0,0,1.38-.41,1.79,1.79,0,0,0,.71-0.87h2.31a4.48,4.48,0,0,1-1.71,2.53,5,5,0,0,1-2.78.76,5.53,5.53,0,0,1-2-.37,4.34,4.34,0,0,1-1.55-1,4.77,4.77,0,0,1-1-1.63,6.29,6.29,0,0,1,0-4.13,4.83,4.83,0,0,1,1-1.64A4.64,4.64,0,0,1,19.09,9a4.86,4.86,0,0,1,2-.4A4.5,4.5,0,0,1,23.21,9a4.36,4.36,0,0,1,1.5,1.3,5.39,5.39,0,0,1,.84,1.86,7,7,0,0,1,.18,2.18h-6.9Zm3.67-3.24A1.94,1.94,0,0,0,21,10.6a2.26,2.26,0,0,0-1,.22,2,2,0,0,0-.66.54,1.94,1.94,0,0,0-.35.69,3.47,3.47,0,0,0-.12.65h4.29A2.75,2.75,0,0,0,22.5,11.14ZM18.29,6h5.36V7.35H18.29V6ZM13.89,17.7a4.4,4.4,0,0,1-1.51.7,6.44,6.44,0,0,1-1.73.22H4.24V5.12h6.24a7.7,7.7,0,0,1,1.73.17,3.67,3.67,0,0,1,1.33.56,2.6,2.6,0,0,1,.86,1,3.74,3.74,0,0,1,.3,1.58,3,3,0,0,1-.46,1.7,3.33,3.33,0,0,1-1.35,1.12,3.19,3.19,0,0,1,1.82,1.26,3.79,3.79,0,0,1,.59,2.17,3.79,3.79,0,0,1-.39,1.77A3.24,3.24,0,0,1,13.89,17.7ZM11.72,8.19a1.25,1.25,0,0,0-.45-0.47,1.88,1.88,0,0,0-.64-0.24,5.5,5.5,0,0,0-.76-0.05H7.16v3.16h3a2,2,0,0,0,1.28-.38A1.43,1.43,0,0,0,11.89,9,1.73,1.73,0,0,0,11.72,8.19ZM11.84,13a2.39,2.39,0,0,0-1.52-.45H7.16v3.73h3.11a3.61,3.61,0,0,0,.82-0.09A2,2,0,0,0,11.77,16a1.39,1.39,0,0,0,.47-0.54,1.85,1.85,0,0,0,.17-0.88A1.77,1.77,0,0,0,11.84,13Z"/></svg>`,
    linkedin: `<svg viewBox="0 0 30 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M19.6,19v-5.8c0-1.4-0.5-2.4-1.7-2.4c-1,0-1.5,0.7-1.8,1.3C16,12.3,16,12.6,16,13v6h-3.4c0,0,0.1-9.8,0-10.8H16v1.5c0.4-0.6,1.2-1.7,3-1.7c2.3,0,4,1.5,4,4.9V19H19.6z M8.9,6.7C7.7,6.7,7,5.9,7,4.9C7,3.8,7.8,3,8.9,3s1.9,0.8,1.9,1.9C10.9,5.9,10.1,6.7,8.9,6.7z M10.6,19H7.2V8.2h3.4V19z"/></svg>`,
    email: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M 20 0 L 11.009 5.727 C 10.388 6.088 9.621 6.088 9 5.727 L 0 0" transform="translate(2 7)" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M 2 16 C 0.895 16 0 15.105 0 14 L 0 2 C 0 0.895 0.895 0 2 0 L 18 0 C 19.105 0 20 0.895 20 2 L 20 14 C 20 15.105 19.105 16 18 16 Z" transform="translate(2 4)" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    phone: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M 11.832 14.568 C 12.257 14.763 12.761 14.637 13.045 14.265 L 13.4 13.8 C 13.778 13.296 14.37 13 15 13 L 18 13 C 19.105 13 20 13.895 20 15 L 20 18 C 20 19.105 19.105 20 18 20 C 8.059 20 0 11.941 0 2 C 0 0.895 0.895 0 2 0 L 5 0 C 6.105 0 7 0.895 7 2 L 7 5 C 7 5.63 6.704 6.222 6.2 6.6 L 5.732 6.951 C 5.353 7.24 5.231 7.756 5.44 8.184 C 6.807 10.96 9.054 13.205 11.832 14.568" transform="translate(2 2)" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    x: `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M 9.317 6.775 L 15.146 0 L 13.765 0 L 8.704 5.883 L 4.662 0 L 0 0 L 6.112 8.895 L 0 16 L 1.381 16 L 6.725 9.788 L 10.994 16 L 15.656 16 Z M 7.426 8.974 L 6.807 8.088 L 1.879 1.04 L 4 1.04 L 7.977 6.728 L 8.596 7.614 L 13.765 15.007 L 11.644 15.007 Z" transform="translate(0.172 0)" fill="#ffffff"/></svg>`,
  };

  let highestDragZ = 10;
  let lightboxList = [];
  let lightboxIndex = 0;

  // DOM References
  const wallpaperEl = document.getElementById("desktop-wallpaper");
  const ownerEl = document.getElementById("menubar-owner");
  const roleEl = document.getElementById("menubar-role");
  const foldersContainer = document.getElementById("desktop-folders");
  const iconsContainer = document.getElementById("desktop-icons");

  const dockPill = document.getElementById("dock-pill");
  const dockCta = document.getElementById("dock-cta");
  const dockAvatarImg = document.getElementById("dock-avatar-img");
  const dockCtaLabel = document.getElementById("dock-cta-label");
  const dockToggleBtn = document.getElementById("dock-toggle-btn");
  const dockLinksGrid = document.getElementById("dock-links-grid");

  const windowBackdrop = document.getElementById("window-backdrop");
  const macosWindow = document.getElementById("macos-window");
  const windowTitlebar = document.getElementById("window-titlebar");
  const windowContent = document.getElementById("window-content");
  const btnClose = document.getElementById("btn-window-close");
  const btnMinimize = document.getElementById("btn-window-minimize");
  const btnZoom = document.getElementById("btn-window-zoom");
  const sidebarBtns = Array.from(document.querySelectorAll(".sidebar-nav-btn"));

  const paneAbout = document.getElementById("pane-about");
  const paneServices = document.getElementById("pane-services");
  const paneGallery = document.getElementById("pane-gallery");
  const paneWorks = document.getElementById("pane-works");
  const paneProject = document.getElementById("pane-project");

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* =========================================================
     1. FREE 2D DRAGGING WITH 6PX DRAG-VS-CLICK THRESHOLD
     ========================================================= */
  const draggableRegistry = [];

  function makeDraggable(el, onActivateClick) {
    const state = { dx: 0, dy: 0, el };
    draggableRegistry.push(state);

    let startX = 0;
    let startY = 0;
    let baseDx = 0;
    let baseDy = 0;
    let isPointerDown = false;
    let wasDragged = false;

    el.addEventListener("pointerdown", (e) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      if (window.innerWidth <= 809.98) {
        wasDragged = false;
        return;
      }

      isPointerDown = true;
      wasDragged = false;
      startX = e.clientX;
      startY = e.clientY;
      baseDx = state.dx;
      baseDy = state.dy;
      el.setPointerCapture(e.pointerId);
    });

    el.addEventListener("pointermove", (e) => {
      if (!isPointerDown) return;
      const moveX = e.clientX - startX;
      const moveY = e.clientY - startY;

      if (!wasDragged && (Math.abs(moveX) > 6 || Math.abs(moveY) > 6)) {
        wasDragged = true;
        highestDragZ += 1;
        el.style.zIndex = String(highestDragZ);
        el.classList.add("is-dragging");
      }

      if (wasDragged) {
        state.dx = baseDx + moveX;
        state.dy = baseDy + moveY;
        el.style.transform = `translate3d(${state.dx}px, ${state.dy}px, 0)`;
      }
    });

    const finishPointer = (e) => {
      if (!isPointerDown) return;
      isPointerDown = false;
      el.classList.remove("is-dragging");
      try {
        el.releasePointerCapture(e.pointerId);
      } catch (_) {}
    };

    el.addEventListener("pointerup", finishPointer);
    el.addEventListener("pointercancel", finishPointer);

    el.addEventListener("click", (e) => {
      e.preventDefault();
      if (wasDragged) {
        e.stopPropagation();
        wasDragged = false;
        return;
      }
      onActivateClick();
    });
  }

  // Clear inline drag offsets on Mobile so CSS 3x4 grid stays symmetric
  window.addEventListener("resize", () => {
    const isMobile = window.innerWidth <= 809.98;
    for (const item of draggableRegistry) {
      if (isMobile) {
        item.el.style.transform = "";
      } else if (item.dx !== 0 || item.dy !== 0) {
        item.el.style.transform = `translate3d(${item.dx}px, ${item.dy}px, 0)`;
      }
    }
  });

  /* =========================================================
     2. RENDER STATIC CHROME, FOLDERS, DOCK & DESKTOP ICONS
     ========================================================= */
  function initSiteChrome() {
    const cfg = DATA.siteConfig;
    document.title = cfg.title;
    wallpaperEl.src = cfg.wallpaper;
    ownerEl.textContent = cfg.ownerName;
    roleEl.textContent = cfg.ownerRole;
    roleEl.addEventListener("click", (e) => {
      e.preventDefault();
      openWindowPane("works");
    });

    dockCta.href = cfg.dockCtaUrl;
    dockAvatarImg.src = cfg.dockAvatar;
    dockCtaLabel.textContent = cfg.dockCtaLabel;

    document.getElementById("sidebar-connect-heading").textContent = cfg.sidebarConnectHeading;
    const sbEmail = document.getElementById("sidebar-email");
    sbEmail.textContent = cfg.email;
    sbEmail.href = `mailto:${cfg.email}`;

    const sbPhone = document.getElementById("sidebar-phone");
    sbPhone.textContent = cfg.phoneDisplay;
    sbPhone.href = cfg.phoneHref;

    // Pastas laranjas
    foldersContainer.innerHTML = "";
    cfg.folders.forEach((folder) => {
      const btn = document.createElement("div");
      btn.className = "folder-item";
      btn.setAttribute("role", "button");
      btn.setAttribute("tabindex", "0");
      btn.setAttribute("aria-label", folder.label);
      btn.innerHTML = `
        <div class="folder-icon-wrap">
          <img src="${escapeHtml(folder.icon)}" alt="${escapeHtml(folder.label)}" />
        </div>
        <span class="folder-label">${escapeHtml(folder.label)}</span>
      `;
      makeDraggable(btn, () => openWindowPane(folder.id));
      btn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openWindowPane(folder.id);
        }
      });
      foldersContainer.appendChild(btn);
    });

    // 12 Ícones de projetos no Desktop
    iconsContainer.innerHTML = "";
    const desktopProjects = DATA.projects
      .filter((p) => typeof p.desktopSlot === "number")
      .sort((a, b) => a.desktopSlot - b.desktopSlot);

    desktopProjects.forEach((proj) => {
      const item = document.createElement("div");
      item.className = "desktop-icon";
      item.dataset.slot = String(proj.desktopSlot);
      item.setAttribute("role", "button");
      item.setAttribute("tabindex", "0");
      item.setAttribute("aria-label", proj.title);
      item.innerHTML = `
        <div class="desktop-icon-thumb">
          <img src="${escapeHtml(proj.icon || proj.cover)}" alt="${escapeHtml(proj.title)}" />
        </div>
        <span class="desktop-icon-label">${escapeHtml(proj.title)}</span>
      `;
      makeDraggable(item, () => openProject(proj.slug));
      item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openProject(proj.slug);
        }
      });
      iconsContainer.appendChild(item);
    });

    // Links do Dock
    dockLinksGrid.innerHTML = cfg.dockLinks
      .map((link) => {
        const svg = DOCK_ICONS[link.id] || DOCK_ICONS.email;
        const attrs = link.external ? `target="_blank" rel="noopener noreferrer"` : "";
        return `
          <a class="dock-link-item" href="${escapeHtml(link.href)}" ${attrs}>
            ${svg}
            <span>${escapeHtml(link.label)}</span>
          </a>
        `;
      })
      .join("");
  }

  /* =========================================================
     3. RENDER WINDOW PANES (ABOUT, SERVICES, GALLERY, WORKS)
     ========================================================= */
  function renderAboutPane() {
    const ab = DATA.about;
    paneAbout.innerHTML = `
      <div class="about-layout">
        <div class="about-photo-card">
          <img class="about-photo-bg" src="${escapeHtml(ab.photo)}" alt="${escapeHtml(ab.photoOverlayName.join(" "))}" />
          <div class="about-hud-frame">
            <div class="about-hud-name">${ab.photoOverlayName.map(escapeHtml).join("<br>")}</div>
            <div class="about-hud-stats">
              ${ab.stats
                .map(
                  (s) => `
                <div class="about-stat">
                  <span class="about-stat-label">${escapeHtml(s.label)}</span>
                  <span class="about-stat-value">${escapeHtml(s.value)}</span>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        </div>
        <div class="about-copy-col">
          <h1 class="about-heading">${ab.headingLines.map(escapeHtml).join("<br>")}</h1>
          <p class="about-bio">${escapeHtml(ab.bio)}</p>
        </div>
      </div>
    `;
  }

  function renderServicesPane() {
    const sv = DATA.services;
    paneServices.innerHTML = `
      <div class="services-layout">
        <div class="services-header">
          <h1 class="services-heading">${sv.headingHtml}</h1>
          <p class="services-intro">${escapeHtml(sv.intro)}</p>
        </div>
        <div class="service-list-wrap" id="service-list-wrap">
          ${sv.items
            .map(
              (item, idx) => `
            <div class="service-row" data-service-idx="${idx}">
              <div class="service-row-track">
                <div class="service-row-line">
                  <span class="service-row-title">${escapeHtml(item.title)}</span>
                  <span class="service-row-desc">${escapeHtml(item.description)}</span>
                </div>
                <div class="service-row-line" aria-hidden="true">
                  <span class="service-row-title">${escapeHtml(item.title)}</span>
                  <span class="service-row-desc">${escapeHtml(item.description)}</span>
                </div>
              </div>
            </div>
          `
            )
            .join("")}
          <div class="service-preview-card" id="service-preview-card" aria-hidden="true">
            ${sv.items
              .map(
                (item, idx) =>
                  `<img src="${escapeHtml(item.previewImage)}" data-preview-idx="${idx}" alt="" loading="lazy" />`
              )
              .join("")}
          </div>
        </div>
      </div>
    `;

    // Cursor-tracking floating preview card with smooth lerp
    const wrap = document.getElementById("service-list-wrap");
    const card = document.getElementById("service-preview-card");
    const imgs = Array.from(card.querySelectorAll("img"));
    let targetY = 0;
    let currentY = 0;
    let hovering = false;
    let rafId = null;

    function tick() {
      currentY += (targetY - currentY) * 0.25;
      const scale = hovering ? 1 : 0.85;
      card.style.transform = `translate3d(0, ${currentY.toFixed(1)}px, 0) scale(${scale})`;
      if (hovering || Math.abs(targetY - currentY) > 0.5) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    }

    wrap.querySelectorAll(".service-row").forEach((row) => {
      row.addEventListener("mouseenter", () => {
        const idx = Number(row.dataset.serviceIdx);
        imgs.forEach((im, i) => im.classList.toggle("is-active", i === idx));
      });
    });

    wrap.addEventListener("mouseenter", (e) => {
      if (window.innerWidth <= 809.98) return;
      const rect = wrap.getBoundingClientRect();
      targetY = e.clientY - rect.top - 150;
      currentY = targetY;
      hovering = true;
      card.classList.add("is-visible");
      if (!rafId) rafId = requestAnimationFrame(tick);
    });

    wrap.addEventListener("mousemove", (e) => {
      if (!hovering) return;
      const rect = wrap.getBoundingClientRect();
      targetY = e.clientY - rect.top - 150;
      if (!rafId) rafId = requestAnimationFrame(tick);
    });

    wrap.addEventListener("mouseleave", () => {
      hovering = false;
      card.classList.remove("is-visible");
      if (!rafId) rafId = requestAnimationFrame(tick);
    });
  }

  function renderGalleryPane() {
    const imgs = DATA.galleryImages;
    paneGallery.innerHTML = `
      <div class="gallery-masonry">
        ${imgs
          .map(
            (src, idx) => `
          <div class="gallery-cell" data-gal-idx="${idx}">
            <img src="${escapeHtml(src)}" alt="Galeria Maicon Moura ${idx + 1}" ${idx >= 12 ? 'loading="lazy"' : ""} />
          </div>
        `
          )
          .join("")}
      </div>
    `;
    paneGallery.querySelectorAll(".gallery-cell").forEach((cell) => {
      cell.addEventListener("click", () => {
        openLightbox(imgs, Number(cell.dataset.galIdx));
      });
    });
  }

  function renderWorksPane() {
    paneWorks.innerHTML = `
      <div class="works-pane-layout">
        <div class="works-grid">
          ${DATA.projects
            .map(
              (p, idx) => `
            <button type="button" class="work-card" data-proj-slug="${escapeHtml(p.slug)}">
              <div class="work-card-thumb">
                <img src="${escapeHtml(p.cover || p.icon)}" alt="${escapeHtml(p.title)}" ${idx >= 12 ? 'loading="lazy"' : ""} />
              </div>
              <span class="work-card-title">${escapeHtml(p.title)}</span>
              <span class="work-card-cat">${escapeHtml(p.category)}</span>
            </button>
          `
            )
            .join("")}
        </div>
      </div>
    `;
    paneWorks.querySelectorAll(".work-card").forEach((card) => {
      card.addEventListener("click", () => {
        openProject(card.dataset.projSlug);
      });
    });
  }

  function paragraphs(text) {
    return String(text).split(/\n\n+/).map((t) => `<p>${escapeHtml(t)}</p>`).join("");
  }

  function renderProjectDetail(proj) {
    const gallery = proj.gallery && proj.gallery.length ? proj.gallery : [proj.cover];
    const hasOverview = Boolean(proj.overview && proj.overview.trim());
    const hasChallenge = Boolean(proj.challenge && proj.challenge.trim());
    const hasSolution = Boolean(proj.solution && proj.solution.trim());
    const hasCredits = Boolean(proj.credits && proj.credits.length);

    paneProject.innerHTML = `
      <div class="project-detail-layout">
        <div class="project-detail-cols">
          <div class="project-text-col">
            <div class="project-title-group">
              <span class="project-category-overline">${escapeHtml(proj.category)}</span>
              <h1 class="project-title">${escapeHtml(proj.title)}</h1>
            </div>

            <div class="project-meta-row">
              <div class="project-meta-item">
                <span class="project-meta-label">Tipo</span>
                <span class="project-meta-value">${escapeHtml(proj.category)}</span>
              </div>
              <div class="project-meta-item">
                <span class="project-meta-label">Cliente</span>
                <span class="project-meta-value">${escapeHtml(proj.client || proj.title)}</span>
              </div>
              <div class="project-meta-item">
                <span class="project-meta-label">Ano</span>
                <span class="project-meta-value">${escapeHtml(proj.date || "2023")}</span>
              </div>
            </div>

            ${
              hasOverview
                ? `<div class="project-block">
                    <h3>Visão Geral</h3>
                    ${paragraphs(proj.overview)}
                  </div>`
                : ""
            }

            ${
              hasChallenge
                ? `<div class="project-block">
                    <h3>Desafio</h3>
                    ${paragraphs(proj.challenge)}
                  </div>`
                : ""
            }

            ${
              hasSolution
                ? `<div class="project-block">
                    <h3>Solução</h3>
                    ${paragraphs(proj.solution)}
                  </div>`
                : ""
            }

            ${
              hasCredits
                ? `<div class="project-credits">
                    <h3>Créditos</h3>
                    <div class="project-credits-list">
                      ${proj.credits
                        .map(
                          (c) => `
                        <div class="project-credit-row">
                          <span class="project-credit-role">${escapeHtml(c.role)}</span>
                          <span class="project-credit-name">${escapeHtml(c.name)}</span>
                        </div>
                      `
                        )
                        .join("")}
                    </div>
                  </div>`
                : ""
            }
          </div>

          <div class="project-gallery-col">
            ${gallery
              .map(
                (src, idx) => `
              <div class="project-gallery-cell" data-proj-img-idx="${idx}">
                <img src="${escapeHtml(src)}" alt="${escapeHtml(proj.title)} — imagem ${idx + 1}" loading="lazy" />
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      </div>
    `;

    paneProject.querySelectorAll(".project-gallery-cell").forEach((cell) => {
      cell.addEventListener("click", () => {
        openLightbox(gallery, Number(cell.dataset.projImgIdx));
      });
    });
  }

  /* =========================================================
     4. WINDOW STATE, SIDEBAR SWITCHING & URL HASH ROUTING
     ========================================================= */
  let winOffset = { x: 0, y: 0 };

  function resetWindowDrag() {
    winOffset = { x: 0, y: 0 };
    macosWindow.style.left = "";
    macosWindow.style.top = "";
  }

  function showWindowModal() {
    dockPill.classList.remove("is-open");
    dockToggleBtn.setAttribute("aria-expanded", "false");
    windowBackdrop.classList.add("is-visible");
    windowBackdrop.setAttribute("aria-hidden", "false");
  }

  function closeWindowModal(updateHash = true) {
    windowBackdrop.classList.remove("is-visible");
    windowBackdrop.setAttribute("aria-hidden", "true");
    macosWindow.classList.remove("is-fullscreen");
    resetWindowDrag();
    if (updateHash && window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }

  const renderedPanes = new Set();

  function ensurePaneRendered(paneId) {
    if (renderedPanes.has(paneId)) return;
    if (paneId === "about") renderAboutPane();
    else if (paneId === "services") renderServicesPane();
    else if (paneId === "gallery") renderGalleryPane();
    else if (paneId === "works") renderWorksPane();
    renderedPanes.add(paneId);
  }

  function activatePane(paneId) {
    ensurePaneRendered(paneId);
    const map = {
      about: paneAbout,
      services: paneServices,
      gallery: paneGallery,
      works: paneWorks,
      project: paneProject,
    };
    Object.entries(map).forEach(([key, el]) => {
      el.classList.toggle("is-active", key === paneId);
    });
    sidebarBtns.forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.nav === paneId);
    });
    macosWindow.classList.toggle("is-project-mode", paneId === "project");
    windowContent.scrollTop = 0;
  }

  function openWindowPane(paneId, updateHash = true) {
    activatePane(paneId);
    showWindowModal();
    if (updateHash) {
      const hashMap = {
        about: "#sobre",
        services: "#servicos",
        gallery: "#galeria",
        works: "#portfolio",
      };
      if (hashMap[paneId]) {
        history.replaceState(null, "", hashMap[paneId]);
      }
    }
  }

  function openProject(slug, updateHash = true) {
    const proj = DATA.projects.find((p) => p.slug === slug);
    if (!proj) return;
    renderProjectDetail(proj);
    activatePane("project");
    showWindowModal();
    if (updateHash) {
      history.replaceState(null, "", `#projeto/${encodeURIComponent(slug)}`);
    }
  }

  // Titlebar drag on Desktop
  (function initWindowTitlebarDrag() {
    let dragging = false;
    let sx = 0;
    let sy = 0;
    let bx = 0;
    let by = 0;

    windowTitlebar.addEventListener("pointerdown", (e) => {
      if (e.target.closest(".traffic-lights")) return;
      if (window.innerWidth < 1200 || macosWindow.classList.contains("is-fullscreen")) return;
      dragging = true;
      sx = e.clientX;
      sy = e.clientY;
      bx = winOffset.x;
      by = winOffset.y;
      windowTitlebar.setPointerCapture(e.pointerId);
    });

    windowTitlebar.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      winOffset.x = bx + (e.clientX - sx);
      winOffset.y = by + (e.clientY - sy);
      macosWindow.style.left = `${winOffset.x}px`;
      macosWindow.style.top = `${winOffset.y}px`;
    });

    const stop = (e) => {
      if (!dragging) return;
      dragging = false;
      try {
        windowTitlebar.releasePointerCapture(e.pointerId);
      } catch (_) {}
    };
    windowTitlebar.addEventListener("pointerup", stop);
    windowTitlebar.addEventListener("pointercancel", stop);
  })();

  sidebarBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      openWindowPane(btn.dataset.nav);
    });
  });

  btnClose.addEventListener("click", () => closeWindowModal(true));
  btnMinimize.addEventListener("click", () => closeWindowModal(true));
  btnZoom.addEventListener("click", () => {
    resetWindowDrag();
    macosWindow.classList.toggle("is-fullscreen");
  });

  /* =========================================================
     5. DOCK EXPAND / COLLAPSE
     ========================================================= */
  dockToggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = dockPill.classList.toggle("is-open");
    dockToggleBtn.setAttribute("aria-expanded", String(open));
  });

  document.addEventListener("click", (e) => {
    if (dockPill.classList.contains("is-open") && !dockPill.contains(e.target)) {
      dockPill.classList.remove("is-open");
      dockToggleBtn.setAttribute("aria-expanded", "false");
    }
  });

  /* =========================================================
     6. LIGHTBOX
     ========================================================= */
  function openLightbox(images, index) {
    lightboxList = images;
    lightboxIndex = index;
    lightboxImg.src = lightboxList[lightboxIndex];
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (lightbox.classList.contains("is-open")) {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowRight" && lightboxList.length > 1) {
        lightboxIndex = (lightboxIndex + 1) % lightboxList.length;
        lightboxImg.src = lightboxList[lightboxIndex];
      } else if (e.key === "ArrowLeft" && lightboxList.length > 1) {
        lightboxIndex = (lightboxIndex - 1 + lightboxList.length) % lightboxList.length;
        lightboxImg.src = lightboxList[lightboxIndex];
      }
      return;
    }

    if (e.key === "Escape" && windowBackdrop.classList.contains("is-visible")) {
      closeWindowModal(true);
    }
  });

  /* =========================================================
     7. APPLY INITIAL URL HASH
     ========================================================= */
  function syncFromHash() {
    const hash = decodeURIComponent(window.location.hash || "");
    if (!hash || hash === "#") {
      closeWindowModal(false);
      return;
    }
    if (hash === "#sobre" || hash === "#about") {
      openWindowPane("about", false);
    } else if (hash === "#servicos" || hash === "#services") {
      openWindowPane("services", false);
    } else if (hash === "#galeria" || hash === "#gallery") {
      openWindowPane("gallery", false);
    } else if (hash === "#portfolio" || hash === "#works") {
      openWindowPane("works", false);
    } else if (hash.startsWith("#projeto/")) {
      openProject(hash.slice("#projeto/".length), false);
    }
  }

  window.addEventListener("hashchange", syncFromHash);

  // Boot (panes render lazily on first open for fast initial load)
  initSiteChrome();
  syncFromHash();
})();
