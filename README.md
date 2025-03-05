# Todo List Project

## Overview

This Todo List project is a simple web application that allows users to create, update, delete, and mark tasks as complete. It uses a mock API powered by **JSON Server** to store tasks. The project features a dark mode toggle, a date/time display, and social media links for easy sharing.

## Features

- **Add Tasks**: Users can add tasks by entering a description and clicking the "Add" button.
- **Edit Tasks**: Users can edit task descriptions, priorities, and due dates via a popup modal.
- **Mark Tasks as Completed**: Users can mark tasks as completed, changing their appearance.
- **Delete Tasks**: Users can remove tasks from the list.
- **Clear All Tasks**: The option to clear all tasks from the list at once.
- **Dark Mode**: A dark mode toggle allows users to switch between light and dark modes.
- **Date and Time Display**: The current date and time are displayed and updated in real-time.
- **Social Links**: GitHub and LinkedIn links for easy social sharing.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: JSON Server 
- **Libraries**: FontAwesome (for icons)

## Installation

To get started with the Todo List project locally, follow these steps:

### Prerequisites

Make sure you have **Node.js** and **npm** installed on your system.

### Steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/1632Pelma/todo-list-project.git


   project-folder/
  ├── db.json            # Mock database file for tasks
  ├── index.html         # HTML structure for the Todo List app
  ├── script.js          # JavaScript logic for the app
  ├── style.css          # Styling for the Todo List app
  ├── server.js          # Backend logic for JSON server
  ├── package.json       # Project metadata and dependencies
  └── README.md          # This README file


### Usage
1. **Add a Task: Type a description in the input field and click "Add". The task will be saved and displayed on the list.
2.Edit a Task: Click the pencil icon next to a task to edit its description, priority, or due date.
3.Mark a Task as Completed: Click the checkmark icon next to a task to mark it as completed.
4.Delete a Task: Click the trashcan icon to remove a task.
5.Clear All Tasks: Click the "Clear All" button to remove all tasks from the list.
6.Toggle Dark Mode: Click the moon/sun icon to switch between light and dark modes.
7.View Current Date and Time: The current date and time are displayed at the top of the app and updated every second.
8.Social Links: Click the share button to access the GitHub and LinkedIn profiles.


### Backend (JSON Server)
This project uses JSON Server to simulate a backend API. The server reads from the db.json file to store and manage tasks.

Running the JSON Server
Start the server using:

bash
Copy
npm run server
This will start a local server at http://localhost:5000. It will handle requests for the task data, such as adding, editing, deleting, and marking tasks as completed.

db.json
The data for the tasks is stored in db.json in the following format:

json
Copy
{
  "tasks": [
    {
      "description": "Task 1",
      "priority": "medium",
      "dueDate": "2025-03-10",
      "completed": false,
      "id": 1
    },
    {
      "description": "Task 2",
      "priority": "high",
      "dueDate": "",
      "completed": false,
      "id": 2
    }
  ]
}
### Contributing
Contributions are welcome! If you'd like to contribute to this project, follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes and commit them (git commit -am 'Add new feature').
Push to the branch (git push origin feature-branch).
Open a pull request.
License
