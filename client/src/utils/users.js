/**
 * 
 * @param {String} password It is the password entered by the user
 * @returns base64 encoded string
 */
export const encodePassword = (password) =>{
    return(window.btoa(password));
};

/**
 * 
 * @param {*} password It is the password entered by the user
 * @returns decodes the base64 string
 */
export const decodePassword = (password) =>{
    return(window.atob(password));
}