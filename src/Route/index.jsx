import React from "react";
import { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Loader from "../Layout/Loader";
import { authRoutes } from "./AuthRoutes";
import LayoutRoutes from "../Route/LayoutRoutes";
import Signin from "../pages/dashboard/login";
import PrivateRoute from "./PrivateRoute";

// setup fake backend

const Routers = () => {
  const login = useState(localStorage.getItem("login"));
  const currentUrl = window.location.href;

  useEffect(() => {
    let abortController = new AbortController();
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <BrowserRouter basename={"/"}>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path={"/"} element={<PrivateRoute />}>
            {login ? (
              <>
                <Route exact path={`${process.env.PUBLIC_URL}`} element={<Navigate to={`${process.env.PUBLIC_URL}/dashboard/`} />} />
                <Route exact path={`${currentUrl}`} element={<Navigate to={`${currentUrl}/`} />} />
                <Route exact path={`/`} element={<Navigate to={`${process.env.PUBLIC_URL}/dashboard/`} />} />
              </>
            ) : (
              ""
            )}
            <Route path={`/*`} element={<LayoutRoutes />} />
          </Route>

          {login ? (
              <>
                  <Route exact path={`${process.env.PUBLIC_URL}/login`} element={<Signin />} />
              </>
            ) : (
              ""
            )}

          {/* {authRoutes.map(({ path, Component }, i) => (
            <Route path={path} element={Component} key={i} />
          ))} */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routers;
