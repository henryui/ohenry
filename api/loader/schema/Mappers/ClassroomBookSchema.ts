import { Schema, Types } from 'mongoose';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';
import mongooseLeanGetters from 'mongoose-lean-getters';

export interface IClassroomBook {
  _id: Types.ObjectId;
  book: Types.ObjectId;
  classroom: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClassroomBookDoc extends IClassroomBook, Document {
  _id: Types.ObjectId;
  id: string;
}

const classroomBookSchema = new Schema<ClassroomBookDoc>(
  {
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    classroom: {
      type: Schema.Types.ObjectId,
      ref: 'Classroom',
      required: true,
    },
  },
  {
    collection: 'classroombook',
    strict: true,
    timestamps: true,
    versionKey: false,
  },
);

classroomBookSchema.plugin(mongooseLeanVirtuals).plugin(mongooseLeanGetters);

export default classroomBookSchema;
