'use strict';

const fs = require('fs');

/**
 * Validate task data
 * @param {object} task
 * @param {string} task.name
 */
const validateTask = ({ name, amount, currency }) => {
  if (!name) throw new Error('Task name task is required');
  if (typeof name !== 'string') throw new Error('Task Name must be a non empty string');
}

/**
 * Service for interaction with tasks
 */
module.exports = () => {
  const tasks = require('./tasks.json');

  return {
    /**
     * Get task by id
     * @param {number} id
     * @returns {object} task
     */
    getById(id) {
      return tasks.find(p => p.id === id) || null;
    },

    /**
     * Get lis of all tasks
     * @returns {array} tasks
     */
    getList() {
      return tasks;
    },

    /**
     * Update a task
     * @param {number} id - Task id
     * @param {object} task - Task data
     */
    update(id, task) {
      const idx = tasks.findIndex(p => p.id === id);
      if (idx === -1) throw new Error('Task not found');

      const pr = tasks[idx];
      pr.name = task.name || pr.name;

      validateTask(pr);
      tasks[idx] = pr;

      fs.writeFileSync('tasks.json', JSON.stringify(tasks));

      return pr;
    }

  };
};