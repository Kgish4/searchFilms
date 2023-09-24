import { useQuery } from "react-query";
import { getFilmsData, removeFilmData } from "../firebase/api";
import Spinner from "../components/Spinner/Spinner";
import List from "../components/List/List";
import { FilmCard } from "../types/types";
import { useCallback, useMemo } from "react";

const selectData = (data: Record<string, FilmCard>): FilmCard[] => {
  if (!data) {
    return [];
  }
  return Object.entries(data).map((value) => {
    const id = value[0];
    const film = value[1];
    return { ...film, db_id: id };
  });
};

const FilmsList = () => {
  const { refetch, status, data } = useQuery("films", getFilmsData, {
    refetchOnWindowFocus: false,
  });
  const memoCards = useMemo(() => selectData(data), [data]);

  const handleDeleteClick = (filmId: string) => {
    const uid = localStorage.getItem("uid") as string;

    removeFilmData(uid, filmId);
    refetch();
  };
  if (status === "loading") {
    return <Spinner />;
  }

  return <List closeCard={handleDeleteClick} cards={memoCards} />;
};

export default FilmsList;
