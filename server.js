const express = require('express')
const MongoClient = require('mongodb').MongoClient;


const app = express()
const PORT = 3000
const uri = "mongodb+srv://ray:1998@cluster0.ho33k.mongodb.net/Sitboard?retryWrites=true&w=majority";
//const uri = "mongodb://ray:1998@cluster0-shard-00-00.ho33k.mongodb.net:27017,cluster0-shard-00-01.ho33k.mongodb.net:27017,cluster0-shard-00-02.ho33k.mongodb.net:27017/Sitboard?ssl=true&replicaSet=atlas-k8w5gq-shard-0&authSource=admin&retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
app.use(express.static('public'))
//an endpoint to insert data into database
app.get('/insert', (req, res) => {
    let message = req.query.message
    insertMessage(message)
    res.send('message inserted to the database')
})

app.get('/message', (req, res) => {
    retrieveMessages(res)


})


let messageCollection
//function to connect with the database
const openConnection = () => {
    client.connect(err => {
        messageCollection = client.db("Sitboard").collection("messages");
        //message.insert({message:'Hello'})
        if (messageCollection) {
            console.log('connected to the database');
        }

    })
}
//function to insert the message 
const insertMessage = (message) => {
    messageCollection.insertOne({
        message: message
    })
    console.log('insert finished');

}
const retrieveMessages = (res) => {
    messageCollection.find({}).toArray(function (err, result) {
        if (err) throw err
        console.log(result);
        res.send(result)
    })
}
//connect to the database
openConnection()
//insert message after connected with the database
// setTimeout(()=>(
//     insertMessage('aaa')
// ),2000)





app.listen(PORT, () => {
    console.log('server started on port 3000');
})