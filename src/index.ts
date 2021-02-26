import marketo from './marketo/marketo';
import mailchimp from './mailchimp/mailchimp';

export const formMirroring = {
  marketo,
  mailchimp,
};

window.formMirroring = formMirroring;
