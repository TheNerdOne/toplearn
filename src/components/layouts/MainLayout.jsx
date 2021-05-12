import React, { Fragment } from "react";
import MainNav from "../Navs/MainNav";
import TopNav from "../Navs/TopNav";
import Footer from "../common/Footer";
import Header from "../common/Header";
import { withRouter } from "react-router";
import { Helmet } from "react-helmet";
import LoadingBar from "react-redux-loading-bar";

const MainLayout = (props) => {
  return (
    <Fragment>
      <Helmet>
        <title>فروشگاه من</title>
      </Helmet>
      <div className="landing-layer">
        <LoadingBar style={{ backgroundColor: "purple", height: "5px" }} />
        <TopNav />
        {props.location.pathname === "/" ? <Header /> : null}
      </div>

      <MainNav />

      <main id="home-page">
        <div className="container">{props.children}</div>
      </main>

      <Footer />
    </Fragment>
  );
};

export default withRouter(MainLayout);
