import { useContext, useEffect } from "react";
import { UserContext } from "../utils/globalContext";
import { Navigate } from "@tanstack/react-location";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { userContext } = useContext(UserContext)!;
  useEffect(() => {
    console.log(!userContext ? "User not signed in" : "Signed in");
  }, [userContext]);
  if (userContext) {
    return <>{children}</>;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
