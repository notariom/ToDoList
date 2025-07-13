//
// Maria Notario
// CSC 489
// 06/29/2025
// Mock up
//
document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage on page load
    loadTasks();

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

    // Event listener for clicks on the task list to handle checkboxes and buttons
    taskList.addEventListener('click', (e) => {
        const clickedItem = e.target.closest('.task-item');
        if (!clickedItem) return;

        // Handle checkbox clicks
        if (e.target.classList.contains('task-checkbox')) {
            clickedItem.classList.toggle('completed', e.target.checked);
            saveTasks();
        }

        // Handle edit button clicks
        if (e.target.closest('.edit-btn')) {
            const taskTextSpan = clickedItem.querySelector('.task-text');
            editTask(taskTextSpan);
        }

        // Handle delete button clicks
        if (e.target.closest('.delete-btn')) {
            deleteTask(clickedItem);
        }
    });

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

        // Create the container for the buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('task-buttons');

        // Create the edit button
        const editBtn = document.createElement('button');
        editBtn.classList.add('edit-btn');
        editBtn.innerHTML = '<img src="Pencil.png" alt="Edit">';
        
        // Create the delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerHTML = '<img src="Trash.png" alt="Delete">';

        // Append buttons to the container
        buttonContainer.appendChild(editBtn);
        buttonContainer.appendChild(deleteBtn);

        li.appendChild(checkbox);
        li.appendChild(taskSpan);
        li.appendChild(buttonContainer); // Add the button container to the list item

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