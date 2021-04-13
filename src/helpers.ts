import { FormField } from './types';

/**
 * Checks if an element is a form element
 * @param element
 */
export const isFormField = (element: Element | EventTarget | null): element is FormField => {
  return (
    element instanceof HTMLInputElement ||
    element instanceof HTMLSelectElement ||
    element instanceof HTMLTextAreaElement
  );
};

/**
 * @param element
 * @returns The form fields in the element
 */
export const getFormFields = (element: Element): FormField[] => {
  if (isFormField(element)) return [element];
  else return [...element.querySelectorAll<FormField>('input, select, textarea')];
};

/**
 * Sync the values of two form fields
 * @param origin
 * @param target
 */
export const syncFormFieldValues = (origin: FormField, target: FormField): void => {
  switch (origin.type) {
    case 'checkbox':
      target.value = `${(<HTMLInputElement>origin).checked}`;
      break;
    case 'radio': {
      const form = origin.closest('form');
      const checkedOption = form?.querySelector<HTMLInputElement>(`input[name="${origin.name}"]:checked`);
      if (checkedOption) target.value = checkedOption.value;
      break;
    }
    default:
      target.value = origin.value;
  }
};

/**
 * Clear the value of an input
 * @param target - Element that has to be cleared
 */
export const clearInput = (target: FormField): void => {
  if (target.type === 'checkbox' || target.type === 'radio') (<HTMLInputElement>target).checked = false;
  else target.value = '';
};
