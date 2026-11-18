(() => {
  const { gsap, ScrollTrigger } = window;
  if (!gsap || !ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", context => {
    // Create each tween inside the media context, including delayed scroll entries.
    context.add("reveal", (elements, distance, stagger = 0) => {
      gsap.from(elements, {
        y: distance,
        opacity: 0,
        duration: 0.65,
        ease: "power3.out",
        stagger,
        clearProps: "transform,opacity"
      });
    });

    if (window.scrollY === 0 && !location.hash) {
      context.reveal(".hero-copy h1, .hero-copy > p, .signature", 20, 0.09);
    }

    function revealOnEntry(trigger, elements, distance, stagger) {
      ScrollTrigger.create({
        trigger,
        start: "top 94%",
        once: true,
        onEnter: () => {
          if (trigger.getBoundingClientRect().bottom > 0) {
            context.reveal(elements, distance, stagger);
          }
        }
      });
    }

    document.querySelectorAll(".service").forEach(row => {
      revealOnEntry(row, row.children, 18, 0.07);
    });
    document.querySelectorAll(
      ".section-intro, .timeline article, .promises article, .services h2, .tech-title h2, .contact h2"
    ).forEach(block => revealOnEntry(block, block, 24));

    document.fonts.ready.then(() => ScrollTrigger.refresh());
  });
})();
