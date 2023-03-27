//Data
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: { "Content-Type": "application/json;charset=utf-8" },
  params: {
    api_key: API_KEY,
  },
});

let selectedCategory = undefined;

function likedMoviesList() {
  const item = JSON.parse(localStorage.getItem("liked_movies"));
  let movies;

  if (item) {
    movies = item;
  } else {
    movies = {};
  }
  return movies;
}

function likeMovie(movie) {
  const likedMovies = likedMoviesList();

  if (likedMovies[movie.id]) {
    likedMovies[movie.id] = undefined;
  } else {
    likedMovies[movie.id] = movie;
  }

  localStorage.setItem("liked_movies", JSON.stringify(likedMovies));
}

//> Utils

const lazyLoader = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const url = entry.target.getAttribute("data-img");
      entry.target.setAttribute("src", url);
    }
  });
});

function createMovies(
  movies,
  container,
  { lazyLoad = false, clean = true } = {}
) {
  if (clean) {
    container.innerHTML = "";
  }

  movies.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");

    const movieForeground = document.createElement("div");
    movieForeground.classList.add("movie-foreground");

    const movieTitle = document.createElement("p");
    movieTitle.innerHTML = movie.title;

    const movieRating = document.createElement("p");
    movieRating.innerHTML = "⭐️  " + movie.vote_average.toFixed(1);

    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute(
      lazyLoad ? "data-img" : "src",
      "https://image.tmdb.org/t/p/w300" + movie.poster_path
    );
    movieForeground.addEventListener("click", () => {
      location.hash = `#movie=${movie.id}`;
    });
    movieImg.addEventListener("click", () => {
      location.hash = `#movie=${movie.id}`;
    });
    movieImg.addEventListener("error", () => {
      movieImg.setAttribute(
        "src",
        "https://static.platzi.com/static/images/error/img404.png"
      );
    });

    const movieBtn = document.createElement("button");
    movieBtn.classList.add("movie-btn");
    likedMoviesList()[movie.id] && movieBtn.classList.add("movie-btn--liked");
    movieBtn.addEventListener("click", () => {
      movieBtn.classList.toggle("movie-btn--liked");
      likeMovie(movie);
    });

    if (lazyLoad) {
      lazyLoader.observe(movieImg);
    }

    movieForeground.appendChild(movieTitle);
    movieForeground.appendChild(movieRating);
    movieContainer.appendChild(movieImg);
    movieContainer.appendChild(movieForeground);
    movieContainer.appendChild(movieBtn);
    container.appendChild(movieContainer);
  });
}

function createMoviesLarge(
  movies,
  container,
  { lazyLoad = false, clean = true } = {}
) {
  if (clean) {
    container.innerHTML = "";
  }

  for (let i = 0; i < 3; i++) {
    const movie = movies[i];
    console.log({ movie });
    const year = movie.release_date.split("-")[0];
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container__wider");

    const movieShadow = document.createElement("div");
    movieShadow.classList.add("movie-shadow__wider");
    const movieDetailsWider = document.createElement("div");
    movieDetailsWider.classList.add("movie-details__wider");
    const movieDetailsInfoWider = document.createElement("div");
    movieDetailsInfoWider.classList.add("movie-details-info__wider");

    const movieTitle = document.createElement("h3");
    movieTitle.innerHTML = movie.title;

    const movieRating = document.createElement("p");
    movieRating.innerHTML = `⭐️  ${movie.vote_average.toFixed(1)}  • ${year}`;

    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute(
      lazyLoad ? "data-img" : "src",
      "https://image.tmdb.org/t/p/w1280" + movie.backdrop_path
    );
    movieContainer.addEventListener("click", () => {
      location.hash = `#movie=${movie.id}`;
    });
    movieImg.addEventListener("error", () => {
      movieImg.setAttribute(
        "src",
        "https://static.platzi.com/static/images/error/img404.png"
      );
    });

    const movieBtnMore = document.createElement("button");
    movieBtnMore.classList.add("movie-btn_more");
    movieBtnMore.innerText = "More...";
    movieBtnMore.addEventListener("click", () => {});

    if (lazyLoad) {
      lazyLoader.observe(movieImg);
    }

    movieDetailsInfoWider.appendChild(movieRating);
    movieDetailsInfoWider.appendChild(movieBtnMore);

    movieDetailsWider.appendChild(movieTitle);
    movieDetailsWider.appendChild(movieDetailsInfoWider);

    movieContainer.appendChild(movieImg);
    movieContainer.appendChild(movieShadow);
    movieContainer.appendChild(movieDetailsWider);
    container.appendChild(movieContainer);
  }
}

