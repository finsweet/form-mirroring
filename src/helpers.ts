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
