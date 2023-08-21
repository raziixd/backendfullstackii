import cors from 'cors';
import express from 'express';
import rotaUsuario from './Rotas/rotaUsuario.js'


const hostname = "0.0.0.0";
const porta = "4019";

const app = express();

app.use(cors({ origin: '*' }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/usuarios', rotaUsuario);


app.listen(porta, hostname, () => {
    console.log(`API rodando em: https://${hostname}:${porta}/usuarios`)
})
