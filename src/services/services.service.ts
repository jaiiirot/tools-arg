// Interface para tipar nuestros servicios
export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  price: string;
  time: string;
}

export const getAvailableServices = async (): Promise<ServiceItem[]> => {
  // TODO: Conectar a MongoDB -> db.collection('services').find({ time: /horas|meses|año/i }).toArray();
  
  // Datos simulados, traducidos y filtrados (Excluyendo los de "minutos")
  return [
    { id: "srv_001", name: "MOTO MTOOLS (Activación)", category: "unlock", price: "$25.00", time: "1-12 Horas" },
    { id: "srv_002", name: "UnlockTool Licencia Nueva / Renovar", category: "software", price: "$17.70", time: "3 Meses" },
    { id: "srv_003", name: "UnlockTool Licencia Nueva / Renovar", category: "software", price: "$41.35", time: "12 Meses" },
    { id: "srv_004", name: "HelloAio Tool Activación", category: "software", price: "$43.49", time: "1 Año" },
    { id: "srv_005", name: "HelloAio Tool Activación", category: "software", price: "$24.70", time: "6 Meses" },
    { id: "srv_006", name: "FlexUnlock Tool - Licencia", category: "software", price: "$45.73", time: "1 Año" },
    { id: "srv_007", name: "E-GSM Tool Activación", category: "software", price: "$51.60", time: "3 Horas" }
  ];
};