//importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import cors from "cors";
import * as dotenv from 'dotenv' 
dotenv.config()

// app config
const app=express();

const port=process.env.PORT || 9000;

const db=mongoose.connection;

db.once("open",()=>{
    console.log('DB connected!!')

    const msgCollection=db.collection("messagecontents");
    const changeStream=msgCollection.watch();

    changeStream.on("change",(change)=>{
        console.log(change);

        if(change.operationType==='insert'){
            const messageDetails=change.fullDocument;
            pusher.trigger("messages","inserted",{
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp:messageDetails.timestamp,
                received:messageDetails.received,
            });
        }else{
            console.log("error in trigerring Pusher");
        }
    });

   


});


const pusher = new Pusher({
  appId: "1544887",
  key: "7335617ed0f2cc1af1c1",
  secret: "86ef8c7bf18f70b7221a",
  cluster: "ap2", 
  useTLS: true
});


// middlewares
app.use(express.json());

app.use(cors());


// Db config
const connection_url=process.env.DATABASE_URL
mongoose.set('strictQuery', false)
mongoose.connect(connection_url, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
})




// ???

//api routes
app.get('/',(req,res)=>{
    res.status(200).send('hello kapil')
})

app.get('/messages/sync',(req,res)=>{
   
    Messages.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    })
});

app.post('/messages/new',(req,res)=>{
    const dbMessage=req.body;

    Messages.create(dbMessage,(err,data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })

})

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../whatsapp-mern/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../whatsapp-mern/build"));
  });
}

//listen
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})