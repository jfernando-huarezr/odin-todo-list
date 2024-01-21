import * as bootstrap from 'bootstrap'
import Project from './project'
import Task from './task'
import domManipulation from './domManipulation'
import * as StorageManager from "./localStorageManager";

import { PROJECT_LIST } from './projectStorage'

domManipulation.drawProjects()
domManipulation.drawProjectOptions()
domManipulation.showAllTasks()

const headerHeight = document.querySelector('header').offsetHeight
const main = document.querySelector('main')
const mainRow = document.querySelector('main .container .row')

main.style.minHeight = `calc(100vh - ${headerHeight}px)`
mainRow.style.minHeight = `calc(100vh - ${headerHeight}px - 200px)`
main.classList.add('d-flex', 'align-items-center')

const taskForm = document.getElementById('task-form')
const projectForm = document.getElementById('project-form')
const showAllTasks = document.getElementById('showAllTasks')


const addTaskModal = document.getElementById('addTaskModal')
const addProjectModal = document.getElementById('addProjectModal')

//bootstrap modal so i can close them after hitting submit
const projectModal = new bootstrap.Modal(document.getElementById('addProjectModal'), {}); // creating modal object
const taskModal = new bootstrap.Modal(document.getElementById('addTaskModal'), {}); // creating modal object


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

  const domTasksList = document.querySelector('main .tasks table tbody')
  const currentShowing = domTasksList.getAttribute('data-project')
  console.log(currentShowing)

  let taskName = ""
  let taskDescription = ""
  let taskDate = ""
  const taskImportance = taskForm.querySelector("select#taskImportance option:checked").value
  const projectIndex = taskForm.querySelector("select#projectSelect option:checked" ).value

  inputs.forEach(element => {
    switch (element.id) {
      case "taskName": taskName = element.value; break;
      case 'taskDescription': taskDescription = element.value; break;
      case 'taskDate': taskDate = element.value; break;
    }
  })

  const project = PROJECT_LIST[projectIndex]

  if (submitButton.textContent === 'Add') {
    const task = new Task(taskName, taskDescription, taskDate, taskImportance)
    project.addTask(task)

    StorageManager.saveToLocalStorage('projectList', PROJECT_LIST);
  }

  else {
    const taskIndex = submitButton.getAttribute('data-task')
    const currentTask = project.getTasks()[taskIndex]

    currentTask.setName(taskName)
    currentTask.setDescription(taskDescription)
    currentTask.setDate(taskDate)
    currentTask.setImportance(taskImportance)

    StorageManager.saveToLocalStorage('projectList', PROJECT_LIST);
  }
  


  taskModal.hide(); // hide modal
  taskForm.reset();
  console.log('submited task')

  

  domManipulation.clearDomTasks()
  console.log(currentShowing)

  if (currentShowing == 'all') {

    domManipulation.showAllTasks()

  }  else {

    domManipulation.changeTasksTitle(projectIndex)
    domManipulation.drawTasks(projectIndex)
  } 

});

projectForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const input = projectForm.querySelector("input")
  const project = new Project(input.value)
  PROJECT_LIST.push(project)

  StorageManager.saveToLocalStorage('projectList', PROJECT_LIST);

  projectModal.hide(); // hide modal
  projectForm.reset();
  console.log('submited project')
  
  domManipulation.drawProjects()
  domManipulation.drawProjectOptions()

  domManipulation.changeTasksTitle(PROJECT_LIST.length-1)
  domManipulation.clearDomTasks()
  domManipulation.drawTasks(PROJECT_LIST.length-1)

  
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


showAllTasks.addEventListener('click', (e) => {

  e.preventDefault()

  domManipulation.clearDomTasks()
  domManipulation.showAllTasks()  
})

domManipulation.taskListEventListener()