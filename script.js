// DOM Elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const clearAllButton = document.getElementById('clearAll');
const editPopup = document.getElementById('editPopup');
const saveChangesButton = document.getElementById('saveChanges');
const cancelEditButton = document.getElementById('cancelEdit');
const editDescriptionInput = document.getElementById('editDescription');
const editPrioritySelect = document.getElementById('editPriority');
const editDueDateInput = document.getElementById('editDueDate');

// Task Array
let tasks = [];

// API Base URL
const apiUrl = 'http://localhost:5000/tasks';

// Fetch tasks from JSON Server
async function fetchTasks() {
    const response = await fetch(apiUrl);
    tasks = await response.json();
    renderTasks();
}

// Render tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');

        // Only show due date if it's set
        const dueDateText = task.dueDate ? `  ${task.dueDate}` : ''; // Conditionally render due date

        taskItem.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">
                ${task.description} 
                ${task.priority ? `<span class="priority-circle ${getPriorityClass(task.priority)}"></span>` : ''} 
                ${dueDateText}
            </span>
            <button class="check" onclick="markCompleted(${task.id})">✔</button>
            <button class="edit" onclick="editTask(${task.id})">✏️</button>
            <button class="delete" onclick="deleteTask(${task.id})">🗑</button>
        `;
        taskList.appendChild(taskItem);
    });
}

// Get the appropriate class for the priority circle
function getPriorityClass(priority) {
    if (priority === 'low') return 'priority-low';
    if (priority === 'medium') return 'priority-medium';
    if (priority === 'high') return 'priority-high';
    return ''; // Default
}

// Add new task
addTaskButton.addEventListener('click', async () => {
    if (taskInput.value.trim()) {
        const newTask = {
            description: taskInput.value,
            priority: '',  // you can adjust it based on your form
            dueDate: '',
            completed: false
        };

        // Create the new task via API
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask)
        });
        const task = await response.json();
        tasks.push(task); // Add new task to local task array
        taskInput.value = '';
        renderTasks();
    }
});

// Mark task as completed
async function markCompleted(id) {
    const task = tasks.find(t => t.id === id);
    task.completed = !task.completed;

    // Update the task via API
    await fetch(`${apiUrl}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: task.completed })
    });

    renderTasks();
}

// Edit task
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    editDescriptionInput.value = task.description;
    editPrioritySelect.value = task.priority || '';
    editDueDateInput.value = task.dueDate || '';

    // Show popup
    editPopup.style.display = 'block';

    saveChangesButton.onclick = async () => {
        task.description = editDescriptionInput.value;
        task.priority = editPrioritySelect.value || '';
        task.dueDate = editDueDateInput.value;

        // Update the task via API
        await fetch(`${apiUrl}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        });

        renderTasks();
        editPopup.style.display = 'none';
    };

    cancelEditButton.addEventListener('click', () => {
        editPopup.style.display = 'none';
    });
}

// Delete task
async function deleteTask(id) {
    // Delete the task via API
    await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    });

    tasks = tasks.filter(task => task.id !== id); // Remove from local array
    renderTasks();
}

// Clear all tasks
clearAllButton.addEventListener('click', async () => {
    await fetch(apiUrl, {
        method: 'DELETE',
    });
    tasks = []; // Reset tasks array
    renderTasks();
});

// Initialize task list on page load
fetchTasks();

// Modal close button
const closeModalButton = document.querySelector('.close');
closeModalButton.addEventListener('click', () => {
    editPopup.style.display = 'none'; // Close the modal
});



// Get references to the dark mode toggle button and icon
const toggleDarkModeButton = document.getElementById('toggleDarkMode');
const body = document.body;
const modeIcon = document.getElementById('modeIcon');



// Check the current mode and update the icon
function updateDarkModeIcon() {
    if (body.classList.contains('dark-mode')) {
        modeIcon.classList.remove('fa-moon');  // Remove moon icon
        modeIcon.classList.add('fa-sun');      // Add sun icon
    } else {
        modeIcon.classList.remove('fa-sun');   // Remove sun icon
        modeIcon.classList.add('fa-moon');     // Add moon icon
    }
}

// Add event listener to the toggle button
toggleDarkModeButton.addEventListener('click', () => {
    // Toggle the dark-mode class on the body
    body.classList.toggle('dark-mode');
    // Update the icon based on the current mode
    updateDarkModeIcon();
});

// Initialize the icon based on the current mode
updateDarkModeIcon();



        // Function to update the date and time
        function updateDateTime() {
            const dateTimeElement = document.getElementById('dateTime');
            const currentDate = new Date();

            // Format the date in "11 May 2025" format
            const day = currentDate.getDate();
            const month = currentDate.toLocaleString('default', { month: 'long' });
            const year = currentDate.getFullYear();
            const hours = currentDate.getHours().toString().padStart(2, '0');
            const minutes = currentDate.getMinutes().toString().padStart(2, '0');
            const seconds = currentDate.getSeconds().toString().padStart(2, '0');

            // Create formatted date and time strings
            const formattedDate = `${day} ${month} ${year}`;
            const formattedTime = `${hours}:${minutes}:${seconds}`;

            // Set the content of the dateTime paragraph
            dateTimeElement.innerHTML = `<span>${formattedDate}</span> <span>${formattedTime}</span>`;
        }

        // Call the function to update the date and time immediately
        updateDateTime();

        // Update the time every second (1000 milliseconds) to keep seconds counting
        setInterval(updateDateTime, 1000); // Update every 1 second
    



// Select the social container and button
const socialContainer = document.querySelector('.social-container');
const socialBtn = document.getElementById('socialBtn');

// Toggle the 'active' class when the button is clicked
socialBtn.addEventListener('click', () => {
    socialContainer.classList.toggle('active'); // Toggle active class to trigger CSS transitions
});
