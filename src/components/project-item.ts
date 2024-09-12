import Component from './base-component';
import { Draggable } from '../models/drag-drop';
import { Project } from '../models/project';
import { autobind } from '../decorators/autobind';

/**************************************
 * ProjectItem Class
 */
export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;

  get members() {
    if (this.project.people === 1) {
      return '1 member';
    }
    return `${this.project.people} members`;
  }

  constructor(hostId: string, project: Project) {
    super('template-single-project', hostId, false, project.id);
    this.project = project;
    this.configure();
    this.renderContent();
  }

  @autobind
  dragStartHandler(event: DragEvent): void {
    // Attach data to DragEvent
    event.dataTransfer!.setData('text/plain', this.project.id);

    // Move element from A to B i.e. upon drop remove data from original place and add to new place
    event.dataTransfer!.effectAllowed = 'move';
  }

  @autobind
  dragEndHandler(_event: DragEvent): void {
    console.log('DragEnd');
  }

  configure(): void {
    this.element.setAttribute('draggable', 'true');
    this.element.addEventListener('dragstart', this.dragStartHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);
  }

  renderContent(): void {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = this.members + ' assigned';
    this.element.querySelector('p')!.textContent = this.project.description;
  }
}
