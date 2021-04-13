import { MarketoFormObject } from './types';
import { clearInput, getFormFields, isFormField } from '../helpers';
import { FormField } from '../types';

type FieldsRelation = { webflowField: FormField; marketoField: FormField };

const handleMarketoForm = (marketoFormObject: MarketoFormObject): void => {
  // DOM Elements
  const marketoForm = marketoFormObject.getFormElem()[0];
  const webflowForm = document.querySelector<HTMLFormElement>(`[data-marketo-id="${marketoFormObject.getId()}"]`);
  if (!webflowForm) return;
  const webflowError = webflowForm.querySelector<HTMLDivElement>('.w-form-fail');

  // Variables
  const fieldsRelationStore: FieldsRelation[] = [];

  // Functions
  const handleFields = () => {
    const webflowFields = webflowForm.querySelectorAll<FormField>('[data-marketo-id]');

    for (const webflowField of webflowFields) {
      const marketoField = marketoForm.querySelector<FormField>(`#${webflowField.dataset.marketoId}`);
      if (!marketoField) continue;
      if (marketoField.type !== webflowField.type) webflowField.setAttribute('type', marketoField.type);
      fieldsRelationStore.push({ webflowField, marketoField });
    }
  };

  const getRelatedField = <T extends keyof FieldsRelation>(targetKey: T, originField: FormField) => {
    const originKey = targetKey === 'webflowField' ? 'marketoField' : 'webflowField';

    const fieldsRelation = fieldsRelationStore.find((fields) => fields[originKey] === originField);
    if (fieldsRelation) return fieldsRelation[targetKey];
  };

  /**
   * Check if any new FormField has been dynamically added to the step
   */
  const observeChildList = () => {
    // Create callback
    const callback: MutationCallback = (mutations) => {
      for (const mutation of mutations) {
        // If new form fields are added, store them
        for (const node of mutation.addedNodes) {
          if (!(node instanceof Element)) continue;

          const marketoFields = getFormFields(node);
          if (!marketoFields.length) continue;

          for (const marketoField of marketoFields) {
            const marketoId = marketoField.id;
            const webflowField = webflowForm.querySelector<FormField>(`[data-marketo-id="${marketoId}"]`);
            if (webflowField) fieldsRelationStore.push({ webflowField, marketoField });
          }
        }

        // If any form field is removed, remove it from the stored records
        for (const node of mutation.removedNodes) {
          if (!(node instanceof Element)) continue;

          const marketoFields = getFormFields(node);
          if (!marketoFields.length) continue;

          for (const marketoField of marketoFields) {
            const webflowField = getRelatedField('webflowField', marketoField);
            if (!webflowField) continue;

            clearInput(webflowField);
            fieldsRelationStore.filter((fieldsRelation) => fieldsRelation.webflowField !== webflowField);
          }
        }
      }
    };

    // Init observer
    const observer = new MutationObserver(callback);
    observer.observe(marketoForm, {
      subtree: true,
      childList: true,
    });
  };

  const handleInput = (e: Event) => {
    const webflowField = e.target;

    if (!isFormField(webflowField)) return;

    const marketoField = getRelatedField('marketoField', webflowField);
    if (!marketoField) return;

    switch (webflowField.type) {
      case 'checkbox':
      case 'radio':
        if (
          !(marketoField instanceof HTMLInputElement) ||
          (marketoField.type !== 'checkbox' && marketoField.type !== 'radio')
        )
          break;

        marketoField.checked = (<HTMLInputElement>webflowField).checked;
        break;

      default:
        marketoField.value = webflowField.value;
    }

    marketoField.dispatchEvent(new Event('input', { bubbles: true }));
    marketoField.dispatchEvent(new Event('change', { bubbles: true }));
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
  observeChildList();
  webflowForm.addEventListener('input', handleInput);
  webflowForm.addEventListener('submit', handleWebflowSubmit);
};

export default handleMarketoForm;
window.formMirroring = { marketo: handleMarketoForm };
