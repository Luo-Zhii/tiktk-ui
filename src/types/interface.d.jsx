/**
 * @typedef {Object} IUser
 * @property {string} _id 
 * @property {string} name 
 * @property {string} email 
 * @property {number} age
 * @property {string} gender 
 * @property {string} address
 * @property {string} createdBy
 * @property {string} isDeleted
 * @property {string} deletedAt
 * @property {string} createdAt
 * @property {string} updatedAt
 */

/**
 * @typedef {Object} IGetAccount
 * @property {string} access_token // Add properties as needed
 */

/**
 * @typedef {Object} IBackendRes
 * @property {string | string[]=} error
 * @property {string} message
 * @property {number | string} statusCode
 * @property {T=} data
 */

/**
 * Exporting the typedefs
 */
export { IUser, IGetAccount, IBackendRes };
