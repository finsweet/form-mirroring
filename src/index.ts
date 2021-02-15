import { handleMarketoForm } from './marketo/marketo';

export const formMirroring = {
  marketo: handleMarketoForm,
};

window.formMirroring = formMirroring;
