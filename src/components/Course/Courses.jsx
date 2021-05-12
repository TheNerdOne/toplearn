import React from "react";
import { Link, NavLink } from "react-router-dom";
import ShowImage from "../common/ShowImage";

const Courses = ({ courses }) => {
  return (
    <section className="terms-items">
      <header>
        <h2> آخرین دوره های من </h2>
        <NavLink to="/archive"> مشاهده همه دوره ها </NavLink>
      </header>
      <div className="row">
        {courses.map((course) => (
          <div
            key={course._id}
            className="col-lg-3 col-md-4 col-sm-6 col-xs-12 "
          >
            <article>
              <Link to={`/course/${course._id}`}>
                <ShowImage image={course.imageUrl} />
              </Link>
              <h2>
                <Link to={`/course/${course._id}`}>{course.title}</Link>
              </h2>
              <span> رایگان </span>
              <i>1:52:32</i>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Courses;
