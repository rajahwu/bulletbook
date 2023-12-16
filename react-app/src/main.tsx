import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider
} from 'react-router-dom';
import './index.css'
import { LandingPage, TechPage } from './pages'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route 
      path="/"
      element={<LandingPage />}
      >
      <Route 
      path="/technologies"
      element={<TechPage />}
      />
      </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
