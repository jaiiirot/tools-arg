// import type { APIRoute } from 'astro';
// import dbConnect from '../../lib/mongoose';
// import Service from '../../models/Service';

// const SEED_DATA = [
//   { name: "MOTO MTOOLS (Distribuidor)", category: "software", price: "$25.00", time: "1-12 Horas" },
//   { name: "UnlockTool Licencia 3 Meses", category: "unlock", price: "$17.70", time: "1-3 Horas" },
//   { name: "UnlockTool Licencia 6 Meses", category: "unlock", price: "$25.40", time: "1-3 Horas" },
//   { name: "UnlockTool Licencia 12 Meses", category: "unlock", price: "$41.35", time: "1-3 Horas" },
//   { name: "HelloAIO Tool Activación 1 Año", category: "software", price: "$43.49", time: "1 Año" },
//   { name: "HelloAIO Tool Activación 6 Meses", category: "software", price: "$24.70", time: "6 Meses" },
//   { name: "E-GSM Tool Activación 1 Año", category: "software", price: "$51.60", time: "3 Horas" },
//   { name: "RTC Tool Licencia Digital 6 Meses", category: "software", price: "$17.95", time: "1-10 Horas" },
//   { name: "AnonySHU Activación 12 Meses (1 PC)", category: "software", price: "$49.00", time: "1-3 Horas" },
//   { name: "AnonySHU Activación 6 Meses (1 PC)", category: "software", price: "$36.50", time: "1-3 Horas" },
//   { name: "TSM Tool Pro 3 Meses", category: "software", price: "$12.90", time: "1-3 Horas" },
//   { name: "TSM Tool Pro 6 Meses", category: "software", price: "$22.50", time: "1-3 Horas" },
//   { name: "Chimera Tool Básico (1 Año)", category: "unlock", price: "$96.00", time: "1 Año" },
//   { name: "Panda Dns Maker Pro 1 Año", category: "software", price: "$69.00", time: "1 Año" },
//   { name: "Panda Dns Maker Pro 6 Meses", category: "software", price: "$37.00", time: "6 Meses" },
//   { name: "UMT Box/Dongle Activación 1 Año", category: "software", price: "$18.85", time: "1-12 Horas" },
//   { name: "Infinity-Box/Dongle Renovación 1 Año", category: "software", price: "$31.20", "time": "1-3 Horas" },
//   { name: "Octoplus FRP Licencia Digital 1 Año", category: "unlock", price: "$50.40", time: "1-3 Horas" },
//   { name: "Cheetah Tool Pro Activación 1 Año", category: "software", price: "$44.00", time: "1-10 Horas" },
//   { name: "Griffin Unlocker Licencia 12 Meses", category: "unlock", price: "$46.04", time: "1-12 Horas" }
// ];

// export const GET: APIRoute = async () => {
//   try {
//     await dbConnect();

//     const count = await Service.countDocuments();
//     if (count > 0) {
//       return new Response(JSON.stringify({ error: "DB ya contiene datos." }), { status: 400 });
//     }

//     await Service.insertMany(SEED_DATA);

//     return new Response(JSON.stringify({ 
//       success: true, 
//       message: "Volcado de datos ejecutado correctamente vía Mongoose." 
//     }), { status: 201 });

//   } catch (error) {
//     return new Response(JSON.stringify({ error: "Fallo fatal en el sembrado." }), { status: 500 });
//   }
// };