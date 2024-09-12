import Component from './base-component'; // default import
import * as Validation from '../util/validation'; // bundle imports
import { autobind as Autobind } from '../decorators/autobind'; // alias name
import { projectState } from '../state/project-state';

/*************************************
 * ProjectListInput class
 */
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super('template-project-input', 'app', true, 'form-user-input');

    // UserInput element title
    this.titleInputElement = this.element.querySelector(
      '#title'
    )! as HTMLInputElement;

    // UserInput element description
    this.descriptionInputElement = this.element.querySelector(
      '#description'
    )! as HTMLInputElement;

    // UserInput element people
    this.peopleInputElement = this.element.querySelector(
      '#people'
    )! as HTMLInputElement;

    this.configure();
    this.renderContent();
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidateable: Validation.Validateable = {
      value: enteredTitle,
      required: true,
    };

    const descriptionValidateable: Validation.Validateable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };

    const peopleValidateable: Validation.Validateable = {
      value: +enteredPeople, // convert to number
      required: true,
      min: 1,
      max: 5,
    };

    if (
      !Validation.validate(titleValidateable) ||
      !Validation.validate(descriptionValidateable) ||
      !Validation.validate(peopleValidateable)
    ) {
      alert('Invalid input, please try agian');
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  renderContent(): void {}

  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInputs = this.gatherUserInput();

    if (Array.isArray(userInputs)) {
      const [title, desc, people] = userInputs;
      projectState.addProjects(title, desc, people);
      this.clearInputs();
    }
  }
}
