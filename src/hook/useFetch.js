import { useQuery } from "react-query";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRoute } from "@react-navigation/native";

// endpoints
const apiKey = "83a80992e3e2b43e952b24ab06266b90";
const apiBaseUrl = "https://api.themoviedb.org/3";
const TrendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const UpcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const TopRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;

//dynamic endpoints
const movieDetailsEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const similarMoviesEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;

// fallback images
export const fallbackMoviePoster =
  "https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg";
export const fallbackPersonImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU";

const fetchMovies = async (endpoint, params = {}) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };

  const response = await fetch(options.url, options);
  const data = await response.json();
  //   console.log(endpoint);

  return data;
};

export const fetchTrending = () => {
  const { isLoading, data, error, isError } = useQuery("trendingMovies", () =>
    fetchMovies(TrendingMoviesEndpoint, { api_key: apiKey })
  );
  return { isLoading, data, error, isError };
};
export const fetchUpcoming = () => {
  const { isLoading, data, error, isError } = useQuery("upcomingMovies", () =>
    fetchMovies(UpcomingMoviesEndpoint, { api_key: apiKey })
  );
  return { isLoading, data, error, isError };
};
export const fetchTopRated = () => {
  const { isLoading, data, error  } = useQuery("topRatedMovies", () =>
    fetchMovies(TopRatedMoviesEndpoint, { api_key: apiKey })
  );
  return { isLoading, data, error };
};
export const fetchMovieDetails = () => {
  const { params: item } = useRoute();
  const [first, setfirst] = useState("");
  useEffect(() => {
    setfirst(item.id);
    // console.log(item.id, "jajjajja");
  }, [item.id]);

  const { isLoading, data, error  } = useQuery("movieDetails", () =>
    fetchMovies(movieDetailsEndpoint(item.id), { api_key: apiKey })
  );
  return { isLoading, data, error };
};
export const fetchMovieCredits = () => {
  const { params: item } = useRoute();
  const { isLoading, data, error  } = useQuery("movieCredits", () =>
    fetchMovies(movieCreditsEndpoint(item.id), { api_key: apiKey })
  );
  return { isLoading, data, error };
};
export const fetchSimilarMovies = () => {
  const { params: item } = useRoute();
  const { isLoading, data, error  } = useQuery("similarMovies", () =>
    fetchMovies(similarMoviesEndpoint(item.id), { api_key: apiKey })
  );
  return { isLoading, data, error };
};
export const searchMovies = (onSearch) => {
//   const { params: item } = useRoute();
  const { isLoading, data, error  } = useQuery("searchMovies", () =>
    fetchMovies(searchMoviesEndpoint, onSearch)
  );
  return { isLoading, data, error };
};

// export const { isLoading, error, data } = useQuery('repoData', () =>
//     fetch('https://api.github.com/repos/tannerlinsley/react-query').then(res =>{
//         const data = res.json()
// console.log(data);
//     }
//     )
