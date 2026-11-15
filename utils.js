export function escapeHTML(value = "") {
  return String(value).replace(
    /[&<>'"]/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "'",
        '"': "&quot;",
      })[c],
  );
}


