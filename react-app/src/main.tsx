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
import { LandingPage, TechPage } from './pages'

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route
  path="/"
  element={<Root />}
  >
    <Route 
    path="/home"
    element={<LandingPage />} />

    <Route 
    path="/technologies"
    element={<TechPage />} />

  <Route errorElement={<div>Page Not Found</div>} />

  </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
