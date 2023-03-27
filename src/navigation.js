let maxPage;
let page = 1;
let infiniteScroll;

searchFormBtn.addEventListener("click", () => {
  location.hash = "#search=" + searchFormInput.value;
});
trendingBtn.addEventListener("click", () => {
  location.hash = "#trends";
});
categoriesBtn.addEventListener("click", () => {
  location.hash = "#category=";
});
categoriesAction.addEventListener("click", () => {
  location.hash = "#category=28-Action";
});
categoriesComedy.addEventListener("click", () => {
  location.hash = "#category=35-Comedy";
});
categoriesDrama.addEventListener("click", () => {
  location.hash = "#category=18-Drama";
});
categoriesRomance.addEventListener("click", () => {
  location.hash = "#category=10749-Romance";
});
categoriesTVShows.addEventListener("click", () => {
  location.hash = "#category=28-Action";
});
categoriesDocumentary.addEventListener("click", () => {
  location.hash = "#category=99-Documentary";
});
// arrowBtn.addEventListener('click', () => {
//     history.back();
//     // location.hash = '#home';
// });

window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);
window.addEventListener("scroll", infiniteScroll, false);
getCategoriesPreview();

function navigator() {
  console.log({ location });
  if (infiniteScroll) {
    window.removeEventListener("scroll", infiniteScroll, { passive: false });
    infiniteScroll = undefined;
  }
  if (location.hash.startsWith("#trends")) {
    trendsPage();
  } else if (location.hash.startsWith("#search=")) {
    searchPage();
  } else if (location.hash.startsWith("#movie=")) {
    movieDetailsPage();
  } else if (location.hash.startsWith("#category=")) {
    categoriesPage();
  } else if (location.hash.startsWith("#my-list")) {
    myListPage();
  } else {
    homePage();
  }

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  if (infiniteScroll) {
    window.addEventListener("scroll", infiniteScroll, { passive: false });
  }
}

function trendsPage() {
  console.log("TRENDS!!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  // arrowBtn.classList.remove('inactive');
  // arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");
  searchForm.classList.remove("inactive");

  latestSection.classList.add("inactive");
  trendingPreviewSection.classList.add("inactive");
  categoriesTopSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  likedMoviesSection.classList.add("inactive");
  upcomingPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  headerCategoryTitle.innerHTML = "Tendencias";
  getTrendingMovies();
  infiniteScroll = getPaginatedTrendingMovies;
}
function searchPage() {
  console.log("SEARCH!!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  // arrowBtn.classList.remove('inactive');
  // arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");

  latestSection.classList.add("inactive");
  trendingPreviewSection.classList.add("inactive");
  categoriesTopSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  likedMoviesSection.classList.add("inactive");
  upcomingPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  const [_, query] = location.hash.split("=");
  getMoviesBySearch(query);
  infiniteScroll = getPaginatedMoviesBySearch(query);
}
function movieDetailsPage() {
  console.log("MOVIE!!");

  headerSection.classList.add("header-container--long");
  // headerSection.style.background = '';
  // arrowBtn.classList.remove('inactive');
  // arrowBtn.classList.add('header-arrow--white');
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");

  latestSection.classList.add("inactive");
  trendingPreviewSection.classList.add("inactive");
  categoriesTopSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  likedMoviesSection.classList.add("inactive");
  upcomingPreviewSection.classList.add("inactive");
  genericSection.classList.add("inactive");
  movieDetailSection.classList.remove("inactive");

  const [_, movieId] = location.hash.split("=");
  getMovieById(movieId);
}
function categoriesPage() {
  console.log("CATEGORY!!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  // arrowBtn.classList.remove('inactive');
  // arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");

  latestSection.classList.add("inactive");
  trendingPreviewSection.classList.add("inactive");
  categoriesTopSection.classList.add("inactive");
  categoriesPreviewSection.classList.remove("inactive");
  likedMoviesSection.classList.add("inactive");
  upcomingPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  const [_, categoryData] = location.hash.split("=");
  const [categoryId, categoryName] = categoryData.split("-");

  headerCategoryTitle.innerHTML = categoryName;

  getMoviesByCategory(categoryId);

  infiniteScroll = getPaginatedMoviesByCategory(categoryId);
}
function myListPage() {
  console.log("MY LIST!!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  // arrowBtn.classList.remove('inactive');
  // arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");
  searchForm.classList.remove("inactive");

  latestSection.classList.add("inactive");
  trendingPreviewSection.classList.add("inactive");
  categoriesTopSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  likedMoviesSection.classList.add("inactive");
  upcomingPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  headerCategoryTitle.innerHTML = "Mi lista";
  getMyListMovies();
  infiniteScroll = getPaginatedTrendingMovies;
}
function homePage() {
  console.log("HOME!!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  // arrowBtn.classList.add('inactive');
  // arrowBtn.classList.remove('header-arrow--white');
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");

  latestSection.classList.remove("inactive");
  trendingPreviewSection.classList.remove("inactive");
  categoriesTopSection.classList.remove("inactive");
  categoriesPreviewSection.classList.add("inactive");
  likedMoviesSection.classList.remove("inactive");
  upcomingPreviewSection.classList.remove("inactive");
  genericSection.classList.add("inactive");
  movieDetailSection.classList.add("inactive");

  getLatestMovies();
  getTrendingMoviesPreview();
  getCategoriesPreview();
  getLikedMovies();
  getUpcomingMoviesPreview();
}
