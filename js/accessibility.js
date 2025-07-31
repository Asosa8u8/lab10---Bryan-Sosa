document.addEventListener('DOMContentLoaded', () = {
  const toggleBtn = document.getElementById('toggle-contrast');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () = {
      document.body.classList.toggle('high-contrast');
    });
  }
});