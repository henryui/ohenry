import { Schema, Types } from 'mongoose';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';
import mongooseLeanGetters from 'mongoose-lean-getters';

export enum UserLanguage {
  en = 'en',
  kr = 'kr',
  cn = 'cn',
}

export enum ExternalProvider {
  google = 'google',
}

export interface IUser {
  _id: Types.ObjectId;
  displayName: string;
  email: string;
  externalId?: string;
  firstName: string;
  language?: UserLanguage;
  lastName: string;
  picture?: string;
  providerType?: ExternalProvider;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserDoc extends IUser, Document {
  _id: Types.ObjectId;
  id: string;
}

const userSchema = new Schema<UserDoc>(
  {
    displayName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    externalId: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
    },
    language: {
      enum: Object.values(UserLanguage),
    },
    lastName: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
    providerType: {
      enum: Object.values(ExternalProvider),
    },
  },
  {
    collection: 'user',
    strict: true,
    timestamps: true,
    versionKey: false,
  },
);

userSchema.plugin(mongooseLeanVirtuals).plugin(mongooseLeanGetters);

export default userSchema;
