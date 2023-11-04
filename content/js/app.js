// async function getMoviesData(){
//   let res = await fetch('https://api.tvmaze.com/shows');
//   let data = await res.json();
//   console.log(data);
// }

// const xhr = new XMLHttpRequest();
// xhr.open('GET', 'https://api.tvmaze.com/shows');
// xhr.send();

// xhr.onload = () => {
//   console.log(JSON.parse(xhr.responseText));
// }

const showsContainer = document.querySelector(".content");
const aside = document.querySelector(".single-show");
const singleShowCont = document.querySelector(".single-show .show-content");
const sideBarCloseBtn = document.querySelector(".close-btn");
const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search-input");

getData();

function getData(search) {
  const fetchUrl = !search
    ? "https://api.tvmaze.com/shows"
    : `https://api.tvmaze.com/search/shows?q=${search}`;

  fetch(fetchUrl)
    .then((res) => res.json())
    .then((data) => displayData(data));
}

function getSingleShow(id) {
  fetch("https://api.tvmaze.com/shows/" + id)
    .then((res) => res.json())
    .then((data) => displaySingleShow(data));
}

sideBarCloseBtn.addEventListener("click", () => asideShow("remove"));

function displayData(data) {
  console.log(data);

  data = data.slice(0, 40);

  data = data.map((ele) => {
    return ele.show ? ele.show : ele;
  });

  console.log(data);

  let html = "";

  data.forEach((show) => {

    const imageUrl = show.image
      ? show.image.medium
      : "https://hwr.org.uk/wp-content/uploads/2016/11/placeholder-dark-600-400-729dad18518ecd2cd47afb63f9e6eb09.jpg";

    html += `
    <div class="tv-show-container col-sm-6 col-md-4 col-lg-3">
      <div class="tv-show" data-id=${show.id} style="background-image: linear-gradient(transparent 60%, #000), url(${imageUrl})">
        <div class="show-text">
          <div class="show-title">
            ${show.name}
          </div>
          <div class="show-category">
            ${show.genres[0] ? show.genres[0] : ''}
          </div>
        </div>
      </div>
    </div>
    `;
  });

  showsContainer.innerHTML = html;

  addEventsToShows();
}

function addEventsToShows() {
  showsContainer.addEventListener("click", (e) => {
    const card = e.target.closest(".tv-show");
    if (!card) return;

    const id = card.dataset.id;
    getSingleShow(id);
  });
}

function displaySingleShow(show) {
  asideShow("add");

  const imageUrl = show.image
      ? show.image.original
      : "https://heuft.com/upload/image/400x267/no_image_placeholder.png";


  singleShowCont.innerHTML = `
    <img class="show-img" src=${imageUrl} alt="">
    <h2 class="show-title mt-2">${show.name}</h2>
    <div class="show-geners d-flex gap-3 flex-wrap">
      ${show.genres
        .map((ele) => `<div class="show-genre">${ele}</div>`)
        .join("")}
    </div>
    <hr>
    <h5 class="text-white fw-bolder">Summary: </h5>
    ${show.summary}
    <a href=${
      show.url
    } target="_blank" class="show-site-link">More About the movie</a>
  `;
}

function asideShow(type) {
  aside.classList[type]("active");
}

searchBtn.addEventListener("click", () => {
  getData(searchInput.value);
});

/*
https://heuft.com/upload/image/400x267/no_image_placeholder.png
*/
