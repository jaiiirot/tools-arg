import nodemailer from 'nodemailer';
import { SITE_CONFIG } from '../config/site.config';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendSystemNotification = async (to: string, serviceName: string) => {
  const mailOptions = {
    from: `"${SITE_CONFIG.author}" <${process.env.SMTP_USER}>`,
    to,
    subject: `[SYSTEM_LOG] > Confirmación de solicitud: ${serviceName}`,
    text: `STATUS: PENDING\n\nSistema automatizado:\nSe ha recibido el comprobante para la ejecución de: ${serviceName}.\nEl proceso entrará en cola de administración.\n\n-- ${SITE_CONFIG.author}`
  };

  return transporter.sendMail(mailOptions);
};

// NUEVA FUNCIÓN: Notificación de Cambio de Estado
export const sendStatusNotification = async (to: string, serviceName: string, status: 'APPROVED' | 'REJECTED') => {
  const isApproved = status === 'APPROVED';
  
  const mailOptions = {
    from: `"${SITE_CONFIG.author}" <${process.env.SMTP_USER}>`,
    to,
    subject: `[STATUS_UPDATE] Orden ${isApproved ? 'APROBADA' : 'RECHAZADA'}: ${serviceName}`,
    text: `> SYSTEM NOTIFICATION\n\nEl administrador ha procesado su orden para el servicio: ${serviceName}.\n\nNUEVO ESTADO: [ ${status} ]\n\n${isApproved ? 'El servicio se encuentra en ejecución y pronto será completado.' : 'El comprobante ha sido rechazado. Por favor, contacte a soporte.'}\n\n-- ${SITE_CONFIG.author}`
  };

  return transporter.sendMail(mailOptions);
};