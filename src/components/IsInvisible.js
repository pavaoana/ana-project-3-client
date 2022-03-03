import React from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

export default function IsInvisible({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) return <p>Loading...</p>;

  if (isLoggedIn) {
    return <Navigate to="/courses/create" />;
  } else {
    // If the user is not logged in, allow them to see the page
    return children;
  }
}
