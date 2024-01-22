import { PROJECT_LIST } from './projectStorage';
import * as StorageManager from './localStorageManager';

export default class domManipulation {
  static drawProjects() {
    const domProjects = document.querySelector('.projects ul');

    const fragment = document.createDocumentFragment();

    PROJECT_LIST.forEach((currentProject, index) => {
      const project = document.createElement('li');
      project.classList.add('d-flex', 'justify-content-between');
      const projectTitle = document.createElement('p');
      const projectDeleteButton = document.createElement('button');

      projectTitle.textContent = currentProject.name;
      projectTitle.dataset.position = index;

      projectDeleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
      projectDeleteButton.dataset.position = index;
      projectDeleteButton.classList.add('project-delete');

      projectTitle.addEventListener('click', (e) => {
        e.preventDefault();
        const domTasksListTitle = document.querySelector('main .tasks h3');

        const taskList = currentProject.getTasks();
        domTasksListTitle.textContent = `${currentProject.getName()} tasks (${taskList.length}): `;

        this.clearDomTasks();

        this.drawTasks(index);
      });

      project.appendChild(projectTitle);
      project.appendChild(projectDeleteButton);

      fragment.appendChild(project);
    });

    domProjects.innerHTML = '';
    domProjects.appendChild(fragment);
  }

  static drawProjectOptions() {
    const domProjectsOptions = document.querySelector('#task-form #projectSelect');

    const fragment = document.createDocumentFragment();

    PROJECT_LIST.forEach((element, index) => {
      const option = document.createElement('option');
      option.textContent = element.name;
      option.value = index;

      fragment.appendChild(option);
    });

    domProjectsOptions.innerHTML = '';
    domProjectsOptions.appendChild(fragment);
  }

  static drawTasks(projectIndex) {
    const domTasksList = document.querySelector('main .tasks table tbody');
    domTasksList.setAttribute('data-project', projectIndex);

    const fragment = document.createDocumentFragment();
    const currentProject = PROJECT_LIST[projectIndex];
    const taskList = currentProject.getTasks();

    taskList.forEach((element, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="taskName" style="text-decoration-line: ${element.status ? 'line-through' : 'none'}">${element.name}</td>
        <td class="taskDate">${element.date}</td>
        <td class="taskImportance">${element.importance}</td>
        <td class="taskStatus" data-project="${projectIndex}" data-task="${index}" style="color: ${element.status ? 'green' : 'red'}">${element.status ? 'Completed' : 'Pending'}</td>
        <td data-task="${index}">
          <button class="btn-icon task-details" data-project="${projectIndex}" data-task="${index}"><i class="fa-solid fa-magnifying-glass"></i></button>
          <button class="btn-icon task-update ps-2" data-bs-toggle="modal" data-bs-target="#addTaskModal" data-project="${projectIndex}" data-task="${index}"><i  class="fa-solid fa-pen-to-square"></i></button>
          <button class="btn-icon task-delete ps-2" data-project="${projectIndex}" data-task="${index}"><i class="fa-solid fa-trash"></i></button>
        </td>
      `;

      fragment.appendChild(row);
    });

    domTasksList.appendChild(fragment);
  }

  static projectListEventListener() {
    const domProjectList = document.querySelector('main .projects ul');

    domProjectList.addEventListener('click', (event) => {
      let targetElement = event.target;

      if (targetElement.tagName.toLowerCase() === 'path') {
        targetElement = targetElement.parentElement;
      }
      if (targetElement.tagName.toLowerCase() === 'svg' || targetElement.tagName.toLowerCase() === 'i') {
        targetElement = targetElement.parentElement;
      }

      // Check if the clicked element is a 'button' tag
      if (targetElement.tagName.toLowerCase() === 'button') {
        const projectIndex = targetElement.getAttribute('data-position');

        PROJECT_LIST.splice(projectIndex, 1);
        StorageManager.saveToLocalStorage('projectList', PROJECT_LIST);
        domProjectList.innerHTML = '';
        this.drawProjects();
        this.drawProjectOptions();
        this.showAllTasks();
      }
    });
  }

  static taskListEventListener() {
    const domTasksList = document.querySelector('main .tasks table tbody');

    domTasksList.addEventListener('click', (event) => {
      let targetElement = event.target;

      if (targetElement.tagName.toLowerCase() === 'path') {
        targetElement = targetElement.parentElement;
      }
      if (targetElement.tagName.toLowerCase() === 'svg' || targetElement.tagName.toLowerCase() === 'i') {
        targetElement = targetElement.parentElement;
      }

      // Check if the clicked element is a 'button' tag
      if (targetElement.tagName.toLowerCase() === 'button') {
        const taskIndex = targetElement.getAttribute('data-task');
        const projectIndex = targetElement.getAttribute('data-project');
        const currentProject = PROJECT_LIST[projectIndex];
        console.log(currentProject);

        if (targetElement.classList.contains('task-details')) {

        } else if (targetElement.classList.contains('task-update')) {
          const taskForm = document.getElementById('task-form');
          const task = currentProject.searchTask(taskIndex);

          const inputs = taskForm.querySelectorAll('input');

          taskForm.querySelector('select#taskImportance').value = task.getImportance();
          taskForm.querySelector('select#projectSelect').value = projectIndex;

          inputs.forEach((element) => {
            switch (element.id) {
              case 'taskName': element.value = task.getName(); break;
              case 'taskDescription': element.value = task.getDescription(); break;
              case 'taskDate': element.value = task.getDate(); break;
            }
          });
        } else if (targetElement.classList.contains('task-delete')) {
          currentProject.deleteTask(taskIndex);

          StorageManager.saveToLocalStorage('projectList', PROJECT_LIST);
          const currentShowing = domTasksList.getAttribute('data-project');

          this.clearDomTasks();
          (currentShowing == 'all') ? this.showAllTasks() : this.drawTasks(projectIndex);
        }

        return;
      }

      if (targetElement.tagName.toLowerCase() === 'td') {
        if (targetElement.classList.contains('taskStatus')) {
          const currentShowing = domTasksList.getAttribute('data-project');
          const taskIndex = targetElement.getAttribute('data-task');
          const projectIndex = targetElement.getAttribute('data-project');
          const currentProject = PROJECT_LIST[projectIndex];
          const task = currentProject.getTasks()[taskIndex];
          task.setStatus();

          StorageManager.saveToLocalStorage('projectList', PROJECT_LIST);

          this.clearDomTasks();
          (currentShowing == 'all') ? this.showAllTasks() : this.drawTasks(projectIndex);
        }
      }
    });
  }

  static showAllTasks() {
    PROJECT_LIST.forEach((element, index) => {
      this.drawTasks(index);
    });

    const domTasksListTitle = document.querySelector('main .tasks h3');
    const domTasksList = document.querySelector('main .tasks table tbody');
    domTasksListTitle.textContent = 'All Tasks';
    domTasksList.setAttribute('data-project', 'all');
  }

  static clearDomTasks() {
    const domTasksList = document.querySelector('main .tasks table tbody');
    domTasksList.innerHTML = '';
  }

  static changeTasksTitle(projectIndex) {
    const domTasksListTitle = document.querySelector('main .tasks h3');
    domTasksListTitle.textContent = `${PROJECT_LIST[projectIndex].getName()} tasks (${PROJECT_LIST[projectIndex].getTasks().length}): `;
    domTasksListTitle.setAttribute('data-project', projectIndex);
  }
}
