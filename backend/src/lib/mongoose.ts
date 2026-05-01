import mongoose from 'mongoose'

let isConnected = false

export async function connectMongo(): Promise<void> {
  if (isConnected) return

  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI is not defined')

  mongoose.set('bufferCommands', false)

  await mongoose.connect(uri, {
    maxPoolSize:    10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })

  isConnected = true
  console.log('[MongoDB] Connected')
}

export default mongoose
