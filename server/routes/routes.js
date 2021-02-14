const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
// const config = require('./config');
// const { Router } = require('express');
// const express = require('express');
// const app = express();
// const router = Router();

// app.set('llave', config.llave);

// router.get('/', function (req, res) {
//   res.json({ usuario: 'pedrito' });
// });

// router.post('/autenticar', (req, res) => {
//   if (req.body.email === 'juanescifuentes75@gmail.com' && req.body.password === '12345') {
//     const payload = {
//       check: true,
//     };
//     const token = jwt.sign(payload, app.get('llave'), {
//       expiresIn: 1440,
//     });
//     res.json({
//       mensaje: 'Autenticación correcta',
//       token: token,
//     });
//   } else {
//     res.status(500).json({ mensaje: 'Usuario o contraseña incorrectos' });
//   }
// });

// const rutasProtegidas = express.Router();
// rutasProtegidas.use((req, res, next) => {
//   const token = req.headers['access-token'];

//   if (token) {
//     jwt.verify(token, app.get('llave'), (err, decoded) => {
//       if (err) {
//         return res.json({ mensaje: 'Token inválida' });
//       } else {
//         req.decoded = decoded;
//         next();
//       }
//     });
//   } else {
//     res.send({
//       mensaje: 'Token no proveída.',
//     });
//   }
// });

// router.get('/datos', rutasProtegidas, (req, res) => {
//   const datos = [
//     { id: 1, nombre: 'Asfo' },
//     { id: 2, nombre: 'Denisse' },
//     { id: 3, nombre: 'Carlos' },
//   ];

//   res.json();
// });

// module.exports = router;
