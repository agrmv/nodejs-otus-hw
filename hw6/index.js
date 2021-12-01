'use strict';

const tasksService = require('./tasksService')();
const auth = require('./auth');

const { program: program } = require('commander');

program.version('0.0.1');

// Display console text in red.
const errorColor = (str) => `\x1b[31m${str}\x1b[0m`;

const checkPermissions = (token, permission) => {
  const user = auth(token);
  if (!user || user.permissions.tasks < permission) {
    console.log(errorColor('Forbidden'));
    return false;
  }

  return true;
}

program
  .configureOutput({
    // Visibly override write routines as example!
    writeOut: (str) => process.stdout.write(`[OUT] ${str}`),
    writeErr: (str) => process.stdout.write(`[ERR] ${str}`),
    // Highlight errors in color.
    outputError: (str, write) => write(errorColor(str))
  });


// Get list of all tasks
program
  .command('all')
  .description('Get list of all tasks')
  .requiredOption('-t, --token <token>', 'Auth')
  .action((options) => {
    if (!checkPermissions(options.token, 1)) return;
    console.log(tasksService.getList());
  });

// Get task by id
program
  .command('id')
  .description('Get task by id')
  .argument('<id>', 'task id')
  .requiredOption('-t, --token <token>', 'Auth')
  .action((id, options) => {
    if (!checkPermissions(options.token, 1)) return;
    console.log(tasksService.getById(+id));
  });

// Update task data
program
  .command('update')
  .description('Update task data')
  .argument('<id>', 'Task id')
  .option('-n, --name <name>', 'Name of task')
  .requiredOption('-t, --token <token>', 'Auth')
  .action((id, options) => {
    if (!checkPermissions(options.token, 4)) return;

    try {
      console.log(tasksService.update(+id, {
        name: options.name,
        amount: +options.amount || undefined,
        currency: options.currency
      }));
    } catch (e) {
      console.log(errorColor(e.message));
    }
  });

program.parse(process.argv);
