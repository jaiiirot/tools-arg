import type { APIRoute } from 'astro';
import clientPromise from '../../lib/mongodb';
import { processServiceData } from '../../services/data-filter.service';

export const GET: APIRoute = async () => {
  try {
    const client = await clientPromise;
    const db = client.db('toolsArg');
    // Obtenemos todos los servicios de la base de datos
    const services = await db.collection('services').find({}).toArray();
    
    // Mapeamos y convertimos el _id de Mongo a string
    const formattedServices = services.map(srv => ({
      id: srv._id.toString(),
      name: srv.name,
      category: srv.category,
      price: srv.price,
      time: srv.time
    }));

    return new Response(JSON.stringify(formattedServices), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error de conexión a la BD." }), { status: 500 });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    
    // Pasamos el nombre por nuestro filtro de traducción y reglas de negocio
    const processed = processServiceData(body.time);
    if (!processed.shouldShow) {
      return new Response(JSON.stringify({ error: "El tiempo debe medirse en Horas, Meses o Años." }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('toolsArg');
    
    const newService = {
      name: body.name,
      category: body.category,
      price: `$${parseFloat(body.price).toFixed(2)}`,
      time: processed.text,
      createdAt: new Date()
    };

    const result = await db.collection('services').insertOne(newService);

    return new Response(JSON.stringify({ success: true, id: result.insertedId }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Fallo al insertar en MongoDB." }), { status: 500 });
  }
};