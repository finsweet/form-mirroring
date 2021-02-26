import { isFormField, syncFormFieldValues } from '../helpers';
import { FormField } from '../types';

const handleMailchimpForm = (webflowFormSelector: string): void => {
  const webflowForm = document.querySelector<HTMLFormElement>(webflowFormSelector);
  if (!webflowForm) return;

  const elements = webflowForm.querySelectorAll<FormField>('input[type="checkbox"], input[type="radio"], select');
  const hiddenFieldsStore: Map<FormField, HTMLInputElement> = new Map();

  for (const element of elements) {
    // Look if a hidden field for the form field grup already exists
    let hiddenField = [...hiddenFieldsStore].find((entry) => element.name === entry[1].name)?.[1];

    if (!hiddenField) {
      // Create a new hidden field
      hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.name = element.name;

      // Update the hidden field value
      syncFormFieldValues(element, hiddenField);

      // Append it to the form
      webflowForm.append(hiddenField);
    }

    // Update the original element's name
    element.name = `_${element.name}`;

    // Store the binding
    hiddenFieldsStore.set(element, hiddenField);
  }

  const handleInput = (e: Event) => {
    const target = e.target;
    if (!isFormField(target)) return;

    const hiddenField = hiddenFieldsStore.get(target);
    if (!hiddenField) return;

    // Update the hidden field value
    syncFormFieldValues(target, hiddenField);
  };

  webflowForm.addEventListener('input', handleInput);
};

export default handleMailchimpForm;
