import cors from 'cors';
import express from 'express';
import rotaUsuario from './Rotas/rotaUsuario.js'
import rotaDoacao from './Rotas/rotaDoacao.js';
import rotaMaterial from './Rotas/rotaMaterial.js'



const app = express();

app.use(cors({ origin: '*' }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/doacao', rotaDoacao);

app.use('/usuarios', rotaUsuario);

app.use('/material', rotaMaterial);


const hostname = "localhost";
const porta = "4019";

app.listen(porta, hostname, () => {
      console.log(`API rodando em: https://${hostname}:${porta}/doacao`)  })

// app.listen(porta, hostname, () => {
//     console.log(`API rodando em: https://${hostname}:${porta}/usuarios`)
// })
// app.listen(porta, hostname, () => {
//     console.log(`API rodando em: https://${hostname}:${porta}/material`)
// })



//LOCAL
// app.listen(3007, "localhost", () => {
//   console.log("API escutando no link: http://localhost:3007/usuarios");
// });
// app.listen(3008, "localhost", () => {
//   console.log("API escutando no link: http://localhost:3008/doacao");
// });
// app.listen(3009, "localhost", () => {
//   console.log("API escutando no link: http://localhost:3009/material");
// });