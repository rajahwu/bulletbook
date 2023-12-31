import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import {
  ProfileAction,
  ProjectAction,
  ProjectBulletAction,
  ProjectImageAction
} from "./controller/router/actions";
import {
  ProfileLoader,
  ProjectsLoader,
  TechLoader,
} from "./controller/router/loaders";
import "./index.css";
import { Root } from "./layouts";
import {
  AddProjectBulletPage,
  DeleteProjectPage,
  ErrorPage,
  LandingPage,
  NewProjectPage,
  ProfilePage,
  ProjectBulletPage,
  ProjectsPage,
  TechPage,
  TechViewPage,
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
        loader={TechLoader}
      />

      <Route
        path="/projects/new"
        element={<NewProjectPage />}
        errorElement={<ErrorPage />}
        loader={ProjectsLoader}
        action={ProjectAction}
      />

      <Route
        path="/projects/edit/:projectId"
        element={<NewProjectPage />}
        errorElement={<ErrorPage />}
        loader={ProjectsLoader}
        action={ProjectAction}
      />

      <Route
        path="/projects/delete/:projectId"
        element={<DeleteProjectPage />}
        errorElement={<ErrorPage />}
        loader={ProjectsLoader}
        action={ProjectAction}
      />

      <Route
        path="/projects/:projectId/images/edit/:imageId"
        element={<NewProjectPage />}
        errorElement={<ErrorPage />}
        loader={ProjectsLoader}
        action={ProjectImageAction}
      />
      
      <Route
        path="/projects/:projectId/images/delete/:imageId"
        element={<NewProjectPage />}
        errorElement={<ErrorPage />}
        loader={ProjectsLoader}
        action={ProjectImageAction}
      />

      <Route
        path="/projects"
        element={<ProjectsPage />}
        errorElement={<ErrorPage />}
        loader={ProjectsLoader}
        >
        <Route path=":id" element={<ProjectsPage />} />
      </Route>

      <Route 
      path="/bullets/:projectId/" 
      element={<ProjectBulletPage />} 
      action={ProjectBulletAction}
      />

      <Route 
      path="/bullets/:projectId/add" 
      element={<AddProjectBulletPage />} 
      action={ProjectBulletAction}
      />

      <Route errorElement={<div>Page Not Found</div>} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
