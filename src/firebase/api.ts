import { get, push, ref, set, remove, update } from "firebase/database";
import FilmDto from "../dto/filmdto";
import { FilmCard } from "../types/types";
import { db } from "./config";

interface FirebaseUser {
  email: string;
  profile_picture?: string;
  username?: string;
  films?: Record<string, FilmCard>;
}

export function writeUserData(
  userId: string,
  email: string,
  imageUrl?: string,
  name?: string
) {
  const reference = ref(db, "users/" + userId);

  const updates: FirebaseUser = {} as FirebaseUser;

  updates["username"] = name;
  updates["email"] = email;
  updates["profile_picture"] = imageUrl;
  update(reference, updates);
}

export function writeFilmData(userId: string, film: FilmDto) {
  const reference = ref(db, "users/" + userId + "/films");
  const newPostRef = push(reference);
  set(newPostRef, film);
}
export function removeFilmData(userId: string, filmId: string) {
  const reference = ref(db, "users/" + userId + "/films/" + filmId);
  remove(reference);
}

export const getFilmsData = async () => {
  const userId = localStorage.getItem("uid") as string;
  const reference = ref(db, "users/" + userId + "/films");
  const snapshot = await get(reference);
  const data = snapshot.val();
  return data;
};

const generateMatches = (data: Record<string, FirebaseUser>) => {
  const myEmail = localStorage.getItem("email");

  if (!myEmail) {
    return new Map();
  }
  const myFilms = Object.values(data).reduce(
    (acc: FilmCard[], user: FirebaseUser) => {
      console.log(acc, user);

      if (user.email === myEmail) {
        return user.films ? [...Object.values(user.films)] : [];
      }

      return acc;
    },
    []
  );
  if (!myFilms) {
    return new Map();
  }
  const matches: Record<string, FilmCard[]> = {};
  Object.values(data).forEach((user: FirebaseUser) => {
    if (user.email === myEmail) {
      return;
    }
    if (!user.films) {
      return;
    }
    Object.values(user.films).forEach((film: FilmCard) => {
      const isInMyFilms = !!myFilms.find((myFilm) => myFilm.id === film.id);
      if (isInMyFilms && user.username) {
        const actualData = matches[user.username] || [];
        matches[user.username] = [...actualData, film];
      }
    });
  });
  return matches;
};

export const checkFilmsMatches = async () => {
  const reference = ref(db, "users/");

  const snapshot = await get(reference);
  const users = snapshot.val();
  return generateMatches(users);
};

// export function checkFilmsMatchesV2() {
//   const reference = ref(db, "users/");
//   const result: Map<string, Film[]> = new Map();

//   onValue(reference, (snapshot) => {
//     snapshot.forEach((child) => {
//       const data: FirebaseUser = child.val();
//       if (!data.films) {
//         return;
//       }
//       Object.values(data.films).map((film: Film) => {
//         if (!result.has(data.email)) {
//           result.set(data.email, []);
//         }
//         result.get(data.email)?.push(film);
//       });
//     });
//   });
//   return generateMatches(result);
// }
// export function getFilmData(userId: string, filmId: string) {
//   const reference = ref(db, "users/" + userId + "films");

//   get(child(reference, `users/${userId}`))
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//       } else {
//         console.log("No data available");
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }

// const generateMatchesV2 = (data: Map<string, Film[]>) => {
//   const email = localStorage.getItem("email");
//   if (!email) {
//     return new Map();
//   }
//   const myFilms = data.get(email);
//   if (!myFilms) {
//     return new Map();
//   }
//   const matches = new Map();
//   data.forEach((value, key) => {
//     if (key === email) {
//       return;
//     }
//     value.forEach((film) => {

//       const isInMyFilms = !!myFilms.find((myFilm) => myFilm.id === film.id);
//       if (isInMyFilms) {
//         const actualData = matches.get(key) || [];
//         matches.set(key, [...actualData, film]);
//       }
//     });
//   });
//   return matches;
// };
