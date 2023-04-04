import { LogicStringParser } from "./logicStringParser";
import { WhereClause } from "./whereClause";

const A = WhereClause.eq("a", 1);
const B = WhereClause.eq("b", 2);
const C = WhereClause.eq("c", 3);

it("parses a simple OR string", () => {
  expect(LogicStringParser.parse("1 OR 3")([A, B, C])).toEqual(
    WhereClause.or(A, C)
  );
});

it("parses a OR string with more than 2 arguments", () => {
  expect(LogicStringParser.parse("1 OR 3 OR 2")([A, B, C])).toEqual(
    WhereClause.or(A, C, B)
  );
});

it("removes extra spaces", () => {
  expect(
    LogicStringParser.parse("     3     OR    2  OR   1   ")([A, B, C])
  ).toEqual(WhereClause.or(C, B, A));
});

it("parses a simple AND string", () => {
  expect(LogicStringParser.parse("1 AND 3")([A, B, C])).toEqual(
    WhereClause.and(A, C)
  );
});
