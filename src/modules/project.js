export default class Project {
  constructor(name) {
    this.name = name,
    this.taskList = []
  }

  addTask(task) {
    this.taskList.push(task)
  }

  deleteTask(index) {
    this.taskList.splice(index, 1)
  }

  searchTask(index) {
    return this.taskList[index]
  }

  getTasks() {
    return this.taskList
  }

}