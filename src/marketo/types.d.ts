export interface MarketoFormObject {
  getId(): number;
  getFormElem(): HTMLFormElement[];
  validate(): boolean;
  submit(): MarketoFormObject;
  reset(): MarketoFormObject;
  onSubmit(callback: (marketoFormObject: MarketoFormObject) => void): MarketoFormObject;
}
