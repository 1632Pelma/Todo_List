class KanbanBoard {
    constructor() {
        this.todoList = document.getElementById('todoList');
        this.inProgressList = document.getElementById('inProgressList');
        this.completedList = document.getElementById('completedList');
        this.taskInput = document.getElementById('taskInput');
        this.prioritySelect = document.getElementById('prioritySelect');
        this.addTaskBtn = document.getElementById('addTaskBtn');

        this.initEventListeners();
        this.loadTasks();
    }

    initEventListeners() {
        this.addTaskBtn.addEventListener('click', () => this.addTask());
        
       
        this.setupDragEvents(this.todoList);
        this.setupDragEvents(this.inProgressList);
        this.setupDragEvents(this.completedList);
    }

    setupDragEvents(list) {
        list.addEventListener('dragover', this.handleDragOver);
        list.addEventListener('drop', this.handleDrop.bind(this));
    }

    handleDragOver(e) {
        e.preventDefault(); 
        e.dataTransfer.dropEffect = 'move';
    }

    handleDrop(e) {
        e.preventDefault();
        const taskId = e.dataTransfer.getData('text/plain');
        const taskItem = document.getElementById(taskId);
        
       
        if (taskItem.closest('.task-list').id === 'completedList') return;
        
       
        const targetList = e.currentTarget;
        
     
        targetList.appendChild(taskItem);
        
        this.saveTasks();
    }

    addTask() {
        const taskText = this.taskInput.value.trim();
        const priority = this.prioritySelect.value;

        if (!taskText) return;

        const taskItem = this.createTaskElement(taskText, priority);
        this.todoList.appendChild(taskItem);
        this.taskInput.value = '';
        this.saveTasks();
    }

    createTaskElement(text, priority) {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item', `${priority}-priority`, 'task-draggable');
        
        
        const taskId = `task-${Date.now()}`;
        taskItem.id = taskId;

       
        taskItem.setAttribute('draggable', 'true');
        taskItem.addEventListener('dragstart', this.handleDragStart);

        taskItem.innerHTML = `
            <span>${text}</span>
            <div class="task-actions">
                <button class="complete-btn">Complete</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        
        const completeBtn = taskItem.querySelector('.complete-btn');
        completeBtn.addEventListener('click', () => this.completeTask(taskItem));

    
        const deleteBtn = taskItem.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => this.deleteTask(taskItem));

        return taskItem;
    }

    handleDragStart(e) {
      
        if (e.target.closest('.task-list').id === 'completedList') {
            e.preventDefault();
            return;
        }
        
        
        e.dataTransfer.setData('text/plain', e.target.id);
        e.dataTransfer.dropEffect = 'move';
    }

    completeTask(taskItem) {
       
        this.completedList.appendChild(taskItem);
        
        
        taskItem.setAttribute('draggable', 'false');
        taskItem.classList.remove('task-draggable');

        const completeBtn = taskItem.querySelector('.complete-btn');
        completeBtn.disabled = true;

        this.saveTasks();
    }

    deleteTask(taskItem) {
        taskItem.remove();
        this.saveTasks();
    }

    saveTasks() {
        const tasks = {
            todo: this.getTasksFromList(this.todoList),
            inProgress: this.getTasksFromList(this.inProgressList),
            completed: this.getTasksFromList(this.completedList)
        };
        localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
    }

    getTasksFromList(list) {
        return Array.from(list.children).map(taskItem => ({
            text: taskItem.querySelector('span').textContent,
            priority: Array.from(taskItem.classList)
                .find(cls => cls.includes('priority'))
                .replace('-priority', '')
        }));
    }

    loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('kanbanTasks') || '{}');

        Object.keys(savedTasks).forEach(listKey => {
            const list = this[`${listKey}List`];
            savedTasks[listKey].forEach(task => {
                const taskItem = this.createTaskElement(task.text, task.priority);
                
                
                if (listKey === 'completed') {
                    const completeBtn = taskItem.querySelector('.complete-btn');
                    taskItem.setAttribute('draggable', 'false');
                    taskItem.classList.remove('task-draggable');
                    completeBtn.disabled = true;
                }
                
                list.appendChild(taskItem);
            });
        });
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new KanbanBoard();
});