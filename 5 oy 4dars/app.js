
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


function addTask(taskText) {
    const task = {
        text: taskText,
        completed: false
    };
    tasks.push(task);
    updateTasks();
}


function updateTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks(tasks);
}


function renderTasks(filterTasks = tasks) {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = ''; 

    filterTasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'flex justify-between items-center bg-gray-200 px-4 py-2 rounded-lg';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'mr-3';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', function() {
            tasks[index].completed = !tasks[index].completed;
            updateTasks();
        });

        const span = document.createElement('span');
        span.textContent = task.text;
        span.className = 'flex-grow';
        if (task.completed) {
            listItem.classList.add('line-through', 'text-gray-500');
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'text-red-500 hover:underline ml-3';
        deleteBtn.addEventListener('click', function() {
            tasks.splice(index, 1);
            updateTasks();
        });

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'text-blue-500 hover:underline ml-3';
        editBtn.addEventListener('click', function() {
            const newTaskText = prompt('Edit task:', task.text);
            if (newTaskText !== null) {
                tasks[index].text = newTaskText;
                updateTasks();
            }
        });

        listItem.appendChild(checkbox);
        listItem.appendChild(span);
        listItem.appendChild(deleteBtn);
        listItem.appendChild(editBtn);
        todoList.appendChild(listItem);
    });
}


document.getElementById('filter-all').addEventListener('click', function() {
    renderTasks(tasks);
});

document.getElementById('filter-completed').addEventListener('click', function() {
    renderTasks(tasks.filter(task => task.completed));
});

document.getElementById('filter-uncompleted').addEventListener('click', function() {
    renderTasks(tasks.filter(task => !task.completed));
});


document.getElementById('add-btn').addEventListener('click', function() {
    const taskText = document.getElementById('new-task').value;
    if (taskText) {
        addTask(taskText);
        document.getElementById('new-task').value = ''; 
    }
});


document.addEventListener('DOMContentLoaded', function() {
    renderTasks();
});

