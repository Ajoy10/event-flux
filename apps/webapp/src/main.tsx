import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './app/layout';
import LoginPage from './app/pages/login';
import SignupPage from './app/pages/signup';

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
