(() => {
  const gallery = document.getElementById("project-gallery");
  const viewer = document.getElementById("project-viewer");
  if (typeof viewer.showModal !== "function") return;

  const projects = [...gallery.querySelectorAll(".gallery-group:not([aria-hidden]) .project-preview")];
  const image = document.getElementById("viewer-image");
  const title = document.getElementById("viewer-title");
  const count = document.getElementById("viewer-count");
  let selected = 0;

  function showProject(index) {
    selected = (index + projects.length) % projects.length;
    const preview = projects[selected];
    image.src = preview.href;
    image.alt = preview.querySelector("img").alt;
    title.textContent = preview.closest("figure").querySelector("strong").textContent.replace(/^\d+\s*\/\s*/, "");
    count.textContent = `${selected + 1} / ${projects.length}`;
  }

  gallery.addEventListener("click", event => {
    const preview = event.target.closest(".project-preview");
    if (!preview || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    showProject(projects.findIndex(project => project.href === preview.href));
    gallery.classList.add("is-viewing");
    viewer.showModal();
  });

  document.getElementById("viewer-prev").addEventListener("click", () => showProject(selected - 1));
  document.getElementById("viewer-next").addEventListener("click", () => showProject(selected + 1));
  document.getElementById("viewer-close").addEventListener("click", () => viewer.close());
  viewer.addEventListener("click", event => {
    if (event.target === viewer) viewer.close();
  });
  viewer.addEventListener("keydown", event => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    showProject(selected + (event.key === "ArrowLeft" ? -1 : 1));
  });
  viewer.addEventListener("close", () => gallery.classList.remove("is-viewing"));
})();
