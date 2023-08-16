import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import store from './app/store';
import "./index.css";
import Home from './pages/Home';
import Login from './pages/Login';
import PostsManagement from './pages/PostsManagement.js';
import UsersManagement from './pages/UsersManagement';
import ErrorPage from './routes/ErrorPage';
import ProtectedRoutes from './routes/ProtectedRoutes';
import Root from './routes/Root';


const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    element: <ProtectedRoutes />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/Posts-Management",
        element: <PostsManagement />,
      },
      {
        path: "/User-Management",
        element: <UsersManagement />,
      }
    ]
  }
])
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
