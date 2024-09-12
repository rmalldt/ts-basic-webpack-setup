import { Project, ProjectStatus } from '../models/project';
/**************************************
 * Generic Listener Type
 */
export type Listener<T> = (items: T[]) => void; // function

/**************************************
 * Generic State Class
 */
export class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFun: Listener<T>) {
    this.listeners.push(listenerFun);
  }
}

/**************************************
 * Singleton ProjectState Class:
 *  - Project state management
 */
export class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static INSTANCE: ProjectState;

  private constructor() {
    super();
  }

  static getInstance(): ProjectState {
    if (this.INSTANCE) {
      return this.INSTANCE;
    }
    this.INSTANCE = new ProjectState();
    return this.INSTANCE;
  }

  addProjects(title: string, description: string, numOfPeople: number) {
    // Create new project
    const newProject = new Project(
      Date.now().toString().slice(8),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    this.invokeListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((proj) => proj.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      console.log(project);
      this.invokeListeners();
    }
  }

  invokeListeners() {
    for (const listenerFun of this.listeners) {
      listenerFun(this.projects.slice()); // pass projects array copy
    }
  }
}

export const projectState = ProjectState.getInstance();
