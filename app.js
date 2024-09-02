const app = require('express')();
const { put } = require('@vercel/blob');
const Jimp = require('jimp');
const path = require('path');

app.set('trust proxy', true);
const PORT = process.env.PORT || 3000;

app.use(async (req, res, next) => {
    const now = new Date();
    const imageName = path.parse(req.path).name;

    const ip = req.ip;
    const log = `${now.toISOString()} - ${imageName} - IP: ${ip}`;
    try {
        await put(`gmail/${imageName}.txt`, log, {
            access: 'public',
            addRandomSuffix: false,
        });
    } catch (error) {
        console.error("Error writing log to Vercel Blob:", error);
    }
    next();
});


app.get('/', (req, res) => {
    res.send('Hello');
});

app.get('/image/:filename.png', (req, res) => {
    const width = 1;
    const height = 1;

    new Jimp(width, height, 0x00000000, (err, image) => {
        if (err) {
            console.error("Error creating image:", err);
            return res.status(500).send("Error creating image");
        }
        image.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
            if (err) {
                console.error("Error getting image buffer:", err);
                return res.status(500).send("Error processing image");
            }
            res.set('Content-Type', 'image/png');
            res.send(buffer);
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
