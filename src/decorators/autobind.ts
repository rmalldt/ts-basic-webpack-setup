/**
 * autobind decorator
 * @param _target
 * @param _methodName
 * @param descriptor
 * @returns PropertyDescriptor
 */
export function autobind(
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor // method description
) {
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      // Bind 'this' which is the object that the decorated method is associated to
      const boundMethod = originalMethod.bind(this);
      return boundMethod;
    },
  };
  return adjustedDescriptor;
}
