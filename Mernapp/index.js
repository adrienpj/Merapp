//index.js correspond à notre serveur express

//importation de la librairie express
const express = require('express')
//Instanciation de l'objet Express
const app = express()
//const products = require('./Product.json')

//Importation MogoClient et la connexion à notre Base de Données
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'MernAppDB';
let db

//mongodb url : mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false

MongoClient.connect(url, function(err, client) {
  console.log("Connexion avec succès à la base de données");
  db = client.db(dbName);
});


app.use(express.json())

//récupération de données
app.get('/', async (req,res) => {
    try {
        const docs = await db.collection('product').find({}).toArray()
        res.status(200).json(docs)
    } catch (err) {
        console.log(err)
        throw err
    }
})

//récupération d'un seul élément 
app.get('/:id', async (req,res) => {
    const id = parseInt(req.params.id)
    try {
        const docs = await db.collection('product').findOne({id})
        res.status(200).json(docs)
    } catch (err) {
        console.log(err)
        throw err
    }
})

//récupération de données
app.post('/', async (req,res) => {
    try {
        const parkingData = req.body
        const p = await db.collection('product').insertOne(productData)
        res.status(200).json(product)
    } catch (err) {
        console.log(err)
        throw err
    }
    
})

//modification d'un produit
app.put('/:id', async (req,res) => {
    try {
        const id = parseInt(req.params.id)
        const replacementProduct = req.body
        const product = await db.collection('product').replaceOne({id},replacementProduct)
        res.status(200).json(product)
    } catch (err) {
        console.log(err)
        throw err
    }
})

//suppression d'un élément de la ressource grâce à notre Node JS API
app.delete('/:id', async (req,res) => {
    try {
        const id = parseInt(req.params.id)
        const product = await db.collection('product').deleteOne({id})
        res.status(200).json(product)
    } catch (err) {
        console.log(err)
        throw err
    } 
})

app.patch('/:id', async (req,res) => {
    try {
        const id = parseInt(req.params.id)
        const replacementProduct = req.body
        const product = await db.collection('product').updateOne({id}, {$set: replacementProduct}, {upsert:true})
        res.status(200).json(product)
    } catch (err) {
        console.log(err)
        throw err
    } 
})


//spécification d'un port dans notre cas 8080
app.listen(8080, () => {
    console.log("Serveur fonctionne")
  })


