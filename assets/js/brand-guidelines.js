const body = document.body;
const menuButton = document.querySelector(".menu-toggle");
const drawer = document.querySelector(".mobile-drawer");
const drawerOverlay = document.querySelector(".drawer-overlay");
const closeMenuControls = document.querySelectorAll("[data-close-menu]");
const guideLinks = [...document.querySelectorAll(".guide-link")];
const sections = [...document.querySelectorAll(".content-section[id], .guide-intro[id]")];
const backToTop = document.querySelector(".back-to-top");

const setMenuOpen = (isOpen) => {
  body.classList.toggle("menu-open", isOpen);
  drawer?.classList.toggle("open", isOpen);
  drawer?.setAttribute("aria-hidden", String(!isOpen));
  menuButton?.setAttribute("aria-expanded", String(isOpen));
  if (drawerOverlay) drawerOverlay.hidden = !isOpen;
};

menuButton?.addEventListener("click", () => {
  setMenuOpen(!drawer?.classList.contains("open"));
});

closeMenuControls.forEach((control) => {
  control.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});

guideLinks.forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

const setActiveLink = (id) => {
  guideLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
  });
};

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActiveLink(entry.target.id);
    });
  }, {
    rootMargin: "-28% 0px -62% 0px",
    threshold: 0
  });

  sections.forEach((section) => sectionObserver.observe(section));
}

window.addEventListener("scroll", () => {
  backToTop?.classList.toggle("visible", window.scrollY > 720);
});

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const activatePanelGroup = (group, target, activeButton) => {
  const buttons = [...document.querySelectorAll(`[data-tab-group="${group}"]`)];
  const panels = [...document.querySelectorAll(`[data-panel-group="${group}"]`)];

  buttons.forEach((button) => {
    const isActive = button === activeButton;
    button.classList.toggle("is-active", isActive);
    if (button.getAttribute("role") === "tab") {
      button.setAttribute("aria-selected", String(isActive));
    }
  });

  panels.forEach((panel) => {
    const isActive = panel.dataset.panel === target;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });
};

document.querySelectorAll("[data-tab-group][data-tab-target]").forEach((button) => {
  button.addEventListener("click", () => {
    activatePanelGroup(button.dataset.tabGroup, button.dataset.tabTarget, button);
  });
});
