import Lenis from "lenis";

let lenis = null;

export function initLenis() {
  if (lenis) return () => {};
  lenis = new Lenis({ duration: 1.15, smoothWheel: true });
  let raf;
  const loop = (time) => {
    lenis.raf(time);
    raf = requestAnimationFrame(loop);
  };
  raf = requestAnimationFrame(loop);
  return () => {
    cancelAnimationFrame(raf);
    if (lenis) {
      lenis.destroy();
      lenis = null;
    }
  };
}

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset: -64 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
