export default class ProjectList {
  constructor() {
    this.projectList = []
  }

  addProject(project) {
    this.projectList.push(project)
  }

  deleteProject(project) {
    
  }

  searchProject(project) {
    return this.projectList.find(element => element.name === project);
  }

  getList() {
    return this.projectList
  }

}