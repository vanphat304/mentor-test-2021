import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function Navigation() {
  const userInfo = useSelector((item) => item.adminReducer.userLogged);

  return (
    <div className="navigation">
      <ul className="nav nav-tabs" role="tablist">
        <li>
          <NavLink to="" exact></NavLink>
        </li>

        {userInfo.hoTen ? (
          <>
            <li>
              <span style={{ paddingLeft: "10px" }}>
                hello {userInfo.hoTen}
              </span>
            </li>
            <li>
              <NavLink to="/laydanhsachnguoidung" exact>
                <span className="title">lấy danh sách người dùng</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="themnguoidung" exact>
                <span className="title">thêm người dùng</span>
              </NavLink>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/dangnhap" exact>
              <span className="title">đăng nhập</span>
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}
