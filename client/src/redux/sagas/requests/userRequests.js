import { POST, GET, DELETE } from "../../../config/api";
import { apiEndpoints } from "../../../constants/apiEndpoints";

/**
 * 
 * @param {Object} data {
    userId : "abcdefgrgr",
    email: "some@gmail.com",
    userType: "student",
    password: "dngdsg",
    joinedOn: "date-time",
    userName: "dgndg"

}
 * @returns 
 */
export const createNewUser = (data) => {
  return POST(apiEndpoints.USERS, data);
};
