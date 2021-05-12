import {
  deleteCourse,
  getCourses,
  newCourse,
  updateCourse,
} from "../services/courseService";
import { successMsg } from "../utils/messages";

export const getAllCourses = () => {
  return async (dispatch) => {
    const { data } = await getCourses();
    await dispatch({ type: "INIT", payload: data.courses });
  };
};

export const createNewCourse = (course) => {
  return async (dispatch, getState) => {
    const { data, status } = await newCourse(course);
    if (status === 201) successMsg("دوره با موفقیت ساخته شد");
    await dispatch({
      type: "ADD_COURSE",
      payload: [...getState().courses, data.course],
    });
  };
};

export const handleCourseUpdate = (courseId, updatedCourse) => {
  return async (dispatch, getState) => {
    const courses = [...getState().courses];
    const updatedCourses = [...courses];
    const courseIndex = updatedCourses.findIndex(
      (course) => course._id == courseId
    );

    let course = updatedCourses[courseIndex];

    course = { ...Object.fromEntries(updatedCourse) };
    updatedCourses[courseIndex] = course;

    try {
      await dispatch({
        type: "UPDATE_COURSE",
        payload: [...updatedCourse],
      });
      const { data, status } = await updateCourse(courseId, updatedCourse);
      console.log(data);
      if (status === 200) {
        successMsg("دوره با موفقیت ویرایش شد.");
      }
    } catch (ex) {
      await dispatch({ type: "UPDATE_COURSE", payload: [...courses] });
    }
  };
};

export const handleCourseDelete = (courseId) => {
  return async (dispatch, getState) => {
    const courses = [...getState().courses];
    const filteredCourse = courses.filter((course) => course._id !== courseId);

    try {
      await dispatch({ type: "DELETE_COURSE", payload: [...filteredCourse] });
      const { data, status } = await deleteCourse(courseId);
      if (status === 200) {
        successMsg("دوره با موفقیت پاک شد.");
      }
    } catch (ex) {
      await dispatch({ type: "DELETE_COURSE", payload: [...courses] });
    }
  };
};
