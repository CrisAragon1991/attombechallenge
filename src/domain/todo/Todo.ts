export type TodoProps = {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  stateId: string;
};

export type CreateTodoInput = {
  name: string;
  description?: string;
  stateId: string;
};

export type UpdateTodoInput = {
  id: string;
  name?: string;
  description?: string;
  stateId?: string;
};

export class Todo {
  private props: TodoProps;

  constructor(props: TodoProps) {
    this.props = { ...props };
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get stateId(): string {
    return this.props.stateId;
  }

  update(fields: Partial<Omit<TodoProps, 'id' | 'createdAt'>>): void {
    if (fields.name !== undefined) this.props.name = fields.name;
    if (fields.description !== undefined) this.props.description = fields.description;
    if (fields.stateId !== undefined) this.props.stateId = fields.stateId;
    this.props.updatedAt = new Date();
  }

  toJSON() {
    return { ...this.props };
  }
}
