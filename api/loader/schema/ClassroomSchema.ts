import { Schema, Types } from 'mongoose';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';
import mongooseLeanGetters from 'mongoose-lean-getters';

export enum Days {
  SUN = 'SUN',
  MON = 'MON',
  TUE = 'TUE',
  WED = 'WED',
  THU = 'THU',
  FRI = 'FRI',
  SAT = 'SAT',
}

export interface IClassroom {
  _id: Types.ObjectId;
  newCollection?: boolean;
  name: string;
  notice?: string;
  description: string;
  coverImg?: string;
  iconImg?: string;
  rating: {
    grade: string;
    difficulty?: number;
    educational?: number;
    fun?: number;
  };
  classTimes: { [key in Days]?: string[] }[];
  bookList: {
    bookShelfName: string;
    booksImg?: string;
  }[];
  enrollName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClassroomDoc extends IClassroom, Document {
  _id: Types.ObjectId;
  id: string;
}

const classroomSchema = new Schema<ClassroomDoc>(
  {
    name: {
      type: String,
      required: true,
    },
    newCollection: Boolean,
    notice: String,
    description: {
      type: String,
      required: true,
    },
    coverImg: String,
    iconImg: String,
    rating: {
      grade: {
        type: String,
        required: true,
      },
      difficulty: Number,
      educational: Number,
      fun: Number,
    },
    classTimes: [
      {
        SUN: [String],
        MON: [String],
        TUE: [String],
        WED: [String],
        THU: [String],
        FRI: [String],
        SAT: [String],
      },
    ],
    bookList: [
      {
        bookShelfName: String,
        booksImg: String,
      },
    ],
    enrollName: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'classroom',
    strict: true,
    timestamps: true,
    versionKey: false,
  },
);

classroomSchema.plugin(mongooseLeanVirtuals).plugin(mongooseLeanGetters);

export default classroomSchema;
