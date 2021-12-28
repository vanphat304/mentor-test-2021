import React from "react";
import { useState } from "react";
import { login } from "../../redux/service/admin";
import { useDispatch } from "react-redux";
import { createAction } from "../../redux/action/action";
import { POST_USER_LOGIN } from "../../redux/action/type";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [userLogin, setUserLogin] = useState({
    taiKhoan: "",
    matKhau: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    flag: false,
    message: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    let { value, name } = e.target;
    setUserLogin({
      ...userLogin,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let user = await login(userLogin);
      console.log("userlogin", user);
      if (user.status === 200) {
        let userLogged = user.data.content;
        localStorage.setItem("user", JSON.stringify(userLogged));
        dispatch(createAction(POST_USER_LOGIN, userLogged));
        setErrorMessage({ flag: false, mesage: "" });
        alert("đăng nhập thành công");
        navigate("/laydanhsachnguoidung");
      }
    } catch (error) {
      if (error.response.status === 403) {
        setErrorMessage({
          flag: true,
          message:
            "Token không cybersoft không hợp lệ hoặc đã hết hạn truy cập",
        });
      } else {
        setErrorMessage({
          flag: true,
          message: "tài khoản , mật khẩu không chính xác",
        });
      }
      throw error;
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {errorMessage.flag ? (
        <div className="mb-3 alert alert-danger" role="alert">
          {errorMessage.message} !!!
        </div>
      ) : (
        ""
      )}
      <div className="mb-3">
        <label className="form-label">tài khoản</label>
        <input
          name="taiKhoan"
          type="text"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">mật khẩu</label>
        <input
          type="password"
          className="form-control"
          name="matKhau"
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        đăng nhập
      </button>
    </form>
  );
}
