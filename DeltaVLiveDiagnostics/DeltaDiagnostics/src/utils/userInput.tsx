const whiteSpace: RegExp = /\s+/g;
const repeatedVarSeparator: RegExp = /,,+/g;
const nothing: string = "";
const varSeparator: string = ",";

export function getSanitizedParams(input: string): string[] {
  let cleanInput: string = input.replace(whiteSpace, nothing);
  cleanInput = cleanInput.replace(repeatedVarSeparator, varSeparator);
  cleanInput = cleanInput.endsWith(varSeparator)
    ? cleanInput.slice(0, -1)
    : cleanInput;

  if (cleanInput.length === 0) {
    return [];
  }

  return cleanInput.split(varSeparator);
}
