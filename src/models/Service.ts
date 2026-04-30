import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: String, required: true },
  time: { type: String, required: true },
  injectedBy: { type: String, default: 'root@toolsArg' },
}, { 
  timestamps: true // Agrega createdAt y updatedAt automáticamente
});

// Evita re-compilar el modelo si ya existe en caché
export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);