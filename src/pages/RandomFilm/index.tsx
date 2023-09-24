import { Button, Image, Layout, Rate } from "antd";
import React, { Fragment } from "react";
import { useQuery } from "react-query";
import { getRandomFilm } from "../../api/FilmsService";
import { writeFilmData } from "../../firebase/api";
import FilmDto from "../../dto/filmdto";
import Spinner from "../../components/Spinner/Spinner";
import styles from "./RandomFilm.module.scss";
import Rates from "../../components/Rates";
import Videos from "../../components/Videos";

const RandomFilm = () => {
  const { refetch, status, data, isFetching } = useQuery(
    "randomFilm",
    getRandomFilm,
    {
      refetchOnWindowFocus: false,
    }
  );

  if (!data) {
    return <p>Looks like api don't work</p>;
  }
  const film = new FilmDto(data);
  const handleLikeClick = () => {
    const uid = localStorage.getItem("uid") as string;
    writeFilmData(uid, film);
    refetch();
  };
  const handleDislikeClick = () => {
    refetch();
  };

  if (status === "loading" || isFetching) {
    return <Spinner />;
  }
  console.log(data);
  return (
    <Layout.Content
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        height: "calc(100vh - 128px)",
        justifyContent: "center",
        flexDirection: "column",
        overflow: "auto",
      }}
    >
      <h1>{film.name}</h1>
      <Image width={200} src={film.poster} />

      <Layout.Content
        style={{
          padding: "20px",
          flexShrink: 0,
          flexGrow: 0,
        }}
      >
        <Rates rating={film.rating} />
      </Layout.Content>
      {film.videos ? <Videos {...film.videos} /> : null}
      <p>{film.description}</p>

      <Layout.Footer
        style={{
          marginTop: "10px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 0,
        }}
      >
        <button
          onClick={handleDislikeClick}
          className={styles.buttonDontLike}
          role="button"
        >
          Don't like
        </button>
        <button
          onClick={handleLikeClick}
          className={styles.buttonLike}
          role="button"
        >
          Like it
        </button>
      </Layout.Footer>
    </Layout.Content>
  );
};

export default RandomFilm;
