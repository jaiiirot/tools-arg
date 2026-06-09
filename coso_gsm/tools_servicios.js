// ─────────────────────────────────────────────────────────────────────────────
//  COSO GSM — Servicios por Dispositivo / Marca
//  FRP, unlock, repair específicos por marca. Precios en USD.
//  unavailable: true  →  reemplaza los servicios con precio $0 (NO DISPONIBLE)
// ─────────────────────────────────────────────────────────────────────────────

const SERVICIOS_DATA = [

  // ── XIAOMI ────────────────────────────────────────────────────────────────
  {
    cat: "XIAOMI FRP",
    tag: "tag-xiaomi",
    icon: "XI",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Xiaomi_logo.svg/512px-Xiaomi_logo.svg.png",
    services: [
      { name: "XIAOMI FRP + HARD RESET — SIDELOAD",                            usd: 3.5,  time: "1-10 min", new: true },
    ]
  },

  // ── MOTOROLA ──────────────────────────────────────────────────────────────
  {
    cat: "MOTOROLA MTK/SPD",
    tag: "tag-moto",
    icon: "MO",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Motorola_logo_2019.svg/512px-Motorola_logo_2019.svg.png",
    services: [
      { name: "FRP + HARD RESET ESPECIAL — G06, G26, G17",                     usd: 10.5, time: "1-10 min" },
      { name: "FRP + RESET FASTBOOT — G35, G04, G14, E14, G24, E13, G05, G15, E15", usd: 3.5, time: "1-10 min", new: true },
      { name: "REPAIR NEW MODEL FASTBOOT — G05, G15, E15, G35",                usd: 6.5,  time: "1-10 min", new: true },
      { name: "SERVER REPAIR ESPECIAL — G06, G26, G17",                        usd: 22,   time: "1-10 min" },
      { name: "SERVER REPAIR FASTBOOT — G22, E32S",                            unavailable: true, time: "1-10 min" },
      { name: "SERVER REPAIR MTK METAMODE — E7, E6S, E22, E22I, E22S, G8POWERLITE", usd: 2.5, time: "1-10 min", new: true },
      { name: "SERVER REPAIR MTK METAMODE — G23, G13",                         usd: 3.5,  time: "1-10 min", new: true },
      { name: "SERVER REPAIR REMOTO — G24, G24 POWER",                         usd: 6.5,  time: "1-10 min", new: true },
      { name: "SERVER REPAIR SPD ADB — G20, E20, E30, E32, E40, E6I, E7I",    usd: 2.5,  time: "1-10 min", new: true },
      { name: "SERVER REPAIR SPD FASTBOOT — G04, G04S, G14, E14, E13",         usd: 4,    time: "1-10 min", new: true },
    ]
  },

  // ── SAMSUNG ───────────────────────────────────────────────────────────────
  {
    cat: "SAMSUNG JDM & TFN",
    tag: "tag-samsung",
    icon: "SA",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/512px-Samsung_Logo.svg.png",
    services: [
      { name: "Samsung JDM Unlock SIM / IMEI Repair — S134DL, S135DL, S146VL, S215DL, A037U, A055M, A055G, A146P, A146U, A215U, X216B, X216C, X216N, X218B, X218U, E166P, M166P (Auto API)", usd: 24, time: "1-10 min" },
    ]
  },

  // ── AWT RENT DIRECTO ──────────────────────────────────────────────────────
  {
    cat: "AWT Android WinTools",
    tag: "tag-awt",
    icon: "AW",
    img: "https://androidwintool.com/wp-content/uploads/2021/07/awt-logo.png",
    services: [
      { name: "AndroidWinTool (AWT) Rent — 48 horas (GRATIS)",     unavailable: true, time: "1-10 min" },
      { name: "AndroidWinTool (AWT) Rent 2 — 48 horas",            usd: 2.6,   time: "1-10 min" },
      { name: "AndroidWinTool (AWT) Rent 3 — 48 horas",            usd: 2.6,   time: "1-10 min" },
      { name: "AndroidWinTool (AWT) Rent 4 — 48 horas",            usd: 2.6,   time: "1-10 min" },
    ]
  },

  // ── DFT PRO RENT DIRECTO ──────────────────────────────────────────────────
  {
    cat: "DFT Pro",
    tag: "tag-dft",
    icon: "DF",
    img: "https://dftpro.net/wp-content/uploads/2022/06/dft-pro-logo.png",
    services: [
      { name: "DFT Pro Rent Login+Password — 2 días",              usd: 2.88,  time: "1-10 min" },
      { name: "DFT Pro Rent Login+Password — 45 horas",            usd: 2.5,   time: "1-10 min" },
      { name: "DFT Pro Rent Login+Password — 48 horas",            usd: 2.8,   time: "1-10 min" },
      { name: "DFT Pro Rent Login+Password — 48 horas V2",         usd: 2.78,  time: "1-10 min" },
    ]
  },

];
