import { createSelector } from "reselect";

const selectDirectory = ({directory}) => directory;

export const selectDirectorySection = createSelector(
  [selectDirectory],
  (directory) => directory.sections,
);
