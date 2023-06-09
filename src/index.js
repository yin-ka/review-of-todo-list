import './style.css';

import Operations from './modules/operations.js';

const taskContainer = document.getElementById('task_container');
const submitButton = document.getElementById('addButton');
const clearAllDone = document.getElementById('clear_complete');
let editButtonStats = false;
window.onload = function windowReady() {
  Operations.showTask();
  submitButton.onclick = () => {
    Operations.createTask();
  };

  taskContainer.addEventListener('click', (e) => {
    if (e.target !== null && e.target !== 'NaN' && e.target !== '') {
      if (e.target.className === 'checkbox-class') {
        const ids = e.target.id.replace('checkbox-', '');
        const description = document.getElementById(`d${ids}`);
        const data = Operations.getAllTasks();
        const index = parseInt(ids - 1, 10);
        if (data !== []) {
          if (data[index].completed) {
            data[index].completed = false;
            description.style.textDecoration = 'none';
          } else {
            data[index].completed = true;
            description.style.textDecoration = 'line-through';
          }
          Operations.updateTask(data);
        }
      }
    }
  });

  // ! EDTING
  taskContainer.addEventListener('click', (e) => {
    if (e.target !== null && e.target !== 'NaN' && e.target !== '') {
      if (e.target.className === 'editButton') {
        const ids = e.target.id.replace('editBttn-', '');
        const description = document.getElementById(`d${ids}`);
        const data = Operations.getAllTasks();
        const index = parseInt(ids, 10);
        const editInput = document.getElementById(`edit-${ids}`);
        description.style.display = 'none';
        editInput.style.display = 'block';
        if (editButtonStats !== false) {
          data[index - 1].description = editInput.value;
          description.style.display = 'block';
          editInput.style.display = 'none';
          Operations.updateTask(data);
          Operations.showTask();
          editButtonStats = false;
        } else {
          editButtonStats = true;
        }
      }
    }
  });

  //! REMOVING
  Operations.showTask();
  taskContainer.addEventListener('click', (e) => {
    if (e.target !== null && e.target !== 'NaN' && e.target !== '') {
      if (e.target.className === 'deleteButton') {
        const ids = e.target.id.replace('delete-', '');
        const data = Operations.getAllTasks();
        const index = parseInt(ids, 10);
        if (data !== []) {
          Operations.removeTask(index - 1);
        }
      }
    }
  });

  clearAllDone.addEventListener('click', () => {
    const data = Operations.getAllTasks();
    const storage = data.filter((todo) => todo.completed === false);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < storage.length; i++) {
      storage[i].index = i + 1;
    }
    Operations.updateTask(storage);
    Operations.showTask();
  });
};