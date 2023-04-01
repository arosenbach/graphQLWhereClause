import { WhereClause } from "./index";

describe.each([
  [null, `null`],
  ["", `""`],
  ["Acme", `"Acme"`],
  ["%cme", `"%cme"`],
  ["Acm%", `"Acm%"`],
  ["%cm%", `"%cm%"`],
  [["a", "b", "c"], `["a","b","c"]`],
])("String values: %s", (value, expectedValue) => {
  test("eq", () => {
    const whereClause = WhereClause.eq("Name", value);
    expect(whereClause.toString()).toEqual(
      `where: { Name: { eq: ${expectedValue} } }`
    );
  });

  test("ne", () => {
    const whereClause = WhereClause.ne("Name", value);
    expect(whereClause.toString()).toEqual(
      `where: { Name: { ne: ${expectedValue} } }`
    );
  });

  test("like", () => {
    const whereClause = WhereClause.like("Name", value);
    expect(whereClause.toString()).toEqual(
      `where: { Name: { like: ${expectedValue} } }`
    );
  });

  test("in", () => {
    const whereClause = WhereClause.in("Name", value);
    expect(whereClause.toString()).toEqual(
      `where: { Name: { in: ${expectedValue} } }`
    );
  });
});

describe("and", () => {
  test("and() with one argument is ignored", () => {
    const whereClause = WhereClause.and(WhereClause.like("Location", "%San%"));
    expect(whereClause.toString()).toEqual(
      `where: { Location: { like: "%San%" } }`
    );
  });

  test("two simple arguments", () => {
    const whereClause = WhereClause.and(
      WhereClause.like("Location", "%San%"),
      WhereClause.eq("Name", "Acme")
    );
    expect(`${whereClause.toString()}`).toEqual(
      `where: { and: [{ Location: { like: "%San%" } }, { Name: { eq: "Acme" } }] }`
    );
  });
});

describe("or", () => {
  test("or() with one argument is ignored", () => {
    const whereClause = WhereClause.or(WhereClause.like("Location", "%San%"));
    expect(whereClause.toString()).toEqual(
      `where: { Location: { like: "%San%" } }`
    );
  });

  test("two simple arguments", () => {
    const whereClause = WhereClause.or(
      WhereClause.like("Location", "%San%"),
      WhereClause.eq("Name", "Acme")
    );
    expect(`${whereClause.toString()}`).toEqual(
      `where: { or: [{ Location: { like: "%San%" } }, { Name: { eq: "Acme" } }] }`
    );
  });
});

test("mixing and() and or()", () => {
  const whereClause = WhereClause.and(
    WhereClause.eq("name", "John").eq("xxx", 42),
    WhereClause.or(
      WhereClause.lt("age", 30),
      WhereClause.eq("city", "New York").like("country", "%States%")
    )
  );
  expect(whereClause.toString()).toEqual(
    'where: { and: [{ name: { eq: "John" }, xxx: { eq: 42 } }, { or: [{ age: { lt: 30 } }, { city: { eq: "New York" }, country: { like: "%States%" } }] }] }'
  );
});
