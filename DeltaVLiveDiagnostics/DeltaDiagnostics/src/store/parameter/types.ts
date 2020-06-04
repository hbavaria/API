import IESigData from "../../utils/web-sockets/interfaces/iEsigData";

export interface IParameter {
  path: string;
  selected: boolean;
  value?: any;
  eSigRequirement?: number;
  eSigData?: IESigData;
}
