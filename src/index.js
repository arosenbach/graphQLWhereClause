export class WhereClause {
  constructor() {
    this.conditions = {};
  }

  eq(property, value) {
    this.conditions[property] = { operator: "eq", value };
    return this;
  }

  ne(property, value) {
    this.conditions[property] = { operator: "ne", value };
    return this;
  }

  like(property, value) {
    this.conditions[property] = { operator: "like", value };
    return this;
  }

  and(where) {
    Object.assign(this.conditions, where.conditions);
    return this;
  }

  toString() {
    const clauses = Object.entries(this.conditions).map(
      ([property, condition]) => {
        return `${property}: { ${condition.operator}: ${JSON.stringify(
          condition.value
        )} }`;
      }
    );
    return `where: { ${clauses.join(", ")} }`;
  }
}
