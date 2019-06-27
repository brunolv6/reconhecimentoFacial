
//mudança para CURRY!
const handleSignin = (database, bcrypt) => (req, res) => {
    const { email, password } = req.body;
    //podemos fazer outras coisas de verificação aqui
    if(!email || !password){
        return res.status(400).json('incorrect form submission')
    }
    database.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash); 
            if(isValid){
                return database.select('*').from('users')
                        .where('email', '=', email)
                        .then(user => {
                            res.json(user[0]);
                        })
                        .catch(err => res.status(400).json('unable to get user'));
            } else {
                //preciso dar uma resposta ao browser, senão não finalizará o requisito
                res.status(400).json('wrong credentials')
            }
    })
    .catch(err => res.status(400).json('wrong credentials'));
};

module.exports = {
    handleSignin: handleSignin 
};