// const sharp = require('sharp');


const app = require('express')();
const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');

app.set('trust proxy', true);
const PORT = process.env.PORT || 3000;
const logFilePath = path.join(__dirname, 'access.lo');
app.use((req, res, next) => {
    const now = new Date();
    log = `${now.toISOString()} - IP: ${req.ip}, Requested File  ${req.path}`;
    fs.appendFile(logFilePath, log + "\n", (err) => {
        if (err) {
            console.error("Error writing log to file", err);
        }
        next();
    }


    )
});
app.get('/', (req, res) => {
    res.send('Hello visitor');
});
app.get('/image/:filename.png', (req, res) => {
    const width = 1;
    const height = 1;

    new Jimp(width, height, 0x00000000, (err, image) => {
        if (err) throw err;
        image.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
            if (err) throw err;
            res.set('Content-Type', Jimp.MIME_PNG);
            res.send(buffer);
        });
    });
});
app.listen
app.listen(PORT, () => {
    console.log('Server started ');

});;
// });