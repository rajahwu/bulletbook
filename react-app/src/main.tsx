import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom';

import { TechLoader, TechViewLoader } from './data/router/loaders';
import './index.css';
import { Root } from "./layouts";
import { ErrorPage, LandingPage, ProfilePage, TechPage, TechViewPage } from './pages';


const router = createBrowserRouter(
  createRoutesFromElements(
  <Route
  path="/"
  element={<Root />}
  errorElement={<ErrorPage />}
  >
    <Route 
    path="/home"
    element={<LandingPage />} 
    errorElement={<ErrorPage />}
    />

    <Route 
    path="/profile"
    element={<ProfilePage />}
    errorElement={<ErrorPage />}
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

  <Route errorElement={<div>Page Not Found</div>} />

  </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
