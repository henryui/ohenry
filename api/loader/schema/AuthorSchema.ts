import { Schema, Types } from 'mongoose';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';
import mongooseLeanGetters from 'mongoose-lean-getters';

export interface IAuthor {
  _id: Types.ObjectId;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthorDoc extends IAuthor, Document {
  _id: Types.ObjectId;
  id: string;
}

const authorSchema = new Schema<AuthorDoc>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'author',
    strict: true,
    timestamps: true,
    versionKey: false,
  },
);

authorSchema.plugin(mongooseLeanVirtuals).plugin(mongooseLeanGetters);

export default authorSchema;
