//  Render tasks to html element;
export default function renderHtmlElements(taskList) {
  let taskListParent = document.getElementById("task-list-parent");
  let updateElements = taskList.map((item) => {
    return `
    
 <div class="flex bg-green-100 rounded-md items-center p-1 mb-2">
          <p class="w-full">${item.title}</p>
          <div class="flex gap-1">
            <button
              type="button"
              class="text-fg-brand bg-neutral-primary border border-brand hover:bg-brand hover:text-white focus:ring-4 focus:ring-brand-subtle font-medium leading-5 rounded-sm text-xs px-3 py-1.5 focus:outline-none"
            >
              Done
            </button>
            <button
              type="button"
              class="text-success bg-neutral-primary border border-success hover:bg-success hover:text-white focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-sm text-xs px-3 py-1.5 focus:outline-none"
            >
              Edit
            </button>
            <button
              type="button"
              class="text-danger bg-neutral-primary border border-danger hover:bg-danger hover:text-white focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-sm text-xs px-3 py-1.5 focus:outline-none"
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
