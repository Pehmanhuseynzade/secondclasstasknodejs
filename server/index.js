const express = require('express')
const app = express()
let PORT = 7070
const crypto = require(`crypto`)
const dotenv = require("dotenv");
var cors = require('cors')
const mongoose = require('mongoose');
app.use(cors())
const bodyParser = require('body-parser')
app.use(bodyParser.json())
dotenv.config();


const northData = new mongoose.Schema({
  companyName: String // String is shorthand for {type: String}
  // contactName: String,
  // contactTitle: String,
});

const northModel = new mongoose.model("north", northData);



//BASE API URL
app.get('/api', (req, res) => {
     res.send('Hello World!')
   })
 
 //GET CARS
 
//  app.get("/api/suppliers", (req, res) => {
//      const { companyName } = req.query;
//      if (!companyName) {
//        res.status(200).send(northData);
//      } else {
//        const filteredData = northData.filter((x) =>
//          x.companyName.toLowerCase().trim().includes(companyName.toLowerCase().trim())
//        );
//        res.status(200).send(filteredData);
//      }
//    });

app.get("/api/suppliers", async (req, res) => {
  const { companyName } = req.query;
  const artists = await northModel.find();
 
    res.status(200).send(artists);

});
 //GetById
 
//  app.get(`/api/suppliers/:id`,(req,res)=>{
//      const id = req.params.id
//      const supplier = northData.find((x)=>x.id==id)
//      //res.send(product)
//      if(supplier===undefined){
//          //status vermesek de default olaraq 404 dur
//          res.send({
//              message:"Data not found | Error 404"
//          })
//      }
//      else{
//          res.status(200).send(supplier);
//      }
//  })
 

app.get("/api/suppliers/:id", async(req, res) => {
  const { id } = req.params;
  const artist = await northModel.findById(id)
  res.status(200).send(artist);
});

 //POST CARS
 
 app.post(`/api/suppliers`,(req,res)=>{
     const { companyName, contactName,contactTitle} = req.body;
     const newSuppliers =   new northModel({
      companyName: companyName
     })
    //  northData.push(newSuppliers);
     res.status(201).send({
       message: "product created successfully!",
       data: newSuppliers,
     });
 })
 
//  //DELETE
 
 app.delete("/api/suppliers/:id", (req, res) => {
     const id = req.params.id;
     const deletingSuppliers = northData.find((x) => x.id == id);
     let idx = northData.indexOf(deletingSuppliers);
     northData.splice(idx, 1);
     if (deletingSuppliers === undefined) {
       res.status(204).send("product not found!");
     } else {
       res.status(203).send({
         message: "product deleted successfully!",
       });
     }
   });
 
 
//    //UPDATE CARS
 
   app.put(`/api/suppliers/:id`,(req,res)=>{
     const id = req.params.id
     const {companyName, contactName,contactTitle} = req.body
     let updateSupliers = northData.find((x)=>x.id==id)
     if(companyName){
          updateSupliers.companyName = companyName
     }
     if(contactName){
          updateSupliers.contactName = contactName
     }
     if(contactTitle){
          updateSupliers.contactTitle = contactTitle
     }
     res.send({
         message:"Update is succesfully!"
     })
   })
 
   PORT = process.env.PORT;
   app.listen(PORT, () => {
     console.log(`App running on PORT: ${PORT}`);
   });

  //  mongoose.connect('mongodb+srv://pehman_admin:Pendir123@pehman.kek6ut2.mongodb.net/?retryWrites=true&w=majority').then(()=>{
  //   console.log("Mongo DB CONNETCTED")

  //  })

DB_PASSWORD = process.env.DB_PASSWORD;
DB_CONNECTION = process.env.DB_CONNECTION;

mongoose.connect(DB_CONNECTION.replace("<password>", DB_PASSWORD)).then(() => {
  console.log("Mongo DB connected!");
});

 
//  app.listen(PORT, () => {
//      console.log(`Example app listening on port ${PORT}`)
//    })