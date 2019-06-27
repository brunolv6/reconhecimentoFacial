
const handleRegister = (req, res, database, bcrypt) => {
    const {name, email, password} = req.body;
    if(!email || !name || !password){
        //OBRIGADO COLOCAR O RETURN assim o resto não roda!
        return res.status(400).json('incorrect form submission')
    }
    const hash = bcrypt.hashSync(password, 10);
    //adiciona user na nossa banco de dados usando KNEX
    //quando há mais de uma adição a fazer no BD, usamos TRANSACTION
    //TRX passa a referenciar meu DB
       database.transaction(trx => {
            //insere hash e email na tabela login!!!
            trx.insert({
                hash: hash,
                email: email
            })
            //adiciona acima embaixo, só outra forma de fazer inserções em tabelas
            .into('login')
            //retorna email depois da inserção
            .returning('email')
            //então com o email que agora chamamos de loginEmail
            .then(loginEmail => {
                //retornamos OUTRA TRANSACTION DESTA VEZ NA TABELA USERS
                return trx('users')
                    //e retornaremos após a inserção TODO o USER
                    .returning('*')
                    //aqui especifica o que esta sendo inserido
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date()
                    })
                    //e por fim enviamos uma resposta ao requerimento feito pelo browser
                    .then(user => {
                        res.json(user[0]); //pegará o objeto usuário único
                    })
            })
            //fazemos o commit para garantir a inserção
            .then(trx.commit)
            //e por fim rodamos as mudanças
            .then(trx.rollback)
        })
        .catch(err => res.status(400).json('unable to register')); //catch erro e envia esta mensagem
};

module.exports = {
    handleRegister: handleRegister
};