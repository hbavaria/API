import { IRequestCompleteDto } from "./iRequestCompleteDto";
import { ESigType } from "../webSocketProcess";

interface IParameterCheckResponseDto extends IRequestCompleteDto {
  secureWriteRequired?: boolean;
  eSigRequirement?: ESigType;
}

export { IParameterCheckResponseDto as default, IParameterCheckResponseDto };
