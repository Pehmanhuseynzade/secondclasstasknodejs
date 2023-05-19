const express = require('express')
const app = express()
const PORT = 7070
const crypto = require(`crypto`)
var cors = require('cors')
app.use(cors())
const bodyParser = require('body-parser')
app.use(bodyParser.json())

northData = [
     {
          "id": 5,
          "companyName": "Cooperativa de Quesos 'Las Cabras'ddddd",
          "contactName": "Antonio del Valle Saavedra",
          "contactTitle": "Antonio del Valle Saavedra"
          },
          {
          "id": 6,
          "companyName": "Mayumi's",
          "contactName": "Mayumi Ohno",
          "contactTitle": "Marketing Representative",
          },
          {
               "id": 1,
               "companyName": "Pehman",
               "contactName": "salaaam",
               "contactTitle": "Instagram",
          },
          {
               "id": 53,
               "companyName": "Cooperativa de Quesos 'Las Cabras'ddddd",
               "contactName": "Antonio del Valle Saavedra",
               "contactTitle": "Antonio del Valle Saavedra"
               },
               {
               "id": 64,
               "companyName": "Mayumi's",
               "contactName": "Mayumi Ohno",
               "contactTitle": "Marketing Representative",
               },
               {
                    "id": 11,
                    "companyName": "Pehman",
                    "contactName": "salaaam",
                    "contactTitle": "Instagram",
               },
          
]

//BASE API URL
app.get('/api', (req, res) => {
     res.send('Hello World!')
   })
 
 //GET CARS
 
 app.get("/api/suppliers", (req, res) => {
     const { companyName } = req.query;
     if (!companyName) {
       res.status(200).send(northData);
     } else {
       const filteredData = northData.filter((x) =>
         x.companyName.toLowerCase().trim().includes(companyName.toLowerCase().trim())
       );
       res.status(200).send(filteredData);
     }
   });
 //GetById
 
 app.get(`/api/suppliers/:id`,(req,res)=>{
     const id = req.params.id
     const supplier = northData.find((x)=>x.id==id)
     //res.send(product)
     if(supplier===undefined){
         //status vermesek de default olaraq 404 dur
         res.send({
             message:"Data not found | Error 404"
         })
     }
     else{
         res.status(200).send(supplier);
     }
 })
 

 //POST CARS
 
 app.post(`/api/suppliers`,(req,res)=>{
     const { companyName, contactName,contactTitle} = req.body;
     const newSuppliers = {
       id: crypto.randomUUID(),
       companyName: companyName,
       contactName: contactName,
       contactTitle: contactTitle,
     };
     northData.push(newSuppliers);
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
 
 
 
 app.listen(PORT, () => {
     console.log(`Example app listening on port ${PORT}`)
   })