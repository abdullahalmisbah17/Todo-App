let mainForm = document.getElementById("main_form");
let createInput = document.getElementById("create_input");
let errorMsg = document.getElementById("error_msg");
let totalTaskCount = document.getElementById("total_task_count");
let clearTask = document.getElementById("clear_task");
let taskListParent = document.getElementById("task-list-parent");
let submitFormBtn = document.getElementById("submit_form_btn");
let taskList = [];
let editItemId = null;
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

// this is event handler to add task;

mainForm.addEventListener("submit", addOrUpdateToDO);

// function for adding task to list by event listener;

function addOrUpdateToDO(event) {
  event.preventDefault();
  let inputValue = createInput.value;

  if (inputValue == "") {
    errorMsg.classList.remove("hidden");
    return;
  }
  if (editItemId) {
    // update item
    const updateListAfterEdit = taskList.map((item) => {
      if ("edit-" + item.id == editItemId) {
        return {
          ...item,
          title: inputValue,
        };
      } else {
        return item;
      }
    });
    taskList = updateListAfterEdit;
    submitFormBtn.innerText = "Add";
    editItemId = null;
  } else {
    // add item;
    taskList.push({
      id: crypto.randomUUID(),
      title: inputValue,
      isDone: false,
    });
    Toastify({
      text: "Task added successfully",
      className: "success",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  }

  renderHtmlElements();

  // createInput.value = ""
  mainForm.reset();
  calculateTotalTask();
}

//  Render tasks to html element;
function renderHtmlElements() {
  let updateElements = taskList.map((item, index) => {
    return `

 <div class="flex bg-green-100 rounded-md items-center p-1 mb-2">
          <p class="${item.isDone == true ? "w-full line-through opacity-80" : "w-full"}">${index + 1} ${item.title}</p>
          <div class="flex gap-1">
            <button
              type="button"
                id="done-${item.id}"
              class="text-fg-brand done-btn bg-neutral-primary border border-brand hover:bg-brand hover:text-white focus:ring-4 focus:ring-brand-subtle font-medium leading-5 rounded-sm text-xs px-3 py-1.5 focus:outline-none"
            >
              ${item.isDone ? "Undo" : "Done"}
            </button>
            <button
            id="edit-${item.id}"
              type="button"
              class="text-success edit-btn bg-neutral-primary border border-success hover:bg-success hover:text-white focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-sm text-xs px-3 py-1.5 focus:outline-none"
            >
              Edit
            </button>
            <button
            id="${item.id}"
              type="button"
              class="delete-btn text-danger bg-neutral-primary border border-danger hover:bg-danger hover:text-white focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-sm text-xs px-3 py-1.5 focus:outline-none"
            >
              Del
            </button>
          </div>
        </div>

    `;
  });

  taskListParent.innerHTML = updateElements.join("");
}

renderHtmlElements();

// Edit task
taskListParent.addEventListener("click", (event) => {
  let checkEditBtn = event.target.classList.contains("edit-btn");
  if (checkEditBtn == false) {
    return;
  }
  let idFromBtnTag = event.target.getAttribute("id");

  editItemId = idFromBtnTag;

  let editItem = taskList.find((item) => {
    return "edit-" + item.id == editItemId;
  });
  if (!editItem) return;

  console.log(editItem);
  createInput.value = editItem.title;
  submitFormBtn.innerText = "Update";

  Toastify({
    text: "Task edited successfully",
    className: "success",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
});

// delete task;

taskListParent.addEventListener("click", (event) => {
  let checkDeleteBtn = event.target.classList.contains("delete-btn");
  if (checkDeleteBtn == false) {
    return;
  }
  let isConfirm = confirm("Are you sure you want to remove it?");
  if (isConfirm == false) {
    return;
  }
  //delete Code
  let idFromBtnTag = event.target.getAttribute("id");

  let updateTasksAfterDelete = taskList.filter((task) => {
    return task.id != idFromBtnTag;
  });
  taskList = updateTasksAfterDelete;
  renderHtmlElements();
  calculateTotalTask();

  Toastify({
    text: "Task deleted successfully",
    className: "success",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
});
// change tasks

taskListParent.addEventListener("click", (event) => {
  let checkDoneBtn = event.target.classList.contains("done-btn");
  if (!checkDoneBtn) {
    return;
  }
  let idFromDoneBtn = event.target.getAttribute("id");
  const updateListAfterChangingStatus = taskList.map((item) => {
    if ("done-" + item.id === idFromDoneBtn) {
      return {
        ...item,
        isDone: !item.isDone,
      };
    } else {
      return item;
    }
  });
  taskList = updateListAfterChangingStatus;

  renderHtmlElements();

  Toastify({
    text: "Task updated successfully",
    className: "success",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
});

// clear task

//remove error massage  function

// function removeErrorMsg() {
//   createInput.addEventListener("keydown", () => {
//     errorMsg.classList.add("hidden");
//   });
// }

// removeErrorMsg();
/////    remove error massage function
function removeErrorMsg() {
  createInput.addEventListener("input", () => {
    if (createInput.value.trim() === "") {
      errorMsg.classList.remove("hidden");
    } else {
      errorMsg.classList.add("hidden");
    }
  });
}

removeErrorMsg();
//  total task count function
function calculateTotalTask() {
  totalTaskCount.innerHTML = taskList.length;
}

calculateTotalTask();

////  clear all tasks;

function clearAllTasks() {
  clearTask.addEventListener("click", () => {
    taskList = [];
    renderHtmlElements();
    calculateTotalTask();
  });
}

clearAllTasks();
