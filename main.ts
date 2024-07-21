#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let todolist: string[] = [];
let conditions = true;

console.log(
  chalk.magenta.bold("\n \t\t  ---------------------------------------")
);
console.log(
  chalk.magenta.bold(
    "\t>>>>>>>>  Welcome to Moiz - Todo-list Application  <<<<<<<<"
  )
);
console.log(
  chalk.magenta.bold("\t\t  ---------------------------------------")
);

let main = async () => {
  while (conditions) {
    let options = await inquirer.prompt([
      {
        name: "choice",
        type: "list",
        message: "\nSelect an option you want to do: ",
        choices: [
          "Add Task",
          "Delete Task",
          "Update Task",
          "View todo-list",
          "Exit",
        ],
      },
    ]);
    if (options.choice === "Add Task") {
      await addTask();
    } else if (options.choice === "Delete Task") {
      await deleteTask();
    } else if (options.choice === "Update Task") {
      await updateTask();
    } else if (options.choice === "View todo-list") {
      await viewTask();
    } else if (options.choice === "Exit") {
      conditions = false;
    }
  }
};

// function to add task
let addTask = async () => {
  let newTask = await inquirer.prompt([
    {
      name: "task",
      type: "input",
      message: "Enter your new task : ",
    },
  ]);
  todolist.push(newTask.task);
  console.log(
    chalk.green.bold(
      `\n ${newTask.task} task added successfully in Todo-List\n`
    )
  );
};

// function to view list
let viewTask = () => {
  console.log("\n Your Todo-List: \n");
  todolist.forEach((task, index) => {
    console.log(`${index + 1}: ${task}\n`);
  });
};

//function to delete a task
let deleteTask = async () => {
  await viewTask();
  let taskIndex = await inquirer.prompt([
    {
      name: "index",
      type: "number",
      message: "\nEnter the 'index No.' of the task you want to delete :",
    },
  ]);
  let deletedTask = todolist.splice(taskIndex.index - 1, 1);
  console.log(
    chalk.blueBright.bold(
      `\n${deletedTask} this task has been deleted sucessfully from your todo-list\n`
    )
  );
};

// function to update a task
let updateTask = async () => {
  await viewTask();
  let update_task_index = await inquirer.prompt([
    {
      name: "index",
      type: "number",
      message: "\nEnter the 'index No.' of the task you want to update :",
    },
    {
      name: "newtask",
      type: "input",
      message: "Now enter new task name :",
    },
  ]);
  todolist[update_task_index.index - 1] = update_task_index.newtask;
  console.log(
    chalk.yellow.bold(
      `\n Task at index no. ${update_task_index.index} updated successfully [For update list check option: 'View todo-list]\n`
    )
  );
};
main();
