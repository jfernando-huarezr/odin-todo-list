export default class Task {
  constructor(name, description, date, importance) {
    this.name = name,
    this.description = description,
    this.date = date,
    this.importance = importance,
    this.status = false
  }

  setName(name) {
    this.name = name
  }

  setDescription(description) {
    this.description = description
  }

  setDate(date) {
    this.date = date
  }

  setImportance(importance) {
    this.importance = importance
  }

  setStatus() {
    this.status = !this.status
  }

  getName() {
    return this.name
  }

  getDescription() {
    return this.description
  }

  getDate() {
    return this.date
  }

  getImportance() {
    return this.importance
  }

  getStatus() {
    return this.status
  }

}