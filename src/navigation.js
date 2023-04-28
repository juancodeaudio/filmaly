let maxPage;
let page = 1;
let infiniteScroll;
let searchIsFocus = false;

burgerBtn.addEventListener("click", () => {
  asideBackground.classList.add("aside-background--show");
  asideMenu.classList.remove("aside-menu--hidden");
});
asideBackBtn.addEventListener("click", () => {
  asideBackground.classList.remove("aside-background--show");
  asideMenu.classList.add("aside-menu--hidden");
});
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
categoriesAnimation.addEventListener("click", () => {
  location.hash = "#category=16-Animation";
});
categoriesDocumentary.addEventListener("click", () => {
  location.hash = "#category=99-Documentary";
});
// arrowBtn.addEventListener('click', () => {
//     history.back();
//     // location.hash = '#home';
// });
const mediaQuery = window.matchMedia("(max-width: 760px)");

const resetSearchForm = () => {
  if (mediaQuery.matches && !searchIsFocus) {
    searchFormInput.style.display = "none";
    searchFormBtn.style.display = "none";
    openSearchBtn.style.display = "block";
    searchForm.style.width = "20%";
    searchForm.style.right = "5%";
  } else {
    searchFormInput.style.display = "block";
    searchFormBtn.style.display = "block";
    openSearchBtn.style.display = "none";
  }
};
window.addEventListener("resize", resetSearchForm);
searchFormInput.addEventListener("focusin", (event) => {
  searchIsFocus = true;
});
searchFormInput.addEventListener("focusout", (event) => {
  searchIsFocus = false;
  resetSearchForm();
});

openSearchBtn.addEventListener("click", () => {
  searchFormInput.style.display = "block";
  searchFormBtn.style.display = "block";
  openSearchBtn.style.display = "none";
  searchForm.style.width = "65%";
  searchForm.style.right = "5%";
  searchFormInput.focus();
});

window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);
window.addEventListener("scroll", infiniteScroll, false);

function navigator() {
  console.log({ location });
  if (infiniteScroll) {
    window.removeEventListener("scroll", infiniteScroll, { passive: false });
    infiniteScroll = undefined;
  }
  asideBackground.classList.remove("aside-background--show");
  asideMenu.classList.add("aside-menu--hidden");
  searchFormInput.blur();
  if (location.hash.startsWith("#trends")) {
    trendsPage();
  } else if (location.hash.startsWith("#search=")) {
    searchPage();
  } else if (location.hash.startsWith("#movie=")) {
    movieDetailsPage();
  } else if (location.hash.startsWith("#on-theaters")) {
    onTheatersPage();
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
  moviePoster.classList.add("inactive");
  movieDetailSection.classList.add("inactive");

  headerCategoryTitle.innerHTML = "Trendings";
  getTrendingMovies();
  infiniteScroll = getPaginatedTrendingMovies;
}
function onTheatersPage() {
  console.log("TV-SHOWS!!");

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
  moviePoster.classList.add("inactive");
  movieDetailSection.classList.add("inactive");

  headerCategoryTitle.innerHTML = "On Theaters";
  getOnTheatersMovies();
  infiniteScroll = getPaginatedTrendingMovies;
}
function searchPage() {
  console.log("SEARCH!!");

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
  moviePoster.classList.add("inactive");
  movieDetailSection.classList.add("inactive");

  const [_, query] = location.hash.split("=");
  const fixedQuery = query.replace("%20", " ");
  getMoviesBySearch(fixedQuery);
  infiniteScroll = getPaginatedMoviesBySearch(fixedQuery);
  headerCategoryTitle.innerHTML = `Showing results for:  "${fixedQuery}"`;
}
function movieDetailsPage() {
  console.log("MOVIE!!");

  headerSection.classList.remove("header-container--long");
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
  moviePoster.classList.remove("inactive");
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
  moviePoster.classList.add("inactive");
  movieDetailSection.classList.add("inactive");

  const [_, categoryData] = location.hash.split("=");
  const [categoryId, categoryName] = categoryData.split("-");

  headerCategoryTitle.innerHTML = categoryName;
  categoriesPreviewTitle.innerHTML = categoryName
    ? `Category - ${categoryName}`
    : "Categories";
  selectedCategory = `id${categoryId}`;
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
  moviePoster.classList.add("inactive");
  movieDetailSection.classList.add("inactive");

  headerCategoryTitle.innerHTML = "My List";
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
  moviePoster.classList.add("inactive");
  movieDetailSection.classList.add("inactive");

  getLatestMovies();
  getTrendingMoviesPreview();
  getCategoriesPreview();
  getLikedMovies();
  getUpcomingMoviesPreview();
}
