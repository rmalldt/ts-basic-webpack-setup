import Component from './base-component';
import { DragTarget } from '../models/drag-drop';
import { Project, ProjectStatus } from '../models/project';
import { projectState } from '../state/project-state';
import { ProjectItem } from './project-item';
import { autobind } from '../decorators/autobind';

/*************************************
 * ProjectList Class
 */
export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProjects: Project[] = [];

  constructor(private projectType: 'active' | 'finished') {
    super('template-project-list', 'app', false, `${projectType}-projects`);

    this.configure();
    this.renderContent();
  }

  @autobind
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      // Drag and drop is not allowed by default in JS.
      // The 'drop' event is only triggered on an element if in
      // 'dragover' event in the same element preventDefault() is called.
      event.preventDefault();
      console.log(this.projectType);
      const listElement = this.element.querySelector('ul')!;
      listElement.classList.add('droppable');
    }
  }

  @autobind
  dropHandler(event: DragEvent): void {
    projectState.moveProject(
      event.dataTransfer!.getData('text/plain'),

      // projectType is the list over which the cursor is currently pointing
      this.projectType === 'active'
        ? ProjectStatus.Active
        : ProjectStatus.Finished
    );
  }

  @autobind
  dragLeaveHandler(_event: DragEvent): void {
    const listElement = this.element.querySelector('ul')!;
    listElement.classList.remove('droppable');
  }

  configure(): void {
    // Register DragTarget listeners
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('drop', this.dropHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);

    // Register ProjectState listeners (callback implementation)
    projectState.addListener((projects: Project[]) => {
      // Filter and render projects in their respective list section type
      const filteredProjects = projects.filter((proj) => {
        if (this.projectType === 'active') {
          return proj.status === ProjectStatus.Active;
        }
        return proj.status === ProjectStatus.Finished;
      });

      this.assignedProjects = filteredProjects;
      this.renderProjects();
    });
  }

  renderContent() {
    const listId = `${this.projectType}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent =
      this.projectType.toUpperCase() + ' PROJECTS';
  }

  private renderProjects() {
    const listElement = document.getElementById(
      `${this.projectType}-projects-list`
    )! as HTMLUListElement;

    listElement.innerHTML = '';
    for (const projItem of this.assignedProjects) {
      new ProjectItem(listElement.id, projItem);
    }
  }
}
