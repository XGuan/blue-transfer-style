const axios = require('axios');
const FormData = require('form-data');

const requestStyleImage = (fd, styleType) => {

    // return axios.post("http://173.193.99.35:32491/model/predict?model=" + styleType, fd, {
    return axios.post("http://0.0.0.0:5000/model/predict?model=" + styleType, fd, {
        headers: fd.getHeaders(),
        responseType: "arraybuffer"
    })
        .then(response => {
            //     // fix the buffer since it is deprecated
            let buff = new Buffer(response.data, 'base64');
            let base64data = buff.toString('base64');
            return base64data
        })
        .catch(err => {
            console.log("request style image error: ", err);
            // res.status(400).send(err)
            return err
        })
}

function writeFile(data) {
    return new Promise((resolve, reject) => {
        require("fs").writeFile("./img/captured_image.png", data, 'base64', (err) => {
            if (err) {
                return reject(err)
            }
            return resolve()
        })
    })
}

function getImage() {
    return new Promise((resolve, reject) => {
        let fd = new FormData();

        const profileImage = require('fs').createReadStream('./img/captured_image.png', (err) => {
            if (err) {
                return reject(err)
            }
        })
        fd.append("image", profileImage)
        return resolve(fd);
    }
    )
}

module.exports = {
    requestStyleImage,
    writeFile,
    getImage
};