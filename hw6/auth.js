'use strict';

/**
 * Get user by auth token
 * @param {string} authToken
 * @return {object|null} user
 */
module.exports = (authToken) => {
  return {
    '5dae1fa4-9b8d-483a-9caa-b0d95bd3078e': {
      name: 'Rulon Oboev',
      permissions: {
        tasks: 15
      }
    },
    '9f264a3c-ba3c-44a7-933d-2b8393d81b5b': {
      name: 'Yasha Lava',
      permissions: {
        tasks: 1
      }
    }
  }[authToken] || null;
};