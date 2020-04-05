const router = require('express').Router();
const axios = require('axios');

const {requestStyleImage, writeFile, getImage} = require('../_helper/_helper.js');

router.get('/meta', (req, res, next) => {
    // axios.get("http://PUBLIC_IP:PORT")
    // axios.get("http://173.193.99.35:32491/model/metadata")
    axios.get("http://0.0.0.0:5000/model/metadata")
        .then(response => {
            res.status(200).send(response.data)
        })
        .catch(err => next(err));
})

router.post('/predict', async (req, res) => {
    await writeFile(req.body.data)
    const imageFd = await getImage()
    const styleType = req.body.styleType
    try {
        const styleImage = await requestStyleImage(imageFd, styleType)
        res.status(200).send(styleImage)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router
