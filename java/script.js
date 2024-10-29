class TodoApp {
    constructor() {
        this.taskInput = document.querySelector('#taskInput');
        this.addTaskButton = document.querySelector('#addTaskButton');
        this.taskList = document.querySelector('#taskList');
        this.taskCountMessage = document.createElement('p');
        this.taskCountMessage.className = 'task-count';
        this.tasks = this.loadTasks();
        this.renderTasks();

        this.addTaskButton.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });
    }

    loadTasks() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    renderTasks() {
        this.taskList.innerHTML = '';
        this.taskCountMessage.textContent = `Total items: ${this.tasks.length}`;
        this.taskList.parentNode.insertBefore(this.taskCountMessage, this.taskList);

        if (this.tasks.length === 0) {
            this.displayNoTasksMessage();
        } else {
            this.displayTasks();
        }
    }

    displayNoTasksMessage() {
        const noTasksMessage = document.createElement('li');
        noTasksMessage.textContent = 'No tasks available.';
        noTasksMessage.style.textAlign = 'center';
        noTasksMessage.style.color = '#aaa';
        this.taskList.appendChild(noTasksMessage);
    }

    displayTasks() {
        this.tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = task;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => this.deleteTask(index));

            li.appendChild(deleteButton);
            this.taskList.appendChild(li);
        });
    }

    addTask() {
        const taskText = this.taskInput.value.trim();
        if (taskText) {
            this.tasks.push(taskText);
            this.taskInput.value = '';
            this.saveTasks();
            this.renderTasks();
        } else {
            alert('Please enter a task.');
        }
    }

    deleteTask(index) {
        this.tasks.splice(index, 1);
        this.saveTasks();
        this.renderTasks();
    }
}

document.addEventListener('DOMContentLoaded', () => new TodoApp());