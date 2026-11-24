(() => {
  const { gsap, ScrollTrigger } = window;
  if (!gsap || !ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
    const restorations = [];

    // Keep explicit line breaks, emphasis and spaces so text still wraps naturally.
    function splitWords(heading, masked = true) {
      const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      const words = [];
      const originalLabel = heading.getAttribute("aria-label");
      heading.setAttribute("aria-label", heading.innerText.replace(/\s+/gu, " ").trim());
      restorations.push(() => {
        if (originalLabel === null) heading.removeAttribute("aria-label");
        else heading.setAttribute("aria-label", originalLabel);
      });
      for (const node of nodes) {
        const fragment = document.createDocumentFragment();
        for (const part of node.data.split(/(\s+)/u).filter(Boolean)) {
          if (!part.trim()) {
            fragment.append(part);
            continue;
          }
          const word = document.createElement("span");
          word.textContent = part;
          words.push(word);
          const wrapper = masked ? document.createElement("span") : word;
          if (masked) {
            wrapper.className = "word-mask";
            wrapper.append(word);
          }
          wrapper.setAttribute("aria-hidden", "true");
          fragment.append(wrapper);
        }
        const inserted = [...fragment.childNodes];
        if (!inserted.length) continue;
        node.replaceWith(fragment);
        restorations.push(() => {
          inserted[0].before(node);
          inserted.forEach(child => child.remove());
        });
      }
      return words;
    }

    function entry(trigger) {
      return { trigger, start: "top 92%", toggleActions: "play none none none" };
    }

    const wordEntrance = {
      yPercent: 115, stagger: 0.034, duration: 0.68,
      ease: "power3.out", clearProps: "transform"
    };

    if (window.scrollY === 0 && !location.hash) {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-label", { x: -14, opacity: 0, duration: 0.32 })
        .from(splitWords(document.querySelector("h1")), wordEntrance, 0.08)
        .from(".hero-copy > *, .signature", {
          y: 16, opacity: 0, duration: 0.5, stagger: 0.09, clearProps: "transform,opacity"
        }, 0.4);
    }

    gsap.to(".hero-watermark", {
      yPercent: -22, ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
    });
    gsap.from(".gallery", {
      clipPath: "inset(0 0 30% 0)", duration: 0.85, ease: "power3.out",
      clearProps: "clipPath", scrollTrigger: entry(".gallery")
    });

    const mission = document.querySelector(".mission h2");
    gsap.fromTo(splitWords(mission, false), { color: "var(--muted-on-light)" }, {
      color: "var(--ink)", stagger: 0.12, duration: 0.32, ease: "none",
      scrollTrigger: { trigger: mission, start: "top 82%", end: "bottom 43%", scrub: true }
    });

    document.querySelectorAll(".services h2, .section-intro h2, .tech-title h2, .contact h2").forEach(title => {
      gsap.from(splitWords(title), { ...wordEntrance, scrollTrigger: entry(title) });
    });

    document.querySelectorAll(".service").forEach(row => {
      gsap.timeline({ scrollTrigger: entry(row), defaults: { ease: "power3.out" } })
        .from([row.querySelector(".number"), row.querySelector("h3"), row.querySelector("p")],
          { y: 18, opacity: 0, duration: 0.5, stagger: 0.06, clearProps: "transform,opacity" })
        .from(row.querySelectorAll(".tags span"),
          { x: -10, opacity: 0, stagger: 0.045, duration: 0.35, clearProps: "transform,opacity" }, 0.22);
    });

    document.querySelectorAll(".timeline article").forEach((step, index) => {
      gsap.from(step.querySelector("div"), {
        y: 20, opacity: 0, duration: 0.55, clearProps: "transform,opacity",
        scrollTrigger: entry(step.querySelector("div"))
      });
      gsap.fromTo(step, { "--step-progress": 0 }, {
        "--step-progress": 1, ease: "none",
        scrollTrigger: {
          trigger: step,
          start: () => window.innerWidth > 700 ? "top " + (86 - index * 7) + "%" : "top 86%",
          end: "bottom 60%", scrub: true
        }
      });
    });

    document.querySelectorAll(".promises article").forEach(card => {
      gsap.from(card.children, {
        y: 14, opacity: 0, duration: 0.5, stagger: 0.07,
        clearProps: "transform,opacity", scrollTrigger: entry(card)
      });
    });
    gsap.from(".footer-watermark", {
      yPercent: 22, ease: "none",
      scrollTrigger: { trigger: ".footer", start: "top bottom", end: "clamp(bottom bottom)", scrub: true }
    });

    return () => restorations.reverse().forEach(restore => restore());
  });
  document.fonts.ready.then(() => ScrollTrigger.refresh());
})();
