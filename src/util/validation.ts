/**************************************
 * Validateable interfaces
 */
export interface Validateable {
  value: string | number;
  required?: boolean; // same as boolean | undefined
  minLength?: number; // same as number | undefined
  maxLength?: number;
  min?: number;
  max?: number;
}

export function validate(validateableInput: Validateable) {
  let isValid: boolean = true;

  if (validateableInput.required) {
    isValid = isValid && validateableInput.value.toString().trim().length !== 0;
  }

  if (
    validateableInput.minLength != null &&
    typeof validateableInput.value === 'string'
  ) {
    isValid =
      isValid && validateableInput.value.length >= validateableInput.minLength;
  }

  if (
    validateableInput.maxLength != null &&
    typeof validateableInput.value === 'string'
  ) {
    isValid =
      isValid && validateableInput.value.length <= validateableInput.maxLength;
  }

  if (
    validateableInput.min != null &&
    typeof validateableInput.value === 'number'
  ) {
    isValid = isValid && validateableInput.value >= validateableInput.min;
  }

  if (
    validateableInput.max != null &&
    typeof validateableInput.value === 'number'
  ) {
    isValid = isValid && validateableInput.value <= validateableInput.max;
  }

  return isValid;
}
