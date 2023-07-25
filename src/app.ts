import express, { Router } from "express";
import bodyParser from 'body-parser';
import AWS from 'aws-sdk';
import multer from 'multer';
import dotenv from 'dotenv';
dotenv.config();
require('aws-sdk/lib/maintenance_mode_message').suppress = true;
const upload = multer();
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

AWS.config.update({
  accessKeyId,
  secretAccessKey,
})

console.log(accessKeyId, secretAccessKey)

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = Router();

routes.get('/checkhealth', (req, res) => res.status(200).send('All working!'))

routes.post('/', upload.single('image'), async (req, res) => {
  try {
    const file = req.file
    const s3 = new AWS.S3();
    if (file) {
      await s3.upload({
        Bucket: 'caio-teste33',
        Key: file.originalname,
        Body: file.buffer,
      }).promise();
      res.status(200).json({ message: 'SHOW SHOW SHOW!'})
    }
  } catch (error) {
    res.status(500).json({ message: `Vish olha isso: ${error}`})
  }
})


app.use(routes);

app.listen(9999, () => console.log('Server is running on PORT: 9999'));