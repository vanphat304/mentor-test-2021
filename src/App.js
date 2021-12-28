import logo from "./logo.svg";
import "./App.css";

import Login from "./pages/login";
import Header from "./pages/Header";

// import {Routes , Route} from 'react-router-dom'
import { Routes, Route } from "react-router-dom";
import Users from "./pages/admin/Users";
import FormAddUser from "./pages/admin/FormAddUser";
import Navigation from "./pages/admin/Navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createAction } from "./redux/action/action";
import { POST_USER_LOGIN } from "./redux/action/type";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    let userLogged = JSON.parse(localStorage.getItem("user"));
    dispatch(createAction(POST_USER_LOGIN, userLogged));
  });

  return (
    <div
      style={{ position: "relative", width: "100%" }}
      className="my-container"
    >
      <Navigation />
      <div className="main">
        <Header />
        <div className="detail admin">
          <Routes>
            <Route
              exact="true"
              path="/laydanhsachnguoidung"
              element={<Users />}
            />
            <Route
              exact="true"
              path="/themnguoidung"
              element={<FormAddUser />}
            />
            <Route exact="true" path="/dangnhap" element={<Login />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
