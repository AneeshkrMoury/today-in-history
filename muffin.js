// muffin.js
export function setupCustomDateSearch() {
  const searchBtn = document.getElementById("search-btn");

  searchBtn.addEventListener("click", async () => {
    const month = document.getElementById("month").value;
    const day = document.getElementById("day").value;

    if (!month || !day) {
      alert("Please enter both month and day!");
      return;
    }

    // Wikipedia On This Day API
    const url = `https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch Wikipedia data");
      const data = await response.json();

      const events = data.events || [];
      displaySearchResults(events);

    } catch (error) {
      console.error("Error fetching Wikipedia data:", error);
      const container = document.getElementById("search-results");
      container.innerHTML = "<p>Failed to load events. Try again later.</p>";
    }
  });
}

// Render cards
function displaySearchResults(events) {
  const container = document.getElementById("search-results");
  container.innerHTML = "";

  if (events.length === 0) {
    container.innerHTML = "<p>No events found for this date.</p>";
    return;
  }

  events.forEach(event => {
    const year = event.year;
    const text = event.text;
    const link = event.pages?.[0]?.content_urls?.desktop?.page || "#";
    const image = event.pages?.[0]?.thumbnail?.source || "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

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
