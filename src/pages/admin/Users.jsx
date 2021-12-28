import React from "react";
import { useEffect } from "react";
import { getListUser } from "../../redux/service/admin";
import { useDispatch, useSelector } from "react-redux";
import { createAction } from "../../redux/action/action";
import { POST_LIST_USER } from "../../redux/action/type";

export default function Users(props) {
  const dispatch = useDispatch();
  const listUser = useSelector((item) => item.adminReducer.listUser);

  const renderUsers = () => {
    return listUser.map((item, key) => {
      return (
        <tr key={key}>
          <td>{item.taiKhoan}</td>
          <td>{item.hoTen}</td>
          <td>{item.email}</td>
          <td>{item.soDt}</td>
          <td>{item.matKhau}</td>
          <td>{item.maLoaiNguoiDung}</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      );
    });
  };
  useEffect(async () => {
    let listUser = await getListUser();
    dispatch(createAction(POST_LIST_USER, listUser.data.content));
  }, []);

  return (
    <div className="listUser">
      <div>
        <h2 className="content">Danh Sách Người Dùng</h2>
      </div>
      <table>
        <thead>
          <tr>
            <td>Tài Khoản</td>
            <td>Họ Tên</td>
            <td>email</td>
            <td>số điện thoại</td>
            <td>mật khẩu</td>
            <td>mã loại người dùng</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </thead>
        <tbody>{renderUsers()}</tbody>
      </table>
    </div>
  );
}
