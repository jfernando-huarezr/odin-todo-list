export default class ProjectList {
  constructor() {
    this.projectList = []
  }

  addProject(project) {
    this.projectList.push(project)
  }

  deleteProject(index) {
    
  }

  searchProject(index) {
    return this.projectList[index];
  }

  getList() {
    return this.projectList
  }

}