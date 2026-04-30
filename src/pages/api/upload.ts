import type { APIRoute } from 'astro';
import { sendSystemNotification } from '../../lib/mailer';
// Aquí importarás Cloudinary y Sharp que declaramos en pasos anteriores

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const file = data.get('receipt');
    const serviceName = data.get('serviceName') as string;
    const userEmail = data.get('userEmail') as string;

    if (!file) return new Response(JSON.stringify({ error: "No payload." }), { status: 400 });

    // 1. Logica de Sharp y Cloudinary iría aquí...
    
    // 2. Enviar correo gratuito al usuario notificando que se recibió la orden
    if (userEmail) {
      await sendSystemNotification(userEmail, serviceName);
    }

    return new Response(JSON.stringify({ message: "OK" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "System failure." }), { status: 500 });
  }
}