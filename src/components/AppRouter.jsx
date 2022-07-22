import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "../context";
import { Auth } from "../pages/Auth";
import { Transactions } from "../pages/Transactions";
import { privateRoutes, publicRoutes } from "../routes";

export const AppRouter = () => {
  const { isAuth } = useContext(AuthContext);

  return isAuth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route element={route.element} path={route.path} exact={route.exact} />
      ))}
      <Route exact path="*" element={<Transactions />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route element={route.element} path={route.path} exact={route.exact} />
      ))}
      <Route exact path="*" element={<Auth />} />
    </Routes>
  );
};