function createCategories(categories, container) {
  container.innerHTML = "";

  categories.forEach((category) => {
    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");

    const categoryTitle = document.createElement("h3");
    categoryTitle.classList.add("category-title");
    categoryTitle.setAttribute("id", `id${category.id}`);
    categoryTitle.addEventListener("click", () => {
      if (selectedCategory) {
        const singleCategory = document.getElementById(selectedCategory);
        console.log("category:", singleCategory);
        singleCategory.parentElement.classList.remove("selected-category");
        console.log(selectedCategory);
      }
      location.hash = `#category=${category.id}-${category.name}`;
      selectedCategory = `id${category.id}`;
      console.log(selectedCategory);
      categoryContainer.classList.add("selected-category");
    });
    const categoryTitleText = document.createTextNode(category.name);

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer);
  });
}

//> Llamados a la API

async function getLatestMovies() {
  const { data } = await api("movie/popular");
  const movies = data.results;
  console.log(data.results);

  createMoviesLarge(movies, latestMoviesPreviewList, true);
}

async function getTrendingMoviesPreview() {
  const { data } = await api("trending/movie/day");
  const movies = data.results;

  createMovies(movies, trendingMoviesPreviewList, true);
}

async function getUpcomingMoviesPreview() {
  const { data } = await api("movie/upcoming");
  const movies = data.results;

  createMovies(movies, upcomingMoviesPreviewList, true);
}

async function getCategoriesPreview() {
  const { data } = await api("genre/movie/list");
  const categories = data.genres;

  createCategories(categories, categoriesPreviewList);
}

async function getMoviesByCategory(id) {
  const { data } = await api("discover/movie", {
    params: {
      with_genres: id,
    },
  });
  const movies = data.results;
  maxPage = data.total_pages;

  createMovies(movies, genericSection, { lazyLoad: true, clean: true });
  console.log(selectedCategory);
}

function getPaginatedMoviesByCategory(id) {
  return async function () {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 15;
    const pageIsNotMax = page < maxPage;

    if (scrollIsBottom && pageIsNotMax) {
      page++;
      const { data } = await api("discover/movie", {
        params: {
          with_genres: id,
          page,
        },
      });
      const movies = data.results;

      createMovies(movies, genericSection, { lazyLoad: true, clean: false });
    }
  };
}

async function getMoviesBySearch(query) {
  const { data } = await api("search/movie", {
    params: {
      query,
    },
  });
  const movies = data.results;
  maxPage = data.total_pages;

  createMovies(movies, genericSection);
}

function getPaginatedMoviesBySearch(query) {
  return async function () {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 15;
    const pageIsNotMax = page < maxPage;

    if (scrollIsBottom && pageIsNotMax) {
      page++;
      const { data } = await api("search/movie", {
        params: {
          query,
          page,
        },
      });
      const movies = data.results;

      createMovies(movies, genericSection, { lazyLoad: true, clean: false });
    }
  };
}

async function getTrendingMovies() {
  const { data } = await api("trending/movie/day");
  const movies = data.results;
  maxPage = data.total_pages;

  createMovies(movies, genericSection, { lazyLoad: true, clean: true });
}

async function getPaginatedTrendingMovies() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 15;
  const pageIsNotMax = page < maxPage;

  if (scrollIsBottom && pageIsNotMax) {
    page++;
    const { data } = await api("trending/movie/day", {
      params: {
        page,
      },
    });
    const movies = data.results;

    createMovies(movies, genericSection, { lazyLoad: true, clean: false });
  }
}

async function getMovieById(id) {
  const { data: movie } = await api("movie/" + id);

  const movieImgUrl = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
  headerSection.style.background = `
        linear-gradient(
            180deg,
            rgba(0,0,0,0.35) 19.27%,
            rgba(0,0,0,0) 29.17%
        ),
        url(${movieImgUrl})
    `;

  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent = movie.vote_average;

  createCategories(movie.genres, movieDetailCategoriesList);
  getRelatedMoviesById(id);
}

async function getRelatedMoviesById(id) {
  const { data } = await api(`movie/${id}/recommendations`);
  const relatedMovies = data.results;
  createMovies(relatedMovies, relatedMoviesContainer);
}

function getLikedMovies() {
  const likedMovies = likedMoviesList();

  const moviesArray = Object.values(likedMovies);

  createMovies(moviesArray, likedMoviesListArticle, {
    lazyLoad: true,
    clean: true,
  });
}

async function getMyListMovies() {
  const likedMovies = likedMoviesList();

  const moviesArray = Object.values(likedMovies);
  createMovies(moviesArray, genericSection, { lazyLoad: true, clean: true });
}
