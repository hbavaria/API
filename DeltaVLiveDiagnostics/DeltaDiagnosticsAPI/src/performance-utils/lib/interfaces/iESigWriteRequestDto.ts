import IRequestDto from "./iRequestDto";
import IESigData from "./iEsigData";

interface IESigWriteRequestDto extends IRequestDto {
  parameterPath: string;
  value: string;
  eSigData: IESigData;
}

export { IESigWriteRequestDto as default, IESigWriteRequestDto };
