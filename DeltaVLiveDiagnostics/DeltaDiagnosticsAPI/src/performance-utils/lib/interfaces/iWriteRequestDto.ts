import ParameterDefinitionDto from "./iParameterDefinitionDto";
import IRequestDto from "./iRequestDto";

interface IWriteRequestDto extends IRequestDto {
  value: any;
  parameter: ParameterDefinitionDto;
}

export { IWriteRequestDto as default, IWriteRequestDto };
