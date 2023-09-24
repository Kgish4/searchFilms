import { FC, PropsWithChildren, useContext } from "react";
import { Context } from "../main";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import Header from "../layouts/Header";

const RequireAuth: FC<PropsWithChildren> = ({ children }) => {
  const { auth } = useContext(Context);
  const location = useLocation();

  const [user] = useAuthState(auth);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default RequireAuth;
