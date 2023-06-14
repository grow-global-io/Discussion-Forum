import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import store from './app/store';
import CreatePage, { createAction } from './pages/CreatePage';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Login from './pages/Login';
import PostPage, { commentAction } from './pages/PostPage';
import ProfilePage, { profileAction } from './pages/ProfilePage';
import ProfileView, { userProfileLoader } from './pages/ProfileView';
import SignUp from './pages/SignUp';
import ProtectedRoutes from './routes/ProtectedRoutes';
import Root from './routes/Root';
import "./styles/styles.css";
import EditPage from './pages/EditPage';
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
    path:'/signup',
    element: <SignUp />,
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
        path: "/post/:id",
        // loader: PostLoader,
        element: <PostPage />,
        action: commentAction
      },
      {
        path: '/create/:id',
        element: <CreatePage />,
        action: createAction
      },
      {
        path: "/profile/:id",
        element: <ProfilePage />,
        action: profileAction
      },
      {
        path: '/user/:id/:username',
        element: <ProfileView />,
        loader: userProfileLoader
      },
      {
        path:"/edit-post/:id",
        element:<EditPage />,
      }
    ]
  },
  {
    path: "/home",
    element: <Home />,
  },
])

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);