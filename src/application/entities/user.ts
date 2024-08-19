import { randomUUID } from 'crypto';
import { Replace } from '../../helpers/Replace'
import bcrypt from 'bcrypt'
import { Post } from './post';

interface UserProps {
  id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  profilePic?: string;
  location: "BR";

  createdAt: Date;
  updatedAt: Date;
}

type EntryUserProps = Replace<UserProps, {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}>;

export class User {
  private props: UserProps

  constructor(props: EntryUserProps) {
    const now = new Date()
    this.props = {
      id: props.id ?? randomUUID(),
      ...props,
      createdAt: props.createdAt ?? now,
      updatedAt: props.updatedAt ?? now,
    }
  }

  get id(): string {
    return this.props.id
  }

  get name(): string {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get lastname(): string {
    return this.props.lastname
  }

  set lastname(lastname: string) {
    this.props.lastname = lastname
  }

  get email(): string {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
  }

  get password(): string {
    return this.props.password
  }

  async hashPassword() {
    const hash = await bcrypt.hash(this.props.password, 10)
    this.props.password = hash
  }

  get profilePic(): string | undefined {
    return this.props.profilePic
  }

  set profilePic(profilePic: string) {
    this.props.profilePic = profilePic
  }

  get location(): "BR" {
    return this.props.location
  }

  set location(location: "BR") {
    this.props.location = location
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date {
    return this.props.updatedAt
  }
}