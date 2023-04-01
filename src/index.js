export class WhereClause {
  constructor(conditions = {}) {
    this.conditions = conditions;
  }

  eq(field, value) {
    return new WhereClause({
      ...this.conditions,
      [field]: new SimpleClause(field, "eq", value),
    });
  }

  ne(field, value) {
    return new WhereClause({
      ...this.conditions,
      [field]: new SimpleClause(field, "ne", value),
    });
  }

  in(field, value) {
    return new WhereClause({
      ...this.conditions,
      [field]: new SimpleClause(field, "in", value),
    });
  }

  like(field, value) {
    return new WhereClause({
      ...this.conditions,
      [field]: new SimpleClause(field, "like", value),
    });
  }

  and(...clauses) {
    if (clauses.length === 1) {
      return new WhereClause({ ...this.conditions, ...clauses[0].conditions });
    }

    return new WhereClause({
      ...this.conditions,
      and: new AndClause(...clauses),
    });
  }

  or(...clauses) {
    if (clauses.length === 1) {
      return new WhereClause({ ...this.conditions, ...clauses[0].conditions });
    }

    return new WhereClause({
      ...this.conditions,
      or: new OrClause(...clauses),
    });
  }

  _toString() {
    return `{ ${Object.values(this.conditions)
      .map((clause) => clause.toString())
      .join(", ")} }`;
  }

  toString() {
    return `where: ${this._toString()}`;
  }
}

class SimpleClause {
  constructor(field, operator, value) {
    this.field = field;
    this.operator = operator;
    this.value = value;
  }

  toString() {
    return `${this.field}: { ${this.operator}: ${JSON.stringify(this.value)} }`;
  }
}

class AndClause {
  constructor(...whereClauses) {
    this.whereClauses = whereClauses;
  }

  toString() {
    return `and: [${this.whereClauses
      .map((whereClause) => whereClause._toString())
      .join(", ")}]`;
  }
}

class OrClause {
  constructor(...whereClauses) {
    this.whereClauses = whereClauses;
  }

  toString() {
    return `or: [${this.whereClauses
      .map((whereClause) => whereClause._toString())
      .join(", ")}]`;
  }
}
