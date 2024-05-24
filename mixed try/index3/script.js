const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");
const carouselContent = document.getElementById('carousel-content');

const apiKey = "74feaf42-dc25-47bd-b956-6100593697a7";
const options = [
  "general",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

let requestURL;

// Create cards and carousel items
const generateUI = (articles) => {
  container.innerHTML = '';
  carouselContent.innerHTML = '';

  articles.forEach((item, index) => {
    // Create card
    let card = document.createElement("div");
    card.classList.add("news-card");
    card.innerHTML = `<div class="news-image-container">
      <img src="${item.fields.thumbnail || "./newspaper.jpg"}" alt="" />
      </div>
      <div class="news-content">
        <div class="news-title">${item.webTitle}</div>
        <div class="news-description">${item.fields.headline || ""}</div>
        <a href="${item.webUrl}" target="_blank" class="view-button">Read More</a>
      </div>`;
    container.appendChild(card);

    // Create carousel item
    let carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item");
    if (index === 0) carouselItem.classList.add("active");
    carouselItem.innerHTML = `<img src="${item.fields.thumbnail}" class="d-block w-100" alt="${item.webTitle}">
      <div class="carousel-caption d-none d-md-block">
        <h5>${item.webTitle}</h5>
        <p>${item.fields.headline}</p>
      </div>`;
    carouselContent.appendChild(carouselItem);
  });

  // Add event listener to all 'Read More' buttons
  document.querySelectorAll('.view-button').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.target.classList.add('active');
      window.open(e.target.href, '_blank');
    });
  });
};

// Fetch news data
const getNews = async (query) => {
  const response = await fetch(`https://content.guardianapis.com/search?q=${query}&show-fields=headline,thumbnail,byline&api-key=${apiKey}`);
  if (!response.ok) {
    alert("Data unavailable at the moment. Please try again later");
    return false;
  }
  const data = await response.json();
  generateUI(data.response.results);
};

// Category selection
const selectCategory = (e, category) => {
  let options = document.querySelectorAll(".option");
  options.forEach((element) => {
    element.classList.remove("active");
  });
  e.target.classList.add("active");
  if (category === "entertainment") {
    window.location.href = 'entertainment.html';
  } else {
    getNews(category);
  }
};

// Create category buttons
const createOptions = () => {
  options.forEach((category) => {
    const button = document.createElement('button');
    button.className = `option ${category === "general" ? "active" : ""}`;
    button.textContent = category;
    button.onclick = (e) => selectCategory(e, category);
    optionsContainer.appendChild(button);
  });
};

const init = () => {
  optionsContainer.innerHTML = "";
  getNews("general");
  createOptions();
};

window.onload = init;
