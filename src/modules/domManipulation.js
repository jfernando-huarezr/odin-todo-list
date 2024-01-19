export default class domManipulation {  
  
  static drawProjects(list) {
    const domProjects = document.querySelector('.projects ul')

    const fragment = document.createDocumentFragment()

    const projectList = list.getList()

    projectList.forEach((element, index) => {
      const project = document.createElement('li')
      project.textContent = element.name
      project.dataset.position === index

      project.addEventListener('click', (e) => {
        e.preventDefault()

        this.drawTasks(projectList, index)

      })

      fragment.appendChild(project)
    })

    domProjects.innerHTML = ""
    domProjects.appendChild(fragment)
  }

  static drawProjectOptions(projectList) {
    const domProjectsOptions = document.querySelector('#task-form #projectSelect')

    const fragment = document.createDocumentFragment()
    const list = projectList.getList()

    list.forEach((element, index) => {
      const option = document.createElement('option')
      option.textContent = element.name
      option.value = index

      fragment.appendChild(option)
    })

    domProjectsOptions.innerHTML = ""
    domProjectsOptions.appendChild(fragment)
  
  }

  static drawTasks(projectList, projectIndex) {
    const domTasksList = document.querySelector('main .tasks table tbody')
    const fragment = document.createDocumentFragment()

    const taskList = projectList[projectIndex].taskList

    taskList.forEach((element, index) => {
      const row = document.createElement('tr')
      row.innerHTML = `
        <th scope="row">${index+1}</th>
        <td>${element.name}</td>
        <td>${element.date}</td>
        <td>${element.importance}</td>
        <td data-project="${projectIndex}" data-task="${index}">${element.status}</td>
        <td data-project="${projectIndex}" data-task="${index}">
          <button class="btn-icon task-details" data-project="${projectIndex}" data-task="${index}"><i class="fa-solid fa-magnifying-glass"></i></button>
          <button class="btn-icon task-update ps-2" data-bs-toggle="modal" data-bs-target="#addTaskModal" data-project="${projectIndex}" data-task="${index}"><i  class="fa-solid fa-pen-to-square"></i></button>
          <button class="btn-icon task-delete ps-2" data-project="${projectIndex}" data-task="${index}"><i class="fa-solid fa-trash"></i></button>
        </td>
      `

      fragment.appendChild(row)
    })

    domTasksList.innerHTML = ""
    domTasksList.appendChild(fragment)

    // Add event listener to the parent element
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
        const projectIndex = targetElement.getAttribute('data-project');
        const taskIndex = targetElement.getAttribute('data-task');

        if (targetElement.classList.contains('task-details')) {
          this.detailsTask(projectIndex, taskIndex);
        } else if (targetElement.classList.contains('task-update')) {
          this.updateTask(projectIndex, taskIndex);
        } else if (targetElement.classList.contains('task-delete')) {
          this.deleteTask(projectIndex, taskIndex);
        }
      }
    });

  }

  static detailsTask(projectIndex, taskIndex) {
    console.log(`detailsTask for project ${projectIndex} and task ${taskIndex}`)
  }
  
  static updateTask(projectIndex, taskIndex) {
    console.log(`updateTask for project ${projectIndex} and task ${taskIndex}`)
  }
  
  static deleteTask(projectIndex, taskIndex) {
    console.log(`deleteTask for project ${projectIndex} and task ${taskIndex}`)
  }

}