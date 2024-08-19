import { randomUUID } from 'crypto';
import { Replace } from '../../helpers/Replace';
import { User } from './user';

interface PostProps {
  id: string;
  text: string;
  parentId?: string;

  likedBy: User[]
  authorId: User['id']
  author: User

  createdAt: Date;
  updatedAt: Date;
}

type EntryPostProps = Replace<PostProps, {
  id?: string;
  likedBy?: User[];
  createdAt?: Date;
  updatedAt?: Date;
}>

export class Post {
  private props: PostProps

  constructor (props: EntryPostProps) {
    const now = new Date()

    this.props = {
      id: props.id ?? randomUUID(),
      ...props,
      likedBy: props.likedBy ?? [],
      createdAt: props.createdAt ?? now,
      updatedAt: props.updatedAt ?? now,
    }
  }

  get id(): string {
    return this.props.id
  }

  get text(): string {
    return this.props.text
  }

  set text(text: string) {
    this.props.text = text
  }

  get parentId(): string | undefined {
    return this.props.parentId
  }

  set parentId(parentId: string) {
    this.props.parentId = parentId
  }

  get likedBy(): User[] {
    return this.props.likedBy
  }

  like(user: User) {
    this.props.likedBy.push(user)
  }

  get authorId(): string {
    return this.props.authorId
  }

  get author(): User {
    return this.props.author
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date {
    return this.props.updatedAt
  }
}
