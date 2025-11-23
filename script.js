async function updateCounter() {
  try {
    const response = await fetch("/api/GetVisitorCount");
    const data = await response.json();
    console.log("Visitor count data:", data);

    const counterElement = document.getElementById("visitor-count");
    if (!counterElement) {
      console.error('No element with id "visitor-count" found.');
      return;
    }

    counterElement.innerText = data.count;
  } catch (error) {
    console.error("Error updating counter:", error);
  }
}

document.addEventListener("DOMContentLoaded", updateCounter);
