export interface MarketoFormObject {
  getId(): number;
  getFormElem(): HTMLFormElement[];
  validate(): boolean;
  submit(): MarketoFormObject;
  onSubmit(callback: (marketoFormObject: MarketoFormObject) => void): MarketoFormObject;
}
