interface IESigValidationResult {
  isValid: boolean;
  validationException?: any;
}

const IESigValidationResultName = "ESigValidationResult";

export {
  IESigValidationResult as default,
  IESigValidationResult,
  IESigValidationResultName
};
