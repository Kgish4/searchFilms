interface IFilmKP {
  id: string;
  name: string;
  poster: {
    url: string;
  };
  rating: Record<string, number>;
  description: string;
  videos: {
    teasers: Video[];
    trailers: Video[];
  };
}

export type Video = {
  name: string;
  site: string;
  type: string;
  url: string;
};

class FilmDto {
  id: string;
  name: string;
  poster: string;
  rating: Record<string, number>;
  description: string;
  videos: {
    teasers: Video[];
    trailers: Video[];
  };
  constructor(film: IFilmKP) {
    this.id = film.id;
    this.name = film.name;
    this.poster = film.poster.url;
    this.rating = { imdb: film.rating.imdb, kp: film.rating.kp };
    this.description = film.description;
    this.videos = film.videos;
  }
}

export default FilmDto;
