import { WhereClause } from "./whereClause";

const OR_SEPARATOR = " OR ";
const AND_SEPARATOR = " AND ";

const split = (separator) => (inputString) => {
  const splitString = inputString.toUpperCase().split(OR_SEPARATOR);
  return splitString[0] === inputString
    ? []
    : inputString.toUpperCase().split(separator).map(toIndex);
};

const toIndex = (x) => Number.parseInt(x) - 1;

export class LogicStringParser {
  static parse(inputString) {
    const orIndice = split(OR_SEPARATOR)(inputString).map(toIndex);
    const andIndice = split(AND_SEPARATOR)(inputString).map(toIndex);
    return (whereClauses) =>
      WhereClause.and(
        ...andIndice.map((index) => whereClauses[index]),
        WhereClause.or(...orIndice.map((index) => whereClauses[index]))
      );
  }
}
