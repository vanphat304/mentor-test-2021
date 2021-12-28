import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { registerUser } from "../../redux/service/admin";
import { useNavigate } from "react-router-dom";

// import { postUser } from "../../../service/admin";
export default function FormAddUser() {
  const navigate = useNavigate();
  const token = useSelector((item) => item.adminReducer.userLogged.accessToken);
  const [errorMessage, setErrorMessage] = useState({
    flag: false,
    message: "",
  });

  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "",
    maLoaiNguoiDung: "",
    hoTen: "",
  });
  const handleChange = (e) => {
    let { value, name } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("user", user);
      const result = await registerUser(user, token);
      if (result.status === 200) {
        alert("thêm người dùng thành công");
        setErrorMessage({ flag: false, mesage: "" });
        navigate("/laydanhsachnguoidung");
      }
    } catch (error) {
      if (error.response.status === 401) {
        setErrorMessage({
          flag: true,
          message: "bạn không đủ quyền thêm người dùng",
        });
      } else {
        setErrorMessage({
          flag: true,
          message: "xảy lỗi khi thêm người dùng ",
        });
      }
      throw error;
    }
  };

  return (
    <form>
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
      <div className="mb-3">
        <label className="form-label">email</label>
        <input
          type="email"
          className="form-control"
          name="email"
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">số điện thoại</label>
        <input
          type="number"
          className="form-control"
          name="soDt"
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">mã nhóm</label>

        <select name="maNhom" className="form-control" onChange={handleChange}>
          <option value=""></option>
          <option value="GP01">GP01</option>
          <option value="GP02">GP02</option>
          <option value="GP03">GP03</option>
          <option value="GP04">GP04</option>
          <option value="GP05">GP05</option>
          <option value="GP06">GP06</option>
          <option value="GP07">GP07</option>
          <option value="GP08">GP08</option>
          <option value="GP09">GP09</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">loại người dùng</label>
        <select
          name="maLoaiNguoiDung"
          className="form-control"
          onChange={handleChange}
        >
          <option value=""></option>
          <option value="QuanTri">quản trị viên</option>
          <option value="KhachHang">khách hàng</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">họ tên người dùng</label>
        <input
          type="text"
          className="form-control"
          name="hoTen"
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        thêm người dùng
      </button>
    </form>
  );
}
