
const handleProfile = (req, res, database) => {
    //params é o que é passado ai encima no path, no caso ":id"
    const { id } = req.params; //como só tem um paramentro não tem problema mas podia ser req.params.id ou req.params[0]
    //seguindo a documentação do KNEX
    database.select('*').from('users').where({
        id: id
    })
        .then(user => {
            //se não houver user, retorna um [] vazio
            //imprime no servidor
            //se não for vazio o array CONDIÇÃO DEBAIXO
            if(user.length){
                res.json(user[0]);
            } else {
                res.status(400).json('Not Found');   
            }
        })
        .catch(err => res.status(400).json('Error Found User'));
};

module.exports = {
    handleProfile //ES6 não precisa do valor se tiver mesmo nome
}