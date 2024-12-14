require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
var cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.m65dh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();
    const equipmentCollcetion = client
      .db("equipmentSportsDB")
      .collection("equipmentSports");

    //Read
    app.get("/equipments", async (req, res) => {
      const cursor = equipmentCollcetion.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    //Dynamic
    app.get("/equipments/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await equipmentCollcetion.findOne(query);
      res.send(result);
    });
    
    //Dynamic mail
    app.get("/equipments/userEmail/:userEmail", async (req, res) => {
      const userEmail = req.params.userEmail;
      const query = { userEmail: userEmail };
      const result = await equipmentCollcetion.find(query).toArray();
      res.send(result);
    });

    //Post
    app.post("/equipments", async (req, res) => {
      const addEquipments = req.body;
      const result = await equipmentCollcetion.insertOne(addEquipments);
      res.send(result);
    });

    //Put
    app.put("/equipments/:id", async (req, res) => {
      const id = req.params.id;
      const updatedEquipement = req.body;

      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };

      const equipement = {
        $set: {
          image: updatedEquipement.image,
          itemName: updatedEquipement.itemName,
          categoryName: updatedEquipement.categoryName,
          description: updatedEquipement.description,
          price: updatedEquipement.price,
          rating: updatedEquipement.rating,
          customization: updatedEquipement.customization,
          processingTime: updatedEquipement.processingTime,
          stockStatus: updatedEquipement.stockStatus,
          userEmail: updatedEquipement.userEmail,
          userName: updatedEquipement.userName,
        },
      };

      const result = await equipmentCollcetion.updateOne(
        filter,
        equipement,
        options
      );
      res.send(result);
    });

    //Delete
    app.delete("/equipments/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await equipmentCollcetion.deleteOne(query);
      res.send(result);
    });

    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.log);

app.get("/", (req, res) => {
  res.send("Server for EquiSports");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
