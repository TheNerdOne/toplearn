import { createContext } from "react";

export const dashContext = createContext({
  currentPage: 1,
  setCurrentPage: () => {},
  perPage: 5,
  courseData: [],
  handlePageChange: () => {},
  setSearch: () => {},
  openNewCourseDialogue: () => {},
  openEditCourseDialogue: () => {},
  openDeleteCourseDialogue: () => {},
  filteredCourses: [],
  sortCoursesAsc: () => {},
  sortCoursesDes: () => {},
});
