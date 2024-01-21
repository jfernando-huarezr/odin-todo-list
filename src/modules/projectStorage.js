import * as StorageManager from "./localStorageManager";
import Project from "./project";

export const PROJECT_LIST = (StorageManager.loadFromLocalStorage('projectList')) ? StorageManager.loadFromLocalStorage('projectList') : [new Project('Default')]