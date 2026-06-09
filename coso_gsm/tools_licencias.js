// ─────────────────────────────────────────────────────────────────────────────
//  COSO GSM — Licencias & Activaciones
//  Herramientas con licencia mensual (3, 6, 12 meses). Precios en USD.
//  unavailable: true  →  reemplaza los servicios con precio $0 (NO DISPONIBLE)
// ─────────────────────────────────────────────────────────────────────────────

const LICENCIAS_DATA = [

  // ── UNLOCKING / FRP / BYPASS ─────────────────────────────────────────────

  {
    cat: "HelloAIO Tool",
    tag: "tag-tools",
    icon: "HA",
    img: "https://gsm-server.com/wp-content/uploads/2023/04/hello-aio-tool.png",
    services: [
      { name: "HelloAIO Tool — 6 Months Activation",                           usd: 24.5,  time: "1-10 min" },
    ]
  },

  {
    cat: "FlexUnlock Tool",
    tag: "tag-tools",
    icon: "FL",
    img: "https://gsmflash.net/wp-content/uploads/2023/07/flexunlock-tool.png",
    services: [
      { name: "FlexUnlock Tool — 1 Month License Activate/Renew",              usd: 14.597, time: "1-10 min" },
      { name: "FlexUnlock Tool — 3 Months License Activate/Renew",             usd: 19.35,  time: "1-10 min" },
      { name: "FlexUnlock Tool — 6 Months License Activate/Renew",             usd: 26.082, time: "1-10 min" },
    ]
  },

  {
    cat: "UnlockTool",
    tag: "tag-tools",
    icon: "UN",
    img: "https://unlocktool.net/static/img/ut-logo.png",
    services: [
      { name: "UnlockTool — 3 Months License New/Renew (Server 2 Fast)",       usd: 17.5,  time: "1-3 hrs" },
      { name: "UnlockTool — 6 Months License New/Renew (Server 2 Fast)",       usd: 25.5,  time: "1-3 hrs" },
      { name: "UnlockTool — 12 Months License New/Renew (Server 2 Fast)",      usd: 41.269, time: "1-3 hrs" },
      { name: "UnlockTool — 3 Months License Active & Renew (Server 1 Slow)",  usd: 17.7,  time: "1-12 hrs" },
      { name: "UnlockTool — 6 Months License Active & Renew (Server 1 Slow)",  usd: 24.5,  time: "1-3 hrs" },
      { name: "UnlockTool — 12 Months License Active & Renew (Server 1 Slow)", usd: 40.769, time: "1-10 min" },
    ]
  },

  {
    cat: "Griffin Unlocker",
    tag: "tag-tools",
    icon: "GR",
    img: "https://griffin-unlocker.com/wp-content/uploads/2022/08/griffin-logo.png",
    services: [
      { name: "Griffin Unlocker — 3 Months New Account",                       usd: 23.896, time: "1-10 min" },
      { name: "Griffin Unlocker — 3 Months Renew Existing Account",            usd: 23.793, time: "1-10 min" },
      { name: "Griffin Unlocker — 6 Months New Account",                       usd: 31.621, time: "1-10 min" },
      { name: "Griffin Unlocker — 6 Months Renew Existing Account",            usd: 33.681, time: "1-10 min" },
      { name: "Griffin Unlocker — 12 Months New Account",                      usd: 46.041, time: "1-10 min" },
      { name: "Griffin Unlocker — 12 Months Renew Existing Account",           usd: 46.041, time: "1-10 min" },
    ]
  },

  {
    cat: "NCK Online Tool",
    tag: "tag-tools",
    icon: "NC",
    img: "https://nck-online.com/img/logo/nck-logo.png",
    services: [
      { name: "NCK Online Tool — 1 Month Activation",                          usd: 7.356,  time: "1-10 min" },
      { name: "NCK Online Tool — 3 Months Activation",                         usd: 9.2,    time: "1-10 min" },
      { name: "NCK Online Tool — 6 Months Activation",                         usd: 14.25,  time: "1-10 min" },
      { name: "NCK Online Tool — 12 Months Activation",                        usd: 23.2,   time: "1-10 min" },
    ]
  },

  {
    cat: "ArepaTool",
    tag: "tag-tools",
    icon: "AR",
    img: "https://arepatool.com/wp-content/uploads/2023/01/arepa-tool-logo.png",
    services: [
      { name: "ArepaTool MultiTool Fix Yape, Bypass — 3 Months",               usd: 6.49,  time: "1-10 min" },
      { name: "ArepaTool MultiTool Fix Yape, Bypass — 6 Months",               usd: 8.99,  time: "1-10 min" },
    ]
  },

  {
    cat: "EVO Tool Unlock",
    tag: "tag-tools",
    icon: "EV",
    img: "https://evotool.net/wp-content/uploads/2022/10/evo-tool-logo.png",
    services: [
      { name: "EVO Tool Unlock — 3 Months License",                            usd: 17.201, time: "1-10 min" },
      { name: "EVO Tool Unlock — 6 Months License",                            usd: 30.9,   time: "1-10 min" },
      { name: "EVO Tool Unlock — 12 Months License",                           unavailable: true, time: "1-10 min" },
    ]
  },

  {
    cat: "Moto King Pro",
    tag: "tag-tools",
    icon: "MK",
    img: "https://motokingpro.com/wp-content/uploads/2022/11/motokingpro-logo.png",
    services: [
      { name: "Moto King Pro — 3 Months Activation",                           usd: 14.99,  time: "1-10 min" },
    ]
  },

  {
    cat: "Uni Android Tool",
    tag: "tag-tools",
    icon: "UA",
    img: "https://uniandroid.com/wp-content/uploads/2021/06/uni-android-tool-logo.png",
    services: [
      { name: "Uni-Android Tool — 3 Months Activation",                        unavailable: true, time: "1-10 min" },
      { name: "Uni-Android Tool — 3 Months Renewal",                           unavailable: true, time: "1-10 min" },
      { name: "Uni-Android Tool — 6 Months Activation",                        unavailable: true, time: "1-10 min" },
      { name: "Uni-Android Tool — 6 Months Renewal",                           unavailable: true, time: "1-10 min" },
      { name: "Uni-Android Tool — 12 Months Activation",                       unavailable: true, time: "1-10 min" },
      { name: "Uni-Android Tool — 12 Months Renewal",                          usd: 17.7,   time: "1-10 min" },
    ]
  },

  {
    cat: "AndroidWinTool (AWT) Licencia",
    tag: "tag-tools",
    icon: "AW",
    img: "https://androidwintool.com/wp-content/uploads/2021/07/awt-logo.png",
    services: [
      { name: "AndroidWinTool — 1 Month (30 días) Existing Users",             usd: 14.9,  time: "1-10 min" },
      { name: "AndroidWinTool — 3 Months (90 días) Existing Users",            usd: 23.6,  time: "1-10 min" },
    ]
  },

  {
    cat: "UFT Tool",
    tag: "tag-tools",
    icon: "UF",
    img: "https://uftool.net/wp-content/uploads/2022/05/uft-tool-logo.png",
    services: [
      { name: "UFT Tool — 6 Months New Account",                               unavailable: true, time: "1-10 min" },
    ]
  },

  {
    cat: "Android Multi Tool (AMT)",
    tag: "tag-tools",
    icon: "AM",
    img: "https://gsmflash.net/wp-content/uploads/2023/03/android-multi-tool-logo.png",
    services: [
      { name: "Android Multi Tool (AMT) — 3 Months License",                   usd: 9.236,  time: "1-10 min" },
      { name: "Android Multi Tool (AMT) — 6 Months License",                   usd: 16.544, time: "1-10 min" },
    ]
  },

  {
    cat: "AnonySHU Tool",
    tag: "tag-tools",
    icon: "AN",
    img: "https://anonyshu.com/wp-content/uploads/2023/02/anonyshu-logo.png",
    services: [
      { name: "AnonySHU — 6 Months Activation (1 PC)",                         usd: 31.8,  time: "1-3 hrs" },
      { name: "AnonySHU — 12 Months Activation (1 PC)",                        usd: 49,    time: "1-3 hrs" },
    ]
  },

  // ── SAMSUNG ESPECÍFICOS ──────────────────────────────────────────────────

  {
    cat: "Samsung Tool KG Bypass",
    tag: "tag-samsung",
    icon: "SA",
    img: "https://samsungtool.us/wp-content/uploads/2022/07/samsung-kg-bypass-logo.png",
    services: [
      { name: "Samsung Tool KG Bypass — 3 Months",                             usd: 32.9,  time: "1-30 min" },
      { name: "Samsung Tool KG Bypass — 6 Months",                             usd: 47,    time: "1-10 min" },
    ]
  },

  {
    cat: "KGFix Tool",
    tag: "tag-samsung",
    icon: "KG",
    img: "https://kgfix.net/wp-content/uploads/2022/09/kgfix-logo.png",
    services: [
      { name: "KG Fix Tool — 3 Months Activation",                             usd: 11.742, time: "1-10 min" },
      { name: "KG Fix Tool — 6 Months Activation",                             usd: 19.004, time: "1-10 min" },
    ]
  },

  {
    cat: "Octoplus Samsung",
    tag: "tag-samsung",
    icon: "OS",
    img: "https://octoplusbox.com/images/logo.png",
    services: [
      { name: "Octoplus Samsung — 3 Months Digital License",                   usd: 25.853, time: "1-10 min" },
      { name: "Octoplus Samsung — 6 Months Digital License",                   usd: 61.903, time: "1-10 min" },
      { name: "Octoplus Samsung — 12 Months Digital License",                  usd: 53,     time: "1-10 min" },
    ]
  },

  // ── FRP HERRAMIENTAS ─────────────────────────────────────────────────────

  {
    cat: "Octoplus FRP",
    tag: "tag-tools",
    icon: "OF",
    img: "https://octoplusbox.com/images/logo.png",
    services: [
      { name: "Octoplus FRP — 3 Months Digital License",                       usd: 25.25,  time: "1-10 min" },
      { name: "Octoplus FRP — 6 Months Digital License",                       usd: 40.5,   time: "1-10 min" },
    ]
  },

  {
    cat: "EFT Pro Tool",
    tag: "tag-tools",
    icon: "EF",
    img: "https://eftprodongle.com/wp-content/uploads/2023/01/eft-pro-logo.png",
    services: [
      { name: "EFT Pro — 1 Month New/ReActivation (No Dongle)",                usd: 9.3,   time: "1-10 min" },
      { name: "EFT Pro — 3 Months New/ReActivation (No Dongle)",               usd: 20.9,  time: "1-10 min" },
      { name: "EFT Pro — 6 Months New/ReActivation (No Dongle)",               usd: 36,    time: "1-10 min" },
      { name: "EFT Pro — 12 Months New Activation (No Dongle)",                usd: 51.39, time: "1-10 min" },
      { name: "EFT Pro — 12 Months Re-Activation (No Dongle)",                 usd: 29,    time: "1-10 min" },
    ]
  },

  {
    cat: "CF Tools",
    tag: "tag-tools",
    icon: "CF",
    img: "https://cftools.de/wp-content/uploads/2022/04/cf-tools-logo.png",
    services: [
      { name: "CF Tools — 1 Month Activation",                                 usd: 4.4,   time: "1-10 min" },
      { name: "CF Tools — 3 Months Activation",                                usd: 8.34,  time: "1-10 min" },
      { name: "CF Tools — 6 Months Activation",                                usd: 13.9,  time: "1-10 min" },
      { name: "CF Tools — 12 Months Activation",                               usd: 20.4,  time: "1-10 min" },
      { name: "CF Tool — 1 Month Renew (Old Users)",                           usd: 5,     time: "1-10 min" },
      { name: "CF Tools — 3 Months Renew (Old Users)",                         usd: 8.44,  time: "1-10 min" },
      { name: "CF Tools — 6 Months Renew (Old Users)",                         usd: 13.9,  time: "1-10 min" },
      { name: "CF Tools — 12 Months Renew (Old Users)",                        usd: 20.5,  time: "1-10 min" },
    ]
  },

  {
    cat: "Cheetah Tool Pro",
    tag: "tag-tools",
    icon: "CH",
    img: "https://cheetahtoolpro.com/wp-content/uploads/2022/06/cheetah-tool-pro-logo.png",
    services: [
      { name: "Cheetah Tool Pro — 3 Months Activation/ReActivation",           usd: 23,    time: "1-10 min" },
      { name: "Cheetah Tool Pro — 6 Months Activation/ReActivation",           usd: 32.5,  time: "1-10 min" },
    ]
  },

  {
    cat: "RTC Tool",
    tag: "tag-tools",
    icon: "RT",
    img: "https://rtctool.com/wp-content/uploads/2022/08/rtc-tool-logo.png",
    services: [
      { name: "RTC Tool — 3 Months Digital License Active/Renew",              usd: 14.85,  time: "1-10 min" },
      { name: "RTC Tool — 6 Months Digital License Active/Renew",              usd: 17.95,  time: "1-10 min" },
      { name: "RTC Tool — 12 Months Digital License Active/Renew",             usd: 31.39,  time: "24 hrs" },
    ]
  },

  {
    cat: "360 Tool",
    tag: "tag-tools",
    icon: "3T",
    img: "https://360tool.net/wp-content/uploads/2022/09/360-tool-logo.png",
    services: [
      { name: "360 Tool — 3 Months",                                           usd: 12,    time: "1-30 min" },
      { name: "360 Tool — 6 Months",                                           usd: 16,    time: "1-30 min" },
      { name: "360 Tool — 12 Months",                                          usd: 25,    time: "1-30 min" },
    ]
  },

  {
    cat: "TSM Tool Pro",
    tag: "tag-tools",
    icon: "TS",
    img: "https://tsmtoolpro.com/wp-content/uploads/2022/07/tsm-tool-pro-logo.png",
    services: [
      { name: "TSM Tool Pro — 3 Months",                                       usd: 12.7,  time: "1-3 hrs" },
      { name: "TSM Tool Pro — 6 Months",                                       usd: 22.5,  time: "1-3 hrs" },
    ]
  },

  {
    cat: "TFM Tool Pro",
    tag: "tag-tools",
    icon: "TF",
    img: "https://tfmtoolpro.com/wp-content/uploads/2022/08/tfm-tool-pro-logo.png",
    services: [
      { name: "TFM Tool Pro — 3 Months Activation",                            usd: 18.5,  time: "1-10 min" },
    ]
  },

  {
    cat: "Mobile Sea Tool (MST)",
    tag: "tag-tools",
    icon: "MS",
    img: "https://mobileseatool.com/wp-content/uploads/2021/09/mst-logo.png",
    services: [
      { name: "MobileSea Tool — 3 Months Activation",                          usd: 9.2,   time: "1-10 min" },
      { name: "MobileSea Tool — 6 Months Activation",                          usd: 14.2,  time: "1-10 min" },
      { name: "MobileSea Tool — 12 Months Activation",                         usd: 16.1,  time: "1-10 min" },
    ]
  },

  {
    cat: "FD Tool Pro",
    tag: "tag-tools",
    icon: "FD",
    img: "https://fdtoolpro.com/wp-content/uploads/2023/01/fd-tool-pro-logo.png",
    services: [
      { name: "FD Tool Pro — 3 Months Activation",                             usd: 8.652,  time: "1-10 min" },
      { name: "FD Tool Pro — 6 Months Activation",                             usd: 12.875, time: "1-10 min" },
      { name: "FD Tool Pro — 12 Months Activation",                            usd: 26.78,  time: "1-10 min" },
    ]
  },

  {
    cat: "SRS Tool",
    tag: "tag-tools",
    icon: "SR",
    img: "https://srsauth.com/wp-content/uploads/2022/10/srs-tool-logo.png",
    services: [
      { name: "SRS Auth Tool — 6 Months License Activation/Renew",             usd: 20.755, time: "1-10 min" },
      { name: "SRS Auth Tool — 12 Months License Activation/Renew",            usd: 25.905, time: "1-10 min" },
    ]
  },

  {
    cat: "Scorpion Tool",
    tag: "tag-tools",
    icon: "SC",
    img: "https://scorpiontool.net/wp-content/uploads/2022/07/scorpion-tool-logo.png",
    services: [
      { name: "Scorpion Tool — 6 Months Basic Activation",                     usd: 12.154, time: "1-10 min" },
    ]
  },

  {
    cat: "Sigma Plus",
    tag: "tag-tools",
    icon: "SI",
    img: "https://sigma-mt.com/wp-content/uploads/2022/01/sigma-plus-logo.png",
    services: [
      { name: "Sigma Plus — 6 Months Activation",                              usd: 41.2,   time: "1-10 min" },
      { name: "Sigma Plus — 1 Month Digital License",                          usd: 32.96,  time: "1-10 min" },
      { name: "Sigma Plus — 3 Months Digital License",                         usd: 58.195, time: "1-10 min" },
    ]
  },

  {
    cat: "Hydra Tool",
    tag: "tag-tools",
    icon: "HY",
    img: "https://hydradongle.com/wp-content/uploads/2022/03/hydra-tool-logo.png",
    services: [
      { name: "Hydra Online — 3 Months (Sin Dongle)",                          usd: 17.05,  time: "1-10 min" },
      { name: "Hydra Online — 6 Months (Sin Dongle)",                          usd: 24.69,  time: "1-10 min" },
      { name: "Hydra Online — 12 Months (Sin Dongle)",                         usd: 40.69,  time: "1-10 min" },
    ]
  },

  {
    cat: "Ameer Tool (Hardware)",
    tag: "tag-tools",
    icon: "AM",
    img: "https://ameertool.com/wp-content/uploads/2022/11/ameer-tool-logo.png",
    services: [
      { name: "Ameer Tool Hardware — 3 Months Activation",                     usd: 21.95,  time: "1-10 min" },
      { name: "Ameer Tool Hardware — 6 Months Activation",                     usd: 29.99,  time: "1-10 min" },
    ]
  },

  {
    cat: "BMT Tool",
    tag: "tag-tools",
    icon: "BM",
    img: "https://bmttool.com/wp-content/uploads/2022/08/bmt-pro-logo.png",
    services: [
      { name: "BMT Pro Apple & Android — 12 Months Activation",                usd: 42.23,  time: "1-10 min" },
    ]
  },

  {
    cat: "Pragmafix",
    tag: "tag-tools",
    icon: "PR",
    img: "https://pragmafix.com/wp-content/uploads/2022/05/pragmafix-logo.png",
    services: [
      { name: "Pragmafix — 6 Months Activation",                               usd: 5.768,  time: "1-10 min" },
    ]
  },

  {
    cat: "Mobile 1 Tech Hardware",
    tag: "tag-tools",
    icon: "M1",
    img: "https://mobile1tech.com/wp-content/uploads/2022/10/mobile1tech-logo.png",
    services: [
      { name: "Mobile1tech — Silver 9 Months 1 Device",                        usd: 16.979, time: "1-10 min" },
      { name: "Mobile1tech — Gold 18 Months 2 Device",                         usd: 30,     time: "1-10 min" },
      { name: "Mobile1tech — VIP 15 Months 3 Device",                          usd: 43,     time: "1-10 min" },
      { name: "Mobile1tech — Business 15 Months 3 Device + Whatsapp Support",  usd: 73,     time: "1-10 min" },
    ]
  },

  {
    cat: "Apizu Tool",
    tag: "tag-tools",
    icon: "AP",
    img: "https://apizutool.com/wp-content/uploads/2022/12/apizu-tool-logo.png",
    services: [
      { name: "Apizu Tool — 3 Months Activation",                              unavailable: true, time: "1-10 min" },
      { name: "Apizu Tool — 6 Months Activation",                              unavailable: true, time: "1-10 min" },
      { name: "Apizu Tool — 12 Months Activation",                             unavailable: true, time: "1-10 min" },
    ]
  },

  {
    cat: "Tera Tool",
    tag: "tag-tools",
    icon: "TE",
    img: "https://teratool.net/wp-content/uploads/2022/11/tera-tool-logo.png",
    services: [
      { name: "Tera Tool — 3 Months Activation",                               unavailable: true, time: "1-10 min" },
      { name: "Tera Tool — 6 Months Activation",                               unavailable: true, time: "1-10 min" },
    ]
  },

];
