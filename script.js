async function updateCounter() {
    const response = await fetch("https://nice-pond-00275090f.3.azurestaticapps.net/api/GetVisitorCount");
    const count = await response.text();
    document.getElementById("counter").innerText = count;
}

updateCounter();
