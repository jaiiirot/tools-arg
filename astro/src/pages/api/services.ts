import type { APIRoute } from 'astro';
import dbConnect from '../../lib/mongoose';
import Service from '../../models/Service';
import { processServiceData } from '../../services/data-filter.service';

export const GET: APIRoute = async () => {
  try {
    await dbConnect();
    // Mongoose trae los datos de forma estructurada
    const services = await Service.find({}).sort({ createdAt: -1 });
    
    // Mapeamos para el frontend
    const formatted = services.map(srv => ({
      id: srv._id.toString(),
      name: srv.name,
      category: srv.category,
      price: srv.price,
      time: srv.time
    }));

    return new Response(JSON.stringify(formatted), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error de conexión a la BD." }), { status: 500 });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const processed = processServiceData(body.time);
    
    if (!processed.shouldShow) {
      return new Response(JSON.stringify({ error: "El tiempo debe medirse en Horas, Meses o Años." }), { status: 400 });
    }

    await dbConnect();
    
    // Crear usando el modelo de Mongoose
    const newService = new Service({
      name: body.name,
      category: body.category,
      price: `$${parseFloat(body.price).toFixed(2)}`,
      time: processed.text
    });

    await newService.save();

    return new Response(JSON.stringify({ success: true, id: newService._id }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Fallo al insertar en MongoDB." }), { status: 500 });
  }
};