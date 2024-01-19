import { PROJECT_LIST } from './projectStorage'

export default class domManipulation {  
  
  static drawProjects() {
    const domProjects = document.querySelector('.projects ul')

    const fragment = document.createDocumentFragment()

    const projectList = PROJECT_LIST.getList()

    projectList.forEach((element, index) => {
      const project = document.createElement('li')
      project.textContent = element.name
      project.dataset.position === index

      project.addEventListener('click', (e) => {
        e.preventDefault()

        
        this.drawTasks(index)

      })

      fragment.appendChild(project)
    })

    domProjects.innerHTML = ""
    domProjects.appendChild(fragment)
  }

  static drawProjectOptions() {
    const domProjectsOptions = document.querySelector('#task-form #projectSelect')

    const fragment = document.createDocumentFragment()
    const list = PROJECT_LIST.getList()

    list.forEach((element, index) => {
      const option = document.createElement('option')
      option.textContent = element.name
      option.value = index

      fragment.appendChild(option)
    })

    domProjectsOptions.innerHTML = ""
    domProjectsOptions.appendChild(fragment)
  
  }

  static drawTasks(projectIndex) {
    const domTasksList = document.querySelector('main .tasks table tbody')
    const fragment = document.createDocumentFragment()

    const taskList = PROJECT_LIST.getList()[projectIndex].getTasks()

    taskList.forEach((element, index) => {
      const row = document.createElement('tr')
      row.innerHTML = `
        <th scope="row">${index+1}</th>
        <td>${element.name}</td>
        <td>${element.date}</td>
        <td>${element.importance}</td>
        <td data-task="${index}">${element.status}</td>
        <td data-task="${index}">
          <button class="btn-icon task-details" data-project="${projectIndex}" data-task="${index}"><i class="fa-solid fa-magnifying-glass"></i></button>
          <button class="btn-icon task-update ps-2" data-bs-toggle="modal" data-bs-target="#addTaskModal" data-project="${projectIndex}" data-task="${index}"><i  class="fa-solid fa-pen-to-square"></i></button>
          <button class="btn-icon task-delete ps-2" data-project="${projectIndex}" data-task="${index}"><i class="fa-solid fa-trash"></i></button>
        </td>
      `

      fragment.appendChild(row)
    })

    domTasksList.innerHTML = ""
    domTasksList.appendChild(fragment)
  }

  static taskListEventListener() {

    const domTasksList = document.querySelector('main .tasks table tbody')

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
        const projectIndex = targetElement.getAttribute('data-project')

        const currentProject = PROJECT_LIST.getList()[projectIndex]
        console.log(currentProject)

        if (targetElement.classList.contains('task-details')) {
          
        } else if (targetElement.classList.contains('task-update')) {
          
        } else if (targetElement.classList.contains('task-delete')) {
          currentProject.deleteTask(taskIndex)
          this.drawTasks(projectIndex);
        }
      }
    });
  }

}