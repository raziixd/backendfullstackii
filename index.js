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


const hostname = "0.0.0.0";
const porta = "4019";

// app.listen(porta, hostname, () => {
  //     console.log(`API rodando em: https://${hostname}:${porta}/doacao`)
  // })

app.listen(porta, hostname, () => {
    console.log(`API rodando em: https://${hostname}:${porta}`)
})


//LOCAL
// app.listen(3007, "localhost", () => {
//   console.log("API escutando no link: http://localhost:3007/usuarios");
// });