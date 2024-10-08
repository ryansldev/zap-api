import { randomUUID } from 'crypto';
import { Replace } from '@helpers/Replace'
import bcrypt from 'bcrypt'
import { Post } from './post';

interface UserProps {
  id: string;
  name: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  profilePic?: string;
  location: string;

  liked: Post[];
  posted: Post[];

  createdAt: Date;
  updatedAt: Date;
}

type EntryUserProps = Replace<UserProps, {
  id?: string;
  liked?: Post[];
  posted?: Post[];
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
      liked: props.liked ?? [],
      posted: props.posted ?? [],
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

  get username(): string {
    return this.props.username
  }

  set username(username: string) {
    this.props.username = username
  }

  get password(): string {
    return this.props.password
  }

  async authenticate(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password)
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

  get location(): string {
    return this.props.location
  }

  set location(location: string) {
    this.props.location = location
  }

  get liked(): Post[] {
    return this.props.liked
  }

  addLikedPost(post: Post) {
    this.props.liked.push(post)
  }

  removeLikedPost(post: Post) {
    const index = this.props.liked.indexOf(post)
    if (index !== -1) {
      this.props.liked.splice(index, 1)
    }
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date {
    return this.props.updatedAt
  }
}