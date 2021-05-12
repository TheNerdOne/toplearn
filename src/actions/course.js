import { getCourse } from "../services/courseService";

export const getSingleCourse = (id) => {
  return async (dispatch) => {
    const { data } = await getCourse(id);
    await dispatch({ type: "GET_COURSE", payload: data.course });
  };
};
