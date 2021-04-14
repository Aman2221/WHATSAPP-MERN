import express from 'express'
import mongoose from 'mongoose'
import Meassages from './dbMeassages.js';
import Pusher from 'pusher'
import cors from 'cors'

const port = process.env.PORT || 9000;
const app = express()
const pusher = new Pusher({
  appId: "1160704",
  key: "6729decb25fa19b8f6ad",
  secret: "21b2741d0896ff4de5a1",
  cluster: "ap2",
  useTLS: true
});

pusher.trigger("my-channel", "my-event", {
  message: "hello Aman"
});

app.use(express.json());

app.use(cors())

const connection_URL = 'mongodb+srv://aman:as562770@cluster0.umgs7.mongodb.net/whatsapp-mern?retryWrites=true&w=majority';

mongoose.connect(connection_URL,{
    useCreateIndex : true,
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(() => console.log( 'Database Connected' ))
  .catch(err => console.log( err ));

const db = mongoose.connection

db.once('open', () => {

    const msgCollection = db.collection('messagecontents')
    const changeStream = msgCollection.watch();

    changeStream.on('change',(change) => {
        console.log("Modified Database");
        if (change.operationType === 'insert') {
            const messageDetail = change.fullDocument;
            pusher.trigger('messages', "inserted", {
                name : messageDetail.name,
                message: messageDetail.message,
                timestamp : messageDetail.timestamp
            });
            }
            else{
                console.log('Error while triggering pusher');
            }
    })
}).then(() => {
    console.log('connected to database')
}).catch((error) => console.log(error))

app.get('/',(req,res) => res.status(200).send('Hello Aman'))

app.get('/messages/sync', (req,res) => {
    Meassages.find((err, data) => {
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send(data);
        }
    })
})

app.post('/messages/new', (req,res) => {
    const dbMessage = req.body;

    Meassages.create(dbMessage, (err,data) => {
        if(err){
            res.status(500).send(err)
        }
        else {
            res.status(201).send(data)
        }
    })
})

app.listen(port,() => console.log(`Listning on port : ${port}`));