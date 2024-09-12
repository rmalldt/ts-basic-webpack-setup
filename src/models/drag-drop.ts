/**************************************
 * Draggable interface
 */
export interface Draggable {
  /**
   * Listens to 'dragstart' DragEvent.
   * @param event the DragEvent
   */
  dragStartHandler(event: DragEvent): void;

  /**
   * Listens to 'dragend' DragEvent.
   * @param event the DragEvent
   */
  dragEndHandler(event: DragEvent): void;
}

/**************************************
 * DragTaget interface
 */
export interface DragTarget {
  /**
   * Listens to 'dragover' DragEvent.
   *  - Fires when we enter a draggable area.
   *  - Singals that an element is a valid draggable object/area.
   * @param event the DragEvent
   */
  dragOverHandler(event: DragEvent): void;

  /**
   * Listens to 'drop' DragEvent.
   *  - Reacts to the actual drop event that happens and updates the data and UI.
   * @param event the DragEvent
   */
  dropHandler(event: DragEvent): void;

  /**
   * Listens to 'dragleave' DragEvent.
   *  - Fires when we leave dragable area.
   *  - Handles if drop event is cancelled and reverts the UI update.
   * @param event the DragEvent
   */
  dragLeaveHandler(event: DragEvent): void;
}
