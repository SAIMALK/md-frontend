import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/index.css";
import ScrollToBottomButton from "./plugins/ScrollToBottomButton";
import "./assets/styles/bootstrap.custom.css";
import StoryScreen from "./screens/StoryScreen";
import App1 from "./App1";
import { Provider } from "react-redux";
import store from "./store";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Filter from "./screens/Filter";
import Type from "./screens/Type";
import Genre from "./screens/Genre";
import AuthorScreen from "./screens/AuthorScreen";
import MangaViewer from "./screens/mangaViewer";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./screens/Home";
import ErrorPage from "./components/ErrorPage";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import AdminScreen from "./screens/Admin/AdminScreen";
import ProfileScreen from "./screens/ProfileScreen";
import StoryListScreen from "./screens/Admin/StoryListScreen";
import StoryEditScreen from "./screens/Admin/StoryEditScreen";
import UserListScreen from './screens/Admin/UserListScreen';
import UserEditScreen from  './screens/Admin/UserEditScreen';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App1 />}>
      <Route
        index={true}
        path="/"
        element={
          <div>
            <Home />
            <ScrollToBottomButton />
          </div>
        }
      />
      <Route
        path="/search/:keyword"
        element={
          <div>
            <Home />
            <ScrollToBottomButton />
          </div>
        }
      />
      <Route
        path="/page/:pageNumber"
        element={
          <div>
            <Home />
            <ScrollToBottomButton />
          </div>
        }
      /> 
      <Route
        path="/Type/page/:pageNumber"
        element={
          <div>
            <Type />
            <ScrollToBottomButton />
          </div>
        }
      /> 
      <Route path="/search/:keyword/page/:pageNumber" element={
          <div>
            <Home />
            <ScrollToBottomButton />
          </div>
        }
      />
      <Route path="/Genre" element={<Genre/>} />
      <Route path="/Type" element={<Type/>} />
      <Route path="/Filter" element={<Filter/>} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />


      <Route path="*" element={<ErrorPage />} />

      <Route path="" element={<PrivateRoute />}>
      <Route
        path="/story/:id"
        element={
          <div>
            <StoryScreen />
            <ScrollToBottomButton />
          </div>
        }
      />
      <Route
        path="/author/:id"
        element={
          <div>
            <AuthorScreen />
            <ScrollToBottomButton />
          </div>
        }
      />
      <Route path="/story/:id/chapters/" element={<div><MangaViewer/><ScrollToBottomButton /> </div>}/>

      <Route path="/profile" element={<ProfileScreen />} />
      </Route>

      <Route path="" element={<AdminRoute />}>
      <Route path="admin/" element={<AdminScreen />} />
      <Route path="admin/userlist" element={<UserListScreen />} />
      <Route path="admin/StoryList" element={<StoryListScreen />} />
      <Route path="admin/StoryList/:pageNumber" element={<StoryListScreen />} />

      <Route path="admin/story/:id/edit" element={<StoryEditScreen />} />
      <Route path="admin/user/:id/edit" element={<UserEditScreen />} />

      </Route>


    </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);


