const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
var jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");
require("dotenv").config();
var cors = require("cors");
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://madchef-server-side.vercel.app",
      "https://madchef-1487d.web.app",
      "https://madchef-1487d.firebaseapp.com",
      "https://storied-halva-b354f3.netlify.app/",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const verifyToken = (req, res, next) => {
  const token = req?.cookies?.token;

  if (!token) {
    return res.status(401).send({ message: "unauthorized access" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "unauthorized access" });
    }
    req.user = decoded;
    next();
  });
};

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.m65dh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
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
    const foodCollcetion = client.db("madchefDB").collection("food");
    const buyerCollcetion = client.db("madchefDB").collection("buyer");

    // JWT authentication
    app.post("/jwt", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN, {
        expiresIn: "1h",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ message: "success" });
    });

    app.post("/logout", (req, res) => {
      res
        .clearCookie("token", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ message: "success" });
    });

    app.get("/checkToken/:email", verifyToken, (req, res) => {
      const email = req.params.email;
      if (req?.user?.email !== email) {
        return res.status(403).send({ message: "forbidden access" });
      }
      res.send({ messg: "token verification" });
    });

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // +++++++++++++++++++++                 foodCollcetion         ++++++++++++++++++++++++++++++++++++
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    app.get("/allfood", async (req, res) => {
      const search = req.query.search || "";
      let query = { foodname: { $regex: search, $options: "i" } };
      const cursor = foodCollcetion.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/allfood/adminfood/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const query = { useremail: email };

      if (req?.user?.email !== email) {
        return res.status(403).send({ message: "forbidden access" });
      }

      const result = await foodCollcetion.find(query).toArray();
      res.send(result);
    });

    app.get("/allfood/fooddetailes/:id", async (req, res) => {
      const foodId = req.params.id;
      const query = { _id: new ObjectId(foodId) };
      const result = await foodCollcetion.findOne(query);
      res.send(result);
    });

    app.get("/allfood/fooddetailes/purchase/:id", async (req, res) => {
      const foodId = req.params.id;
      const query = { _id: new ObjectId(foodId) };
      const result = await foodCollcetion.findOne(query);
      res.send(result);
    });

    app.post("/addfood", async (req, res) => {
      const foodData = req.body;
      const result = await foodCollcetion.insertOne(foodData);
      res.send(result);
    });

    app.put("/allfood/updatefood/:id", async (req, res) => {
      const id = req.params.id;
      const food = req.body;

      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };

      const updateFood = {
        $set: {
          foodname: food.foodname,
          photo: food.photo,
          category: food.category,
          quantity: food.quantity,
          price: food.price,
          username: food.username,
          useremail: food.useremail,
          origin: food.origin,
          description: food.description,
        },
      };

      const result = await foodCollcetion.updateOne(
        filter,
        updateFood,
        options
      );
      res.send(result);
    });

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // +++++++++++++++++++++                 buyerCollcetion        ++++++++++++++++++++++++++++++++++++
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    app.get("/allorder", async (req, res) => {
      const cursor = buyerCollcetion.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/allorder/buyerfood/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const query = { buyeremail: email };

      if (req?.user?.email !== email) {
        return res.status(403).send({ message: "forbidden access" });
      }

      const result = await buyerCollcetion.find(query).toArray();

      for (const info of result) {
        const query1 = { _id: new ObjectId(info.foodid) };
        const foodinfo = await foodCollcetion.findOne(query1);
        if (foodinfo) {
          info.useremail = foodinfo.useremail;
          info.photo = foodinfo.photo;
        }
      }
      res.send(result);
    });

    app.post("/addorder", async (req, res) => {
      const buyerInfo = req.body;
      const filter = { _id: new ObjectId(buyerInfo.foodid) };
      const updatePurchaseCount = {
        $inc: {
          purchase_count: 1,
          quantity: -buyerInfo.purchaseQuantity,
        },
      };
      const updateCount = await foodCollcetion.updateOne(
        filter,
        updatePurchaseCount
      );
      const result = await buyerCollcetion.insertOne(buyerInfo);
      res.send(result);
    });

    app.delete("/allorder/orderdelete/:id", async (req, res) => {
      const foodid = req.params.id;
      const query = { _id: new ObjectId(foodid) };
      const result = await buyerCollcetion.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.log);

app.get("/", (req, res) => {
  res.send("Welcome to, Madchef server");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
