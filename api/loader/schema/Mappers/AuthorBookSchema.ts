import { Schema, Types } from 'mongoose';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';
import mongooseLeanGetters from 'mongoose-lean-getters';

export interface IAuthorBook {
  _id: Types.ObjectId;
  author: Types.ObjectId;
  book: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthorBookDoc extends IAuthorBook, Document {
  _id: Types.ObjectId;
  id: string;
}

const authorBookSchema = new Schema<AuthorBookDoc>(
  {
    author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  },
  {
    collection: 'authorbook',
    strict: true,
    timestamps: true,
    versionKey: false,
  },
);

authorBookSchema.plugin(mongooseLeanVirtuals).plugin(mongooseLeanGetters);

export default authorBookSchema;
