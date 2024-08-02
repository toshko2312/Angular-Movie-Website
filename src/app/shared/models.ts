export interface genresData {
  genres: [Genre];
}

export interface moviesData {
  page: number;
  results: [Movie];
  total_pages: number;
  total_results: number;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [string];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface detailedMovieData {
  account_states: AccountState;
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: {
    results: Video[];
  };
  reviews: Reviews;
  alternative_titles: AlternativeTitles;
  recommendations: Recommendations;
  credits: Credits;
}

interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface Video {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface Reviews {
  page: number;
  results: Review[];
  total_pages: number;
  total_results: number;
}

export interface Review {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

interface AuthorDetails {
  name: string;
  username: string;
  avatar_path?: string;
  rating?: number;
}

interface AlternativeTitles {
  titles: Title[];
}

interface Title {
  iso_3166_1: string;
  title: string;
  type: string;
}

interface Recommendations {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface Credits {
  cast: Cast[];
  crew: Crew[];
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface Crew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  credit_id: string;
  department: string;
  job: string;
}

export interface RequestTokenData {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export interface SessionIdData {
  success: boolean;
  session_id: string;
}

export interface DeleteSessionData {
  success: boolean;
}

export interface AccountState {
  favorite: boolean;
  rated: {
    value: number;
  };
  watchlist: boolean;
}

export interface ProfileDetailsData {
  avatar: Avatar;
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
}

interface Avatar {
  gravatar: {
    hash: string;
  };
  tmdb: {
    avatar_path: null | string;
  };
}

export interface RatedMoviesData {
  page: number;
  results: MovieRating[];
  total_pages: number;
  total_results: number;
}

export interface MovieRating {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[] | string[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  rating: number;
}

export interface StoreState {
  movieListings: MovieListingsState
  movieDetails: MovieDetailsState
  profile: ProfileState
  page: number;
  isLoading: boolean;
}

export interface AppState {
  page: number;
  isLoading: boolean;
}

export interface MovieListingsState {
  movies: moviesData | null;
  genres: genresData | null;
}

export interface MovieDetailsState {
  movie: detailedMovieData;
  trailerUrl: string;
  shake: boolean;
}

export interface ProfileState {
  ratedMovies: RatedMoviesData | null;
  profileDetails: ProfileDetailsData | null;
}
