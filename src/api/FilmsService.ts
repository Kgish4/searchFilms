import axios from "axios";

const config = {
  headers: {
    "X-API-KEY": "K797N8G-WMNM79Z-M2A2QMC-9XHCDYG",
    "Access-Control-Allow-Origin": null,
  },
};

export const getRandomFilm = async () => {
  const { data } = await axios.get(
    "https://api.kinopoisk.dev/v1.3/movie/random",
    config
  );
  return data;
};

export const getFilm = async (id: string) => {
  const { data } = await axios.get(
    `https://api.kinopoisk.dev/v1.3/movie/${id}`,
    config
  );
  return data;
};
