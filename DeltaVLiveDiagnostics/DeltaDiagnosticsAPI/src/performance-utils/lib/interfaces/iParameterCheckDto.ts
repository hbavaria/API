import IRequestDto from "./iRequestDto";

interface IParameterCheckRequestDto extends IRequestDto {
  parameterPath: string;
}

export { IParameterCheckRequestDto as default, IParameterCheckRequestDto };
