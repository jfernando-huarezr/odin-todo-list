import * as bootstrap from 'bootstrap'
import Project from './project'
import Task from './task'
import domManipulation from './domManipulation'

import { PROJECT_LIST } from './projectStorage'

const headerHeight = document.querySelector('header').offsetHeight
const main = document.querySelector('main')
const mainRow = document.querySelector('main .container .row')

main.style.minHeight = `calc(100vh - ${headerHeight}px)`
mainRow.style.minHeight = `calc(100vh - ${headerHeight}px - 200px)`
main.classList.add('d-flex', 'align-items-center')

const taskForm = document.getElementById('task-form')
const projectForm = document.getElementById('project-form')


const addTaskModal = document.getElementById('addTaskModal')
const addProjectModal = document.getElementById('addProjectModal')

//bootstrap modal so i can close them after hitting submit
const projectModal = new bootstrap.Modal(document.getElementById('addProjectModal'), {}); // creating modal object
const taskModal = new bootstrap.Modal(document.getElementById('addTaskModal'), {}); // creating modal object

//to store all the projects


addTaskModal.addEventListener('hidden.bs.modal', function () {
  taskForm.reset();
});

addProjectModal.addEventListener('hidden.bs.modal', function () {
  projectForm.reset();
});


taskForm.addEventListener('submit', function(event) {
  event.preventDefault();

  console.log(event.target)

  const inputs = taskForm.querySelectorAll("input")
  const submitButton = taskForm.querySelector('#send-task')
  console.log(submitButton.textContent)

  let taskName = ""
  let taskDescription = ""
  let taskDate = ""
  const taskImportance = taskForm.querySelector("select#taskImportance option:checked").value
  const taskProjectIndex = taskForm.querySelector("select#projectSelect option:checked" ).value

  inputs.forEach(element => {
    switch (element.id) {
      case "taskName": taskName = element.value; break;
      case 'taskDescription': taskDescription = element.value; break;
      case 'taskDate': taskDate = element.value; break;
    }
  })

  const project = PROJECT_LIST.searchProject(taskProjectIndex)

  if (submitButton.textContent === 'Add') {
    const task = new Task(taskName, taskDescription, taskDate, taskImportance)
    project.addTask(task)
  }

  else {
    const taskIndex = submitButton.getAttribute('data-task')
    const currentTask = project.getTasks()[taskIndex]

    currentTask.setName(taskName)
    currentTask.setDescription(taskDescription)
    currentTask.setDate(taskDate)
    currentTask.setImportance(taskImportance)
  }
  


  taskModal.hide(); // hide modal
  taskForm.reset();
  console.log('submited task')
  domManipulation.drawTasks(taskProjectIndex)

});

projectForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const input = projectForm.querySelector("input")
  const project = new Project(input.value)
  PROJECT_LIST.addProject(project)

  projectModal.hide(); // hide modal
  projectForm.reset();
  console.log('submited project')
  
  domManipulation.drawProjects()
  domManipulation.drawProjectOptions()

  
});

addTaskModal.addEventListener('show.bs.modal', (e) => {
  console.log('modal triggered!')

  const element = e.relatedTarget
  console.log(element)

  const modalTitle = addTaskModal.querySelector('#addTaskLabel')
  const modalSubmit = addTaskModal.querySelector('#send-task')
  const project = taskForm.querySelector("select#projectSelect").parentElement

  if (element.classList.contains('task-new')) {
    modalTitle.textContent = 'Add new Task'
    modalSubmit.textContent = 'Add'
    project.style.display = 'block'

  } else {

    const taskIndex = element.getAttribute('data-task');
    const projectIndex = element.getAttribute('data-project')

    modalTitle.textContent = 'Edit Task'
    modalSubmit.setAttribute('data-task', taskIndex)
    modalSubmit.setAttribute('data-project', projectIndex)
    modalSubmit.textContent = 'Edit'
    project.style.display = 'none'
  }

})

domManipulation.taskListEventListener()