import * as StorageManager from './localStorageManager';
import Project from './project';

const PROJECT_LIST = (StorageManager.loadFromLocalStorage('projectList')) ? StorageManager.loadFromLocalStorage('projectList') : [new Project('Default')];

export default PROJECT_LIST;
