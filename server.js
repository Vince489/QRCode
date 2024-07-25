const express = require('express');
const QRCode = require('qrcode');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    QRCode.toDataURL(fileUrl, (err, url) => {
        if (err) {
            res.status(500).json({ error: 'Failed to generate QR code' });
        } else {
            res.json({ src: url });
        }
    });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
