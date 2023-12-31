import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { ProfileAction, ProjectAction } from "./data/router/actions";
import {
  ProfileLoader,
  ProjectsLoader,
  TechLoader,
  TechViewLoader,
} from "./data/router/loaders";
import "./index.css";
import { Root } from "./layouts";
import {
  ErrorPage,
  LandingPage,
  NewProjectPage,
  ProfilePage,
  ProjectsPage,
  TechPage,
  TechViewPage
} from "./pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
      <Route
        path="/home"
        element={<LandingPage />}
        errorElement={<ErrorPage />}
      />

      <Route
        path="/profile"
        element={<ProfilePage />}
        errorElement={<ErrorPage />}
        loader={ProfileLoader}
        action={ProfileAction}
      />

      <Route
        path="/technologies"
        element={<TechPage />}
        errorElement={<ErrorPage />}
        loader={TechLoader}
      />

      <Route
        path="/technologies/*"
        element={<TechViewPage />}
        errorElement={<ErrorPage />}
        loader={TechViewLoader}
      />

      <Route
        path="/projects/new"
        element={<NewProjectPage />}
        errorElement={<ErrorPage />}
        loader={ProjectsLoader}
        action={ProjectAction}
      />

      <Route
        path="/projects/edit/:id"
        element={<NewProjectPage />}
        errorElement={<ErrorPage />}
        loader={ProjectsLoader}
      />

      <Route
        path="/projects"
        element={<ProjectsPage />}
        errorElement={<ErrorPage />}
        loader={ProjectsLoader}
      >
        <Route path=":id" element={<ProjectsPage />} />
      </Route>

      <Route errorElement={<div>Page Not Found</div>} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
