import { MarketoFormObject } from './types';
import { isFormField } from '../helpers';
import { FormField } from '../types';

const handleMarketoForm = (marketoFormObject: MarketoFormObject): void => {
  // DOM Elements
  const marketoForm = marketoFormObject.getFormElem()[0];
  const webflowForm = document.querySelector<HTMLFormElement>(`[data-marketo-id="${marketoFormObject.getId()}"]`);
  if (!webflowForm) return;
  const webflowError = webflowForm.querySelector<HTMLDivElement>('.w-form-fail');

  // Variables
  const formFields: Map<FormField, FormField> = new Map();

  // Functions
  const handleFields = () => {
    const webflowFields = webflowForm.querySelectorAll<FormField>('[data-marketo-id]');

    for (const webflowField of webflowFields) {
      const marketoField = marketoForm.querySelector<FormField>(`#${webflowField.dataset.marketoId}`);
      if (!marketoField) continue;
      if (marketoField.type !== webflowField.type) webflowField.setAttribute('type', marketoField.type);
      formFields.set(webflowField, marketoField);
    }
  };

  const handleInput = (e: Event) => {
    const webflowTarget = e.target;

    if (!isFormField(webflowTarget)) return;
    const marketoTarget = formFields.get(webflowTarget);
    if (!marketoTarget) return;

    switch (webflowTarget.type) {
      case 'checkbox':
      case 'radio':
        if (
          !(marketoTarget instanceof HTMLInputElement) ||
          (marketoTarget.type !== 'checkbox' && marketoTarget.type !== 'radio')
        )
          break;

        marketoTarget.checked = (<HTMLInputElement>webflowTarget).checked;
        break;

      default:
        marketoTarget.value = webflowTarget.value;
    }

    marketoTarget.dispatchEvent(new Event('change', { bubbles: true }));
  };

  const displayWebflowError = () => {
    if (!webflowError) return;
    webflowError.style.display = 'block';
  };

  const handleWebflowSubmit = (e: Event) => {
    if (!marketoFormObject.validate()) {
      e.preventDefault();
      e.stopPropagation();
      displayWebflowError();
      return;
    }

    marketoFormObject.submit();
  };

  // Init
  handleFields();
  webflowForm.addEventListener('input', handleInput);
  webflowForm.addEventListener('submit', handleWebflowSubmit);
};

export default handleMarketoForm;
window.formMirroring = { marketo: handleMarketoForm };
