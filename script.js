async function updateCounter() {
    const response = await fetch("YOUR_AZURE_FUNCTION_URL");
    const count = await response.text();
    document.getElementById("counter").innerText = count;
}

updateCounter();
