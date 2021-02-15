import { formMirroring } from '.';

declare global {
  interface Window {
    MktoForms2: any;
    formMirroring: typeof formMirroring;
  }
}

export type FormField = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
