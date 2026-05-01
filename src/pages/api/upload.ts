import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { v2 as cloudinary } from 'cloudinary';
import { sendSystemNotification } from '../../lib/mailer';

// Configuración del SDK de Cloudinary
cloudinary.config({
  cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const file = data.get('receipt') as File;
    const serviceName = data.get('serviceName') as string;
    const userEmail = data.get('userEmail') as string;

    if (!file) {
      return new Response(JSON.stringify({ error: "Ausencia de payload multimedia." }), { status: 400 });
    }

    // 1. Transformar el archivo a Buffer para procesarlo en memoria
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 2. Compresión extrema con Sharp (Format: WebP, Max Width: 800px)
    const compressedBuffer = await sharp(buffer)
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toBuffer();

    // 3. Subida a Cloudinary vía Stream (sin tocar el disco local)
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'toolsArg_orders', format: 'webp' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(compressedBuffer);
    });

    const receiptUrl = (uploadResult as any).secure_url;

    // 4. Ejecutar notificación asíncrona por correo electrónico
    if (userEmail) {
      await sendSystemNotification(userEmail, serviceName).catch(err => 
        console.error('> [SYSTEM_LOG] Error SMTP no bloqueante:', err)
      );
    }

    // 5. Retornar URL encriptada al cliente
    return new Response(JSON.stringify({ 
      success: true, 
      url: receiptUrl 
    }), { status: 200 });

  } catch (error) {
    console.error('> [FATAL_ERROR] Falla en pipeline multimedia:', error);
    return new Response(JSON.stringify({ error: "Fallo interno al procesar nodo de datos." }), { status: 500 });
  }
};