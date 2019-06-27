const Clarifai = require('clarifai');

//trouxemos para ca pra não aparecer nossa chave no network de resposta do requerimento
const app = new Clarifai.App({
    apiKey: 'key'
});

const handleApiCall = (req, res) => {
    app.models
    .predict('key', req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, database) => {
    //receber a id da onde estou e modificar a entrada dela
    const { id } = req.body;
    database('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0])
        })
        .catch(err => res.status(400).json('unable to get entries'));
};

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}