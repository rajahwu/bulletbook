import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider
} from 'react-router-dom';
import './index.css'
import { Root } from "./layouts"
import { LandingPage, TechPage, ErrorPage } from './pages'
import { loader as techLoader } from './pages/TechPage'

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
    path="/technologies"
    element={<TechPage />} 
    errorElement={<ErrorPage />}
    loader={techLoader}
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
