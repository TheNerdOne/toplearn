import React, { useEffect, useRef, useState } from "react";
import { userLogin, userRegister } from "../../services/userServices";
import SimpleReactValidator from "simple-react-validator";
import { errorMsg, successMsg } from "../../utils/messages";
import { addUser } from "../../actions/user";
import { decodeToken } from "../../utils/decodeToken";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router";
import { simpleContext } from "./context";
import { showLoading, hideLoading } from "react-redux-loading-bar";

const UserContext = ({ children, history }) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [policy, setPolicy] = useState();
  const [remember, setRemember] = useState();
  const [, forceUpdate] = useState();

  useEffect(() => {
    return () => {
      setFullname();
      setPassword();
      setEmail();
      setPolicy();
      forceUpdate();
    };
  }, []);

  const dispatch = useDispatch();

  const validator = useRef(
    new SimpleReactValidator({
      messages: {
        required: "پر کردن این فیلد الزامی است.",
        email: "ایمیل به طور صحیح وارد نشده است.",
        min: "کمتر از ۵ کاراکتر نباید باشد.",
      },
      element: (message) => <div style={{ color: "#E63946" }}>{message}</div>,
    })
  );

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    try {
      if (validator.current.allValid()) {
        dispatch(showLoading());
        const { data, status } = await userLogin(user);
        if (status === 200) {
          successMsg("شما با موفقیت وارد شدید.");
        }
        localStorage.setItem("token", data.token);
        dispatch(addUser(decodeToken(data.token).payload.user));
        dispatch(hideLoading());
        history.replace("/");
      } else {
        validator.current.showMessages();
        forceUpdate(1);
      }
    } catch (ex) {
      errorMsg("مشکلی پیش آمده.");
      dispatch(hideLoading());
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const user = {
      fullname,
      email,
      password,
    };

    try {
      if (validator.current.allValid()) {
        dispatch(showLoading());
        const { status } = await userRegister(user);
        if (status === 201) {
          successMsg("شما با موفقیت ثبت نام شدید.");
          dispatch(hideLoading());
          history.push("/login");
        }
      } else {
        validator.current.showMessages();
        forceUpdate(1);
      }
    } catch (ex) {
      errorMsg("مشکلی پیش آمده است.");
      dispatch(hideLoading());
      console.log(ex);
    }
  };

  return (
    <simpleContext.Provider
      value={{
        fullname,
        setFullname,
        email,
        setEmail,
        password,
        setPassword,
        policy,
        setPolicy,
        remember,
        setRemember,
        validator,
        handleLogin,
        handleRegister,
      }}
    >
      {children}
    </simpleContext.Provider>
  );
};

export default withRouter(UserContext);
