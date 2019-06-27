const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');

const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const image = require('./controllers/image.js');
const profile = require('./controllers/profile.js');

//conectando server a database
const database = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'key',
        database: 'smartbrain'
    }
})

// !!!!
/* const cors = require('cors'); não foi necessário VERIFICAR!!!*/
//!!!

/* Gera (promete) um query que retornará como dado, eai imprimo este dado (não precisa passar pelo JSON, porque não é o browser que lerá)
    database.select('*').from('users').then(data => {
    console.log(data);
}); */

const app = express();

//middleware que transforma em json
app.use(bodyParser.json());
//middleware que permite acesso do navegador a este servidor
app.use(cors());

//Pegar (ou retorna ou GET) se o servidor está ligado, funcionando
app.get('/', (req, res) => {res.json('Esta funcionando!');});

//Pegar (GET) profile do banco de dados
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, database)});

//Registrar (PUT) um novo user
//dependency injection é os parametros da funcao hadleRegister
app.put('/register', (req, res) => {register.handleRegister(req, res, database, bcrypt)});

//SignIn (POST) vou enviar info. pro servidor para mudar meu status de entrada (singIn)
//!!!outra opcao avancada onde REQ e RES ficam implícitos, OLHAR MUDANCA NO SIGNIN.JS TAMBEM!!!
app.post('/signin', signin.handleSignin(database, bcrypt));

//Image (POST) modificar número de entradas no faceRecognition
app.post('/image', (req, res) => {image.handleImage(req, res, database)});

//usar API no back
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});

app.listen(3000);

