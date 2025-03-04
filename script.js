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

// Dark mode elements
const toggleDarkModeButton = document.getElementById('toggleDarkMode');
const body = document.body;
const modeIcon = document.getElementById('modeIcon');

// Social links elements
const socialToggleButton = document.getElementById('socialBtn');
const socialLinks = document.querySelector('.social-links');

// Cancel edit
cancelEditButton.addEventListener('click', () => {
    editPopup.style.display = 'none';  // Hide the modal when cancel is clicked
});

// Fetch tasks from the server (API)
async function fetchTasks() {
    const response = await fetch('http://localhost:5502/tasks');
    const data = await response.json();
    renderTasks(data);
}

// Render tasks
function renderTasks(tasks) {
    taskList.innerHTML = '';
    tasks.forEach((task) => {
        const taskItem = document.createElement('li');
        const dueDateText = task.dueDate ? `  ${task.dueDate}` : '';

        taskItem.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">
                ${task.description} 
                <span class="priority-circle ${getPriorityClass(task.priority)}"></span>
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
    if (priority === 'low') {
        return 'priority-low'; 
    } else if (priority === 'medium') {
        return 'priority-medium'; 
    } else if (priority === 'high') {
        return 'priority-high'; 
    }
    return ''; 
}

// Add new task
addTaskButton.addEventListener('click', async () => {
    if (taskInput.value) {
        const newTask = {
            description: taskInput.value,
            priority: 'low',
            dueDate: '',
            completed: false
        };

        const response = await fetch('http://localhost:5502/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        });
        
        const data = await response.json();
        renderTasks(data);
        taskInput.value = ''; 
    }
});

// Mark task as completed
async function markCompleted(id) {
    const response = await fetch(`http://localhost:5502/tasks/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed: true })
    });

    const data = await response.json();
    renderTasks(data);
}

// Edit task
function editTask(id) {
    fetch(`http://localhost:5502/tasks/${id}`)
        .then(response => response.json())
        .then(task => {
            editDescriptionInput.value = task.description;
            editPrioritySelect.value = task.priority;
            editDueDateInput.value = task.dueDate || '';  

            editPopup.style.display = 'block';

            saveChangesButton.onclick = () => {
                const updatedTask = {
                    description: editDescriptionInput.value,
                    priority: editPrioritySelect.value,
                    dueDate: editDueDateInput.value
                };

                fetch(`http://localhost:5502/tasks/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedTask)
                })
                    .then(response => response.json())
                    .then(data => {
                        renderTasks(data);
                        editPopup.style.display = 'none';
                    });
            };
        });
}

// Delete task
async function deleteTask(id) {
    const response = await fetch(`http://localhost:5502/tasks/${id}`, {
        method: 'DELETE'
    });
    const data = await response.json();
    renderTasks(data);
}

// Clear all tasks
clearAllButton.addEventListener('click', async () => {
    await fetch('http://localhost:5502/tasks', { method: 'DELETE' });
    renderTasks([]);
});

// Initialize tasks on page load
window.onload = fetchTasks;

// Dark Mode Functionality
function updateDarkModeIcon() {
    if (body.classList.contains('dark-mode')) {
        modeIcon.classList.remove('fa-moon');  
        modeIcon.classList.add('fa-sun');      
    } else {
        modeIcon.classList.remove('fa-sun');   
        modeIcon.classList.add('fa-moon');     
    }
}

// Add event listener to the toggle button for dark mode
toggleDarkModeButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    updateDarkModeIcon();
});

// Initialize the icon based on the current mode
updateDarkModeIcon();

// Social Links Functionality
socialToggleButton.addEventListener('click', () => {
    socialLinks.classList.toggle('show-links');
});

// Function to update the date and time
function updateDateTime() {
    const dateTimeElement = document.getElementById('dateTime');
    const currentDate = new Date();

    const day = currentDate.getDate();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');

    const formattedDate = `${day} ${month} ${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    dateTimeElement.innerHTML = `<span>${formattedDate}</span> <span>${formattedTime}</span>`;
}

// Call the function to update the date and time immediately
updateDateTime();

// Update the time every second (1000 milliseconds) to keep seconds counting
setInterval(updateDateTime, 1000); 
