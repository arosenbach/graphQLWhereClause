export class WhereClause {
  constructor(conditions = {}) {
    this.conditions = conditions;
  }

  eq(property, value) {
    return new WhereClause({
      ...this.conditions,
      [property]: { operator: "eq", value },
    });
  }

  ne(property, value) {
    return new WhereClause({
      ...this.conditions,
      [property]: { operator: "ne", value },
    });
  }

  like(property, value) {
    return new WhereClause({
      ...this.conditions,
      [property]: { operator: "like", value },
    });
  }

  and(...clauses) {
    if (clauses.length === 1) {
      Object.assign(this.conditions, clauses[0].conditions);
      return this;
    }

    let andConditions = [];
    clauses.forEach((clause) => {
      andConditions.push(clause.conditions);
    });

    return new WhereClause({
      ...this.conditions,
      and: andConditions,
    });
  }

  toString(intermediate = false) {
    const clauses = Object.entries(this.conditions).map(
      ([property, condition]) => {
        if (property === "and") {
          const andClauses = condition.map((clause) =>
            new WhereClause(clause).toString(true)
          );
          return `and: [${andClauses.join(", ")}]`;
        } else {
          return `${property}: { ${condition.operator}: ${JSON.stringify(
            condition.value
          )} }`;
        }
      }
    );
    if (intermediate) {
      return `{ ${clauses.join(", ")} }`;
    }
    return `where: { ${clauses.join(", ")} }`;
  }
}

class AndClause {
  constructor(...clauses) {
    this.conditions = { and: clauses.map((clause) => clause.conditions) };
  }

  and(...clauses) {
    let andClause = new AndClause(...this.conditions);
    clauses.forEach((clause) => {
      andClause = new AndClause(andClause, clause);
    });
    return andClause;
  }
}
