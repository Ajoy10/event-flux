import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Layout from './app/layout';
import LoginPage from './app/pages/login';
import SignupPage from './app/pages/signup';
import Dashboard from './app/pages/dashboard';
import NewEvent from './app/pages/dashboard/new';
import DashboardLayout from './app/pages/dashboard/layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <>Error!</>,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <SignupPage />,
      },
      {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
          {
            path: '/dashboard/',
            element: <Dashboard />,
          },
          {
            path: '/dashboard/new',
            element: <NewEvent />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
