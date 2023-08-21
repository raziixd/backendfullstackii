import cors from 'cors';
import express from 'express';
import rotaUsuario from './Rotas/rotaUsuario.js'

const app = express();

app.use(cors({ origin: '*' }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/usuarios', rotaUsuario);


app.listen(4019, 'localhost', () => {
    console.log("API rodando em: http://localhost:4019/usuarios")
})
