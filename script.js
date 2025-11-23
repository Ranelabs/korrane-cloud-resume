async function updateCounter() {
  const response = await fetch("/api/GetVisitorCount"); // better to use relative path
  const data = await response.json();
  document.getElementById("counter").innerText = data.count;
}

updateCounter();
