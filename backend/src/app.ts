import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// 1. Inicializar variables de entorno (.env)
dotenv.config();

// 2. Instanciar el clúster
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173', // El puerto exacto de tu Vite
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true // Crucial si usas cookies o tokens en headers
}));

app.use(express.json()); // Entender JSON en peticiones POST
app.use(express.urlencoded({ extended: true }));

// 4. Ruta base / Healthcheck
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: '[SISTEMA] Motor Backend de toolsArg operando correctamente.',
    timestamp: new Date().toISOString()
  });
});

// 5. Secuencia de Arranque
const startServer = async () => {
  try {
    // Nota: Aquí luego importaremos tu conexión a MongoDB desde ./lib/mongoose
    
    app.listen(PORT, () => {
      console.log(`> [SISTEMA] Servidor Backend escuchando en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('> [FATAL] Falla crítica al iniciar el clúster:', error);
    process.exit(1);
  }
};

startServer();