import mongoose from 'mongoose';

const MONGODB_URI = import.meta.env.MONGODB_URI || "mongodb://localhost:27017/toolsArg";

if (!MONGODB_URI) {
  throw new Error('> [FATAL] MONGODB_URI no está definido en el archivo .env');
}
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = { bufferCommands: false };
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('> [SYSTEM] Conexión a MongoDB (Mongoose) establecida.');
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;