import { handleMarketoForm } from './marketo/index';

declare global {
  interface Window {
    MktoForms2: any;
    handleMarketoForm: typeof handleMarketoForm;
  }
}

export type FormField = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
