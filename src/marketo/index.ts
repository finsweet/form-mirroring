import { isFormField } from '../helpers';
import { FormField } from '../types';

export const handleMarketoForm = (marketoFormObject: any) => {
  // DOM Elements
  const marketoForm = marketoFormObject.getFormElem()[0] as HTMLFormElement;
  const webflowForm = document.querySelector<HTMLFormElement>(`[data-marketo-id="${marketoFormObject.getId()}"]`);
  if (!webflowForm) return;

  // Functions
  const handleInput = (e: Event) => {
    const webflowTarget = e.target;

    if (!isFormField(webflowTarget)) return;
    const marketoTarget = marketoForm.querySelector<FormField>(`#${webflowTarget.dataset.marketoId || ''}`);
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
  };

  // Event listeners
  webflowForm.addEventListener('input', handleInput);
};

window.handleMarketoForm = handleMarketoForm;
