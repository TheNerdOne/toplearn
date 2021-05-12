import React from "react";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const TopNav = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="container">
      <nav>
        <div className="row">
          <div className="col-sm-6 col-xs-12">
            <ul>
              <li>
                <NavLink to="/" exact activeStyle={{ color: "lime" }}>
                  {" "}
                  صفحه اصلی{" "}
                </NavLink>
                <NavLink to="/"> درباره ما </NavLink>
                <NavLink to="/"> تماس با ما </NavLink>
              </li>
            </ul>
          </div>

          <div className="col-sm-6 col-xs-12">
            <div className="clientarea">
              {!isEmpty(user) ? (
                <div className="loggein">
                  <i className="zmdi zmdi-account"></i>
                  <NavLink to="/account"> {user.fullname} </NavLink>
                  {" / "}
                  {user.isAdmin ? (
                    <NavLink to="/dashboard">پنل ادمین / </NavLink>
                  ) : null}{" "}
                  <NavLink to="/logout"> خروج </NavLink>
                </div>
              ) : (
                <div className="signin">
                  <i className="zmdi zmdi-account"></i>
                  <NavLink to="/login" exact activeStyle={{ color: "lime" }}>
                    {" "}
                    ورود{" "}
                  </NavLink>{" "}
                  /
                  <NavLink to="/register" exact activeStyle={{ color: "lime" }}>
                    {" "}
                    عضویت{" "}
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default TopNav;
