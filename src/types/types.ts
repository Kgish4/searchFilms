export type FilmCard = {
  poster: string;
  name: string;
  id: string;
  rating: {
    imdb: string;
    kp: string;
  };
  db_id?: string;
};
export type Film = {
  description: string;
  id: string;
  name: string;
  poster: string;
};
