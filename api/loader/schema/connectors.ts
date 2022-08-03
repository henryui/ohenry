import mongoose, { Connection } from 'mongoose';

export const connect = (url: string) =>
  new Promise<Connection>((resolve, reject) => {
    mongoose.connect(url);
    mongoose.connection.on('error', err => {
      reject(err);
    });
    mongoose.connection.once('open', () => {
      console.log('Mongoose connection opened');
      resolve(mongoose.connection);
    });
  });

export const disconnect = (connection?: Connection) =>
  new Promise<void>(resolve => {
    (connection || mongoose.connection).close(() => {
      console.log('Mongoose connection closed');
      resolve();
    });
  });
