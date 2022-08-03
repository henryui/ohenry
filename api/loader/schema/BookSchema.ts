import { Schema, Types } from 'mongoose';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';
import mongooseLeanGetters from 'mongoose-lean-getters';

export enum BookTheme {
  'Absurdist Fiction' = 'Absurdist Fiction',
  'Adventure' = 'Adventure',
  'Adventure Fiction' = 'Adventure Fiction',
  'Allegorical Novel' = 'Allegorical Novel',
  'Allegory' = 'Allegory',
  'Anthology' = 'Anthology',
  'Apartheid' = 'Apartheid',
  'Archeology' = 'Archeology',
  'Artistic Biography' = 'Artistic Biography',
  'Arts And Culture' = 'Arts And Culture',
  'Asian Fiction' = 'Asian Fiction',
  'Based On A True Story' = 'Based On A True Story',
  'Biographical Novel' = 'Biographical Novel',
  'Biography' = 'Biography',
  'Coming Of Age' = 'Coming Of Age',
  'Communism' = 'Communism',
  'Compilation Works' = 'Compilation Works',
  'Dystopia' = 'Dystopia',
  'Egyptology' = 'Egyptology',
  'Epic Poetry' = 'Epic Poetry',
  'Epistolary Novel' = 'Epistolary Novel',
  'Fantasy' = 'Fantasy',
  'Fantasy Fiction' = 'Fantasy Fiction',
  'Fiction' = 'Fiction',
  'German Fantasy Fiction' = 'German Fantasy Fiction',
  'Historical Drama' = 'Historical Drama',
  'Historical Fiction' = 'Historical Fiction',
  'Informative' = 'Informative',
  'Injustice' = 'Injustice',
  'Mystery' = 'Mystery',
  'Non-fiction' = 'Non-fiction',
  'Play Script' = 'Play Script',
  'Poetry' = 'Poetry',
  'Political Satire' = 'Political Satire',
  'Poverty' = 'Poverty',
  'Psychology' = 'Psychology',
  'Road Fiction' = 'Road Fiction',
  'Science Fiction' = 'Science Fiction',
  'Science-fantasy' = 'Science-fantasy',
  'Tragedy' = 'Tragedy',
}

export interface IBook {
  _id: Types.ObjectId;
  name: string;
  year: number;
  themes: BookTheme[];
  pages: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookDoc extends IBook, Document {
  _id: Types.ObjectId;
  id: string;
}

const bookSchema = new Schema<BookDoc>(
  {
    name: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    themes: {
      type: [String],
      // TODO: validate
      required: true,
    },
    pages: {
      type: Number,
      required: true,
    },
    description: String,
  },
  {
    collection: 'book',
    strict: true,
    timestamps: true,
    versionKey: false,
  },
);

bookSchema.plugin(mongooseLeanVirtuals).plugin(mongooseLeanGetters);

export default bookSchema;
