async function loadVisitorCount() {
  try {
    const res = await fetch('/api/GetVisitorCount');
    const data = await res.json();
    document.getElementById('visitor-count').innerText = data.count;
  } catch (err) {
    console.error('Error loading visitor count:', err);
  }
}

window.addEventListener('DOMContentLoaded', loadVisitorCount);
