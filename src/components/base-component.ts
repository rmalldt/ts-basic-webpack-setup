/*****************************************************************
 * Component Base Class
 */
export default abstract class Component<
  T extends HTMLElement,
  U extends HTMLElement
> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtBeginning: boolean,
    newElementId?: string
  ) {
    //// General rendering
    // Template element to render
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;

    // Container element inside which template element will be rendered
    this.hostElement = document.getElementById(hostElementId)! as T;

    // Contents of template element (deep copy)
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    // Element inside template element
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }

    this.attach(insertAtBeginning);
  }

  private attach(insertAtBeginning: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtBeginning ? 'afterbegin' : 'beforeend',
      this.element
    );
  }

  //// Concrete rendering implementations
  abstract configure(): void;
  abstract renderContent(): void;
}
