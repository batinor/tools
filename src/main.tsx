import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Home, Contact } from './pages';

const router = createBrowserRouter([
  {
    path: '/tools/',
    element: <App />,
    children: [
      {
        path: '/tools/',
        element: <Home />,
      },
      {
        path: '/tools/contact',
        element: <Contact />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')! as HTMLElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
