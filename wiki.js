// wiki.js
export async function loadTodayHistory() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/events/${month}/${day}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayTodayEvents(data.events);
  } catch (error) {
    console.error("Error loading Wikipedia data:", error);
  }
}

// Function to create cards and display
function displayTodayEvents(events) {
  const container = document.getElementById("today-events");
  container.innerHTML = "";

  events.forEach(event => {
    const year = event.year;
    const text = event.text;
    const link = event.pages[0]?.content_urls.desktop.page || "#";
    const image = event.pages[0]?.thumbnail?.source || "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${image}" alt="event image" class="card-img">
      <div class="year"><strong>${year}</strong></div>
      <p>${text}</p>
      <a href="${link}" target="_blank">Read More →</a>
    `;

    container.appendChild(card);
  });
}
