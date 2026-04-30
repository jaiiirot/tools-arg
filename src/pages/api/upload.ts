import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { v2 as cloudinary } from 'cloudinary';

// Configurar Cloudinary
cloudinary.config({ 
  cloud_name: 'TU_CLOUD_NAME', 
  api_key: 'TU_API_KEY', 
  api_secret: 'TU_API_SECRET' 
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const file = data.get('receipt') as File;
    
    if (!file) {
      return new Response(JSON.stringify({ error: "No se encontró archivo." }), { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 1. Reducir el tamaño de la imagen del comprobante con Sharp (Backend)
    const compressedImageBuffer = await sharp(buffer)
      .resize(800) // Redimensiona a un ancho máximo de 800px
    //   .jpeg({ quality: 70 }) // Comprime la calidad a 70%
      .toBuffer();

    // 2. Subir a Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'comprobantes_toolsarg' },
        (error, result) => {
          if (result) resolve(result);
          else reject(error);
        }
      );
      uploadStream.end(compressedImageBuffer);
    });

    return new Response(JSON.stringify({ 
      message: "¡Comprobante subido con éxito a la terminal!", 
      url: (uploadResult as any).secure_url 
    }), { status: 200 });

  } catch (error) {
    return new Response(JSON.stringify({ error: "Error de ejecución en el servidor." }), { status: 500 });
  }
}