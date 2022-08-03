import mongoose, { model } from 'mongoose';
import { connect, disconnect } from './connectors';
// Schemas
import authorSchema, { AuthorDoc, IAuthor } from './AuthorSchema';
import bookSchema, { BookDoc, IBook } from './BookSchema';
import classroomSchema, { ClassroomDoc, IClassroom } from './ClassroomSchema';
import userSchema, {
  UserDoc,
  IUser,
  ExternalProvider,
  UserLanguage,
} from './UserSchema';
// Mapper Schemas
import authorBookSchema, {
  AuthorBookDoc,
  IAuthorBook,
} from './Mappers/AuthorBookSchema';
import classroomBookSchema, {
  ClassroomBookDoc,
  IClassroomBook,
} from './Mappers/ClassroomBookSchema';

// Export types
export {
  // User
  ExternalProvider,
  UserLanguage,
};

export {
  // Schema Docs
  AuthorDoc,
  AuthorBookDoc,
  BookDoc,
  ClassroomDoc,
  ClassroomBookDoc,
  UserDoc,
  // Type Interfaces
  IAuthor,
  IAuthorBook,
  IBook,
  IClassroom,
  IClassroomBook,
  IUser,
};

class Schema {
  Author = model('AuthorSchema', authorSchema);

  Book = model('BookSchema', bookSchema);

  Classroom = model('ClassroomSchema', classroomSchema);

  User = model('UserSchema', userSchema);

  // Mappers

  AuthorBook = model('AuthorBookSchema', authorBookSchema);

  ClassroomBook = model('ClassroomBookSchema', classroomBookSchema);

  public connect = connect;

  public disconnect = () => disconnect(this.connection);

  public connection?: mongoose.Connection;
}

export default new Schema();
