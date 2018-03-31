const Clarifai = require('clarifai')

const clarifaiApp = new Clarifai.App({
  apiKey: 'c3e1b61fa097440abb82b4a00348c058'
});

const handleApiCall = (req, res) => {
  clarifaiApp.models.predict(
    Clarifai.FACE_DETECT_MODEL,
    req.body.input)
    .then(data => {
      res.json(data)
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
  const { id } = req.body
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0])
    })
    .catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall
}