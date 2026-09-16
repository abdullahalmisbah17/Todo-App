let taskList = [
  {
    id: 1,
    title: "title one",
    isDone: false,
  },
  {
    id: 2,
    title: "title two",
    isDone: false,
  },
  {
    id: 3,
    title: "title three",
    isDone: false,
  },
  {
    id: 4,
    title: "title four",
    isDone: false,
  },
  {
    id: 5,
    title: "title five",
    isDone: false,
  },
];

console.log(taskList);

let updateTaskList = taskList.map((data) => {
  return {
    ...data,
    test: "this is test",
  };
});

console.log(updateTaskList);

// // let updateTaskList = [];

// // for (let i = 0; i < taskList.length; i++) {
// //   updateTaskList.push({
// //     ...taskList[i],
// //     test: "this is test for loop",
// //   });
// //   //   console.log(taskList);
// // }

// // let updateTaskList = [];

// // for (let i = 0; i < taskList.length; i++) {
// //   const element = taskList[i];
// //   updateTaskList.push({
// //     ...element,
// //     test: "this is test for loop and got it",
// //   });
// // }

// // console.log(updateTaskList);
