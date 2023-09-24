import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import RandomFilm from "../pages/RandomFilm";
import { Context } from "../main";
import RequireAuth from "./RequireAuth";
import { useAuthState } from "react-firebase-hooks/auth";
import FilmsList from "../pages/FilmsList";
import Spinner from "../components/Spinner/Spinner";
import Matches from "../pages/Matches";

const AppRouter = () => {
  const { auth } = useContext(Context);
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <Login />}
      />
      <Route
        path="/my-films"
        element={
          <RequireAuth>
            <FilmsList />
          </RequireAuth>
        }
      />
      <Route
        path="/matches"
        element={
          <RequireAuth>
            <Matches />
          </RequireAuth>
        }
      />
      <Route
        path="/"
        element={
          <RequireAuth>
            <RandomFilm />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default AppRouter;
