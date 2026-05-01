import nodemailer from 'nodemailer';
import { SITE_CONFIG } from '../config/site.config';

// Extraemos las variables usando import.meta.env (nativo de Astro/Vite)
const smtpUser = import.meta.env.SMTP_USER;
const smtpPass = import.meta.env.SMTP_PASS;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: smtpUser,
    pass: smtpPass
  }
});

// Notificación de Acuse de Recibo (Usuario Comprador)
export const sendSystemNotification = async (to: string, serviceName: string) => {
  if (!smtpUser || !smtpPass) {
    throw new Error('Credenciales SMTP no configuradas en .env');
  }

  const mailOptions = {
    from: `"${SITE_CONFIG.author}" <${smtpUser}>`,
    to,
    subject: `[SYSTEM_LOG] > Confirmación de solicitud: ${serviceName}`,
    text: `STATUS: PENDING\n\nSistema automatizado:\nSe ha recibido el comprobante para la ejecución de: ${serviceName}.\nEl proceso entrará en cola de administración.\n\n-- ${SITE_CONFIG.author}`
  };

  return transporter.sendMail(mailOptions);
};

// Notificación de Cambio de Estado (Admin -> Usuario)
export const sendStatusNotification = async (to: string, serviceName: string, status: 'APPROVED' | 'REJECTED') => {
  if (!smtpUser || !smtpPass) {
    throw new Error('Credenciales SMTP no configuradas en .env');
  }

  const isApproved = status === 'APPROVED';
  
  const mailOptions = {
    from: `"${SITE_CONFIG.author}" <${smtpUser}>`,
    to,
    subject: `[STATUS_UPDATE] Orden ${isApproved ? 'APROBADA' : 'RECHAZADA'}: ${serviceName}`,
    text: `> SYSTEM NOTIFICATION\n\nEl administrador ha procesado su orden para el servicio: ${serviceName}.\n\nNUEVO ESTADO: [ ${status} ]\n\n${isApproved ? 'El servicio se encuentra en ejecución y pronto será completado.' : 'El comprobante ha sido rechazado. Por favor, contacte a soporte.'}\n\n-- ${SITE_CONFIG.author}`
  };

  return transporter.sendMail(mailOptions);
};