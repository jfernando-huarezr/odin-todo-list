export default class Task {
  constructor(name, description, date, importance) {
    this.name = name,
    this.description = description,
    this.date = date,
    this.importance = importance,
    this.status = false
  }

  changeName(name) {
    this.name = name
  }

  changeDescription(description) {
    this.description = description
  }

  changeDate(date) {
    this.date = date
  }

  changeImportance(importance) {
    this.importance = importance
  }

  changeStatus() {
    this.status = !this.status
  }

}