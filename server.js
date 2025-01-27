const express = require("express");
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
//const HOST_URL = process.env.CLIENT_BASE_URL;
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


    app.get("/client/snuslager", async (req, res) => {
        try{
            const response = await axios.get("https://minimalapi-mongodb20250127100206.azurewebsites.net/snuslager")
            res.status(200).json(response.data);
            console.log("retrieving data");
        }
            
        catch (error){
            res.status(400);
            console.log(error.message);
        }
    });


app.post("/snuslager/snus", async (req,res) =>{
    try{
        const { name, type, strength, tobak, price} = req.body;
        if(!name || !type || !strength || !tobak || !price){
            return res.status(400).json({error: "all fields are required to post a new snus."});
        }
        const response = await axios.post("https://minimalapi-mongodb20250127100206.azurewebsites.net/snuslager/newsnus", req.body,{
            headers: {"Content-Type": "application/json"},
            httpsAgent: new (require("https").Agent)({ rejectUnauthorized: false }), // Bypass SSL verification in development
        });
        res.status(201).json({ message: "Snus created successfully.", snus: response.data });
        //res.status(200).json(response.data);
        console.log("created new snus.");
    }
    catch(error){
        console.error("error creating snus,", error.message)
        res.status(500).json({ error: "Failed to create snus. Please try again later." });
    }   
})

app.listen(PORT, () =>{
    console.log("running on port" + PORT);
});

