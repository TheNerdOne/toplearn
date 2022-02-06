import React, { useEffect } from "react";
import { Redirect, Route, HashRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { useDispatch, useSelector } from "react-redux";

import Account from "../components/Account/Account";
import EditAccount from "../components/Account/EditAccount";
import Archive from "../components/Course/Archive";
import Courses from "../components/Course/Courses";
import MainLayout from "../components/layouts/MainLayout";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import SingleCourse from "../components/Course/SingleCourse";
import Logout from "../components/login/Logout";

import { paginate } from "../utils/paginate";
import { decodeToken } from "../utils/decodeToken";
import { addUser, clearUser } from "../actions/user";
import { isEmpty } from "lodash";
import UserContext from "../components/context/userContext";
import CourseTable from "../components/admin/CourseTable";
import Dashboard from "../components/admin/Dashboard";
import PrivateLayout from "../components/layouts/PrivateLayout";
import AdminContext from "../components/context/AdminContext";

const MySite = () => {
  const history = createBrowserHistory();

  const courses = useSelector((state) => state.courses);
  const user = useSelector((state) => state.user);

  const indexCourses = paginate(courses, 1, 8);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = decodeToken(token);
      const dateNow = Date.now() / 1000;
      if (dateNow > decodedToken.payload.exp) {
        localStorage.removeItem("token");
        dispatch(clearUser());
      } else {
        dispatch(addUser(decodedToken.payload.user));
      }
    }
  }, []);

  return (
    <Router history={history}>
      <Route path={["/dashboard"]}>
        <PrivateLayout>
          <Route
            path={"/dashboard/courses"}
            render={() =>
              !isEmpty(user) && user.isAdmin ? (
                <AdminContext courses={courses}>
                  <CourseTable />
                </AdminContext>
              ) : (
                <Redirect to="/" />
              )
            }
            // render={() => <CourseTable courses={courses} />}
          />
          <Route
            path={"/dashboard"}
            exact
            render={() =>
              !isEmpty(user) && user.isAdmin ? (
                <Dashboard courses={courses} />
              ) : (
                <Redirect to="/" />
              )
            }
            // render={() => <Dashboard courses={courses} />}
          />
        </PrivateLayout>
      </Route>
      <Route path={["/"]}>
        <MainLayout>
          <Router>
            <Route
              path="/login"
              render={() =>
                !isEmpty(user) ? (
                  <Redirect to="/" />
                ) : (
                  <UserContext>
                    <Login />
                  </UserContext>
                )
              }
            />
            <Route
              path="/logout"
              render={() => (isEmpty(user) ? <Redirect to="/" /> : <Logout />)}
            />
            <Route
              path="/register"
              render={() => (
                <UserContext>
                  <Register />
                </UserContext>
              )}
            />
            <Route path="/archive" component={Archive} />
            <Route path="/account" component={Account} />
            <Route path="/edit" component={EditAccount} />
            <Route path="/course/:id" component={SingleCourse} />
            <Route
              path="/"
              exact
              render={() => <Courses courses={indexCourses} />}
            />
          </Router>
        </MainLayout>
      </Route>
    </Router>
  );
};

export default MySite;
