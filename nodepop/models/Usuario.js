const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//const emailTransportConfigure = require('../lib/emailTransportConfigure');
//const nodemailer = require('nodemailer');
//const { Requester } = require('cote');

//const requester = new Requester({ name: 'nodeapp-email' });

// crear esquema
const usuarioSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
})

// método estático
usuarioSchema.statics.hashPassword = function(passwordEnClaro) {
  return bcrypt.hash(passwordEnClaro, 7)
}

// método de instancia
usuarioSchema.methods.comparePassword = function(passwordEnClaro) {
  return bcrypt.compare(passwordEnClaro, this.password);
}

/**
usuarioSchema.methods.enviarEmail = async function(asunto, cuerpo) {
  // crear transport
  const transport = await emailTransportConfigure();
  
  // enviar email
  const result = await transport.sendMail({
    from: process.env.EMAIL_SERVICE_FROM,
    to: this.email,
    subject: asunto,
    html: cuerpo,
  });
  
  console.log(`Email enviado: ${result.messageId}`);
  
  console.log(`URL de previsualización: ${nodemailer.getTestMessageUrl(result)}`);
  
  return result;
}

usuarioSchema.methods.enviarEmailConMicroServicio = async function(asunto, cuerpo) {
  
  // enviar email
  const evento = {
    type: 'enviar-email',
    from: process.env.EMAIL_SERVICE_FROM,
    to: this.email,
    subject: asunto,
    html: cuerpo,
  };
  
  return new Promise(resolve => requester.send(evento, resolve));
}
*/

// crear el modelo
const Usuario = mongoose.model('Usuario', usuarioSchema);

// exportar el modelo
module.exports = Usuario;