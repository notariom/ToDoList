
// Maria Notario
// CSC 489
// 06/29/2025
// Mock up
//

document.addEventListener('DOMContentLoaded', () => {
            const todoInput = document.getElementById('todo-input');
            const taskList = document.getElementById('taskList');
            const editButton = document.getElementById('editButton');
            const deleteButton = document.getElementById('deleteButton');
            const mainCheckbox = document.getElementById('mainCheckbox');

            let selectedTask = null; // Variable to hold the currently selected task item

            // Load tasks from local storage on page load
            loadTasks();
            
            // Disable buttons on load
            updateButtonState();

            // Event listener to add a new task when the user presses Enter
            todoInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const taskText = todoInput.value.trim();
                    if (taskText !== '') {
                        addTask(taskText);
                        todoInput.value = '';
                        saveTasks();
                    }
                }
            });

            // Event listener for the Edit button in the input area
            editButton.addEventListener('click', () => {
                if (selectedTask) {
                    editTask(selectedTask.querySelector('.task-text'));
                    // Deselect the task after editing
                    selectedTask.classList.remove('selected');
                    selectedTask = null;
                    updateButtonState();
                } else {
                    alert('Please select a task to edit.');
                }
            });

            // Event listener for the Delete button in the input area
            deleteButton.addEventListener('click', () => {
                if (selectedTask) {
                    deleteTask(selectedTask);
                    // Deselect the task after deleting
                    selectedTask = null;
                    updateButtonState();
                } else {
                    alert('Please select a task to delete.');
                }
            });

            // Event listener for clicks on the task list to select/deselect items and handle checkboxes
            taskList.addEventListener('click', (e) => {
                const clickedItem = e.target.closest('.task-item');
                if (!clickedItem) return;

                // Handle checkbox clicks (for list items)
                if (e.target.classList.contains('task-checkbox')) {
                    // Toggle the 'completed' class based on the checkbox's state
                    clickedItem.classList.toggle('completed', e.target.checked);
                    saveTasks();
                } else {
                    // If the click is not on the checkbox, handle task selection
                    // Deselect the previous task if one was selected
                    if (selectedTask && selectedTask !== clickedItem) {
                        selectedTask.classList.remove('selected');
                    }

                    // Toggle the 'selected' class on the clicked item
                    clickedItem.classList.toggle('selected');
                    selectedTask = clickedItem.classList.contains('selected') ? clickedItem : null;
                    updateButtonState();
                }
            });

            /**
             * Updates the disabled state of the edit and delete buttons based on whether a task is selected.
             */
            function updateButtonState() {
                if (selectedTask) {
                    editButton.disabled = false;
                    deleteButton.disabled = false;
                } else {
                    editButton.disabled = true;
                    deleteButton.disabled = true;
                }
            }

            /**
             * Creates a new task item and adds it to the list.
             * @param {string} taskText The text content of the task.
             * @param {boolean} isCompleted The completion status of the task.
             */
            function addTask(taskText, isCompleted = false) {
                const li = document.createElement('li');
                li.classList.add('task-item');
                if (isCompleted) {
                    li.classList.add('completed');
                }

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.classList.add('task-checkbox');
                checkbox.checked = isCompleted;

                const taskSpan = document.createElement('span');
                taskSpan.classList.add('task-text');
                taskSpan.textContent = taskText;

                li.appendChild(checkbox);
                li.appendChild(taskSpan);

                taskList.appendChild(li);
            }

            /**
             * Edits the text content of a task.
             * @param {HTMLElement} taskSpan The span element containing the task text.
             */
            function editTask(taskSpan) {
                const currentText = taskSpan.textContent;
                const newText = prompt('Edit your task:', currentText);

                if (newText !== null && newText.trim() !== '') {
                    taskSpan.textContent = newText.trim();
                    saveTasks();
                }
            }

            /**
             * Deletes a task item from the list.
             * @param {HTMLElement} taskItem The list item to be deleted.
             */
            function deleteTask(taskItem) {
                if (confirm('Are you sure you want to delete this task?')) {
                    taskItem.remove();
                    saveTasks();
                }
            }

            /**
             * Saves all tasks to local storage.
             */
            function saveTasks() {
                const tasks = [];
                document.querySelectorAll('.task-item').forEach(item => {
                    const taskText = item.querySelector('.task-text').textContent;
                    const isCompleted = item.classList.contains('completed');
                    tasks.push({ text: taskText, completed: isCompleted });
                });
                localStorage.setItem('todoTasks', JSON.stringify(tasks));
            }

            /**
             * Loads tasks from local storage and adds them to the list.
             */
            function loadTasks() {
                const savedTasks = JSON.parse(localStorage.getItem('todoTasks'));
                if (savedTasks) {
                    savedTasks.forEach(task => {
                        addTask(task.text, task.completed);
                    });
                }
            }
        });






