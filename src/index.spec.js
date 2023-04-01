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
    const whereClause = new WhereClause().eq("Name", value);
    expect(whereClause.toString()).toEqual(
      `where: { Name: { eq: ${expectedValue} } }`
    );
  });

  test("ne", () => {
    const whereClause = new WhereClause().ne("Name", value);
    expect(whereClause.toString()).toEqual(
      `where: { Name: { ne: ${expectedValue} } }`
    );
  });

  test("like", () => {
    const whereClause = new WhereClause().like("Name", value);
    expect(whereClause.toString()).toEqual(
      `where: { Name: { like: ${expectedValue} } }`
    );
  });

  test("in", () => {
    const whereClause = new WhereClause().in("Name", value);
    expect(whereClause.toString()).toEqual(
      `where: { Name: { in: ${expectedValue} } }`
    );
  });
});

describe("and", () => {
  test("and() with one argument is ignored", () => {
    const whereClause = new WhereClause().and(
      new WhereClause().like("Location", "%San%")
    );
    expect(whereClause.toString()).toEqual(
      `where: { Location: { like: "%San%" } }`
    );
  });

  test("two simple arguments", () => {
    const whereClause = new WhereClause().and(
      new WhereClause().like("Location", "%San%"),
      new WhereClause().eq("Name", "Acme")
    );
    expect(`${whereClause.toString()}`).toEqual(
      `where: { and: [{ Location: { like: "%San%" } }, { Name: { eq: "Acme" } }] }`
    );
  });
});

//   it("", () => {
//     const whereBuilder = new WhereClause()
//       .eq("name", "John")
//       .and(
//         new WhereClause()
//           .lt("age", 30)
//           .or(
//             new WhereClause().eq("city", "New York").like("country", "%States%")
//           )
//       );

//     console.log(whereBuilder.toString()); //?
//     expect(whereBuilder).toEqual({
//       where: {
//         or: [
//           { age: { lt: 30 } },
//           { city: { eq: "New York" }, country: { like: "%States%" } },
//         ],
//         name: { eq: "John" },
//       },
//     });
//   });
// });
