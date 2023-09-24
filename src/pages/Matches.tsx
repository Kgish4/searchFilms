import React, { Fragment } from "react";
import { checkFilmsMatches } from "../firebase/api";
import { useQuery } from "react-query";
import List from "../components/List/List";
import Spinner from "../components/Spinner/Spinner";

// const combineMatches = (myFilms: Card, mathesWithOther: Map<string, string[]>) => {
//     const result = {}
//      mathesWithOther.forEach((value, email) => {
//         return Object.entries(data).filter((film) => {
//             const filmData = film[1];
//             return value.includes(filmData.id) ? : ;
//           })
//     })
// }

const Matches = () => {
  //   const [mathes, setMatches] = useState<Map<string, Card[]>>(new Map());
  const { status, data } = useQuery("matches", checkFilmsMatches, {
    refetchOnWindowFocus: false,
  });

  if (status === "loading") {
    return <Spinner />;
  }
  return (
    <>
      {Object.entries(data)?.map((value) => {
        const name = value[0];
        const films = value[1];
        return (
          <Fragment key={name}>
            <p>With {name}:</p>
            <List cards={films}></List>
          </Fragment>
        );
      })}
    </>
  );
};

export default Matches;
