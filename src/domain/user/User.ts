export type IUserProps = {
  id?: string;
  email: string;
  createdAt?: Date;
};

export class User {
  public readonly id: string | undefined;
  public readonly email: string;
  public readonly createdAt: Date;

  constructor(props: IUserProps) {
    this.id = props.id;
    this.email = props.email;
    this.createdAt = props.createdAt ?? new Date();
  }
}
