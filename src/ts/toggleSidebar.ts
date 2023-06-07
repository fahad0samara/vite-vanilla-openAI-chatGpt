// @ts-nocheck

export function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = sidebar.style.display === "none" ? "flex" : "none";
}
