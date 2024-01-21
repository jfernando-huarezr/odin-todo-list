import Project from "./project";
import Task from "./task";

export function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

export function loadFromLocalStorage(key) {
    let data =  JSON.parse(localStorage.getItem(key));

    if (!data) return null


    // Revive the projects and tasks here
    data = data.map(projectData => {
      let project = new Project(projectData.name);
      projectData.taskList = projectData.taskList.map(taskData => {
        let task = new Task(taskData.name, taskData.description, taskData.date, taskData.importance);
        task.status = taskData.status;
        return task;
      });
      project.taskList = projectData.taskList;
      return project;
    });

    console.log(data)
    return data;
}

export function deleteFromLocalStorage(key) {
    localStorage.removeItem(key);
  }
