import type { APIRoute } from 'astro';
import { sendStatusNotification } from '../../lib/mailer';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email, serviceName, status } = await request.json();

    if (!email || !serviceName || !status) {
      return new Response(JSON.stringify({ error: "Faltan parámetros requeridos." }), { status: 400 });
    }

    // Disparar correo asíncrono
    await sendStatusNotification(email, serviceName, status);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Fallo al enviar notificación." }), { status: 500 });
  }
};