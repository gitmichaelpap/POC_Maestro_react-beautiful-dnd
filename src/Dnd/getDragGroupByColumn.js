import dragGroups from "../req_hom_14-03-2022_RED.json";

export const getDragGroupByColumn = (key) => {
  for (let group of dragGroups) {
    if (group.columns.hasOwnProperty(key)) return group;
  }
};
