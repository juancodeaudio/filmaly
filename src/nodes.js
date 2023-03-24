// Sections
const headerSection = document.querySelector("#header");
const latestSection = document.querySelector("#latestPreview");
const trendingPreviewSection = document.querySelector("#trendingPreview");
const categoriesTopSection = document.querySelector("#categoriesTop");
const categoriesPreviewSection = document.querySelector("#categoriesPreview");
const genericSection = document.querySelector("#genericList");
const movieDetailSection = document.querySelector("#movieDetail");
const likedMoviesSection = document.querySelector("#liked");
const upcomingPreviewSection = document.querySelector("#upcomingPreview");

// Lists & Containers
const searchForm = document.querySelector("#searchForm");
const latestMoviesPreviewList = document.querySelector(
  "#latestPreviewMovieList"
);
const trendingMoviesPreviewList = document.querySelector(
  "#trendingPreviewMovieList"
);
const upcomingMoviesPreviewList = document.querySelector(
  "#upcomingPreviewMovieList"
);
const categoriesPreviewList = document.querySelector(".categoriesPreview-list");
const movieDetailCategoriesList = document.querySelector(
  "#movieDetail .categories-list"
);
const relatedMoviesContainer = document.querySelector(
  ".relatedMovies-scrollContainer"
);
const likedMoviesListArticle = document.querySelector(".liked-movieList");

// Elements
const headerTitle = document.querySelector(".seccion-title");
// const arrowBtn = document.querySelector('.header-arrow');
const headerCategoryTitle = document.querySelector(
  ".seccion-title--categoryView"
);

const searchFormInput = document.querySelector("#searchForm input");
const searchFormBtn = document.querySelector("#searchBtn");

const trendingBtn = document.querySelector(".genericPreview-btn");

const movieDetailTitle = document.querySelector(".movieDetail-title");
const movieDetailDescription = document.querySelector(
  ".movieDetail-description"
);
const movieDetailScore = document.querySelector(".movieDetail-score");
