require("dotenv").config();
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("message", (data) => {
    console.log(data)
    socket.to(data.roomID).emit("message", data.message);
  });

  socket.on("disconnect", () => {
    console.log("disconnected id: ", socket.id);
  });
});

var jwt = require("jsonwebtoken");
const morgan = require("morgan");
const stripe = require("stripe")(process.env.PAYMENT_SECRET_KEY);
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
var cors = require("cors");
app.use(morgan("dev"));
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://parcel-tracker-server-seven.vercel.app",
      "https://parceltracker-7e596.web.app",
      "https://parceltracker-7e596.firebaseapp.com",
    ],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
  })
);
app.use(express.json());
app.use(morgan("dev"));

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.m65dh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.post("/payment-intent", async (req, res) => {
  const { price } = req.body;
  if (!price) {
    return res.status(400).send({ message: "price Not Found" });
  }
  const { client_secret } = await stripe.paymentIntents.create({
    amount: price,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.send({ clientSecret: client_secret });
});

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++    middleware    ++++++++++++++++++++++++++++++++++++++++++++++++
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// jwt related api
app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN, {
    expiresIn: "1h",
  });
  res.send({ token });
});

// middlewares
const verifyToken = (req, res, next) => {
  // console.log('inside verify token', req.headers.authorization);
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "unauthorized access" });
    }
    req.user = decoded;
    next();
  });
};

async function run() {
  try {
    // await client.connect();

    const db = client.db("ParcelTrackerDB");
    const userCollection = db.collection("users");
    const parcelCollection = db.collection("parcels");
    const reviewCollection = db.collection("reviews");

    const verifyAdmin = async (req, res, next) => {
      const tokenEmail = req?.user?.email;
      const query = { email: tokenEmail };
      const user = await userCollection.findOne(query);
      if (!user || user?.role !== "admin") {
        return res.status(403).send({ message: "you are not admin!" });
      }
      next();
    };
    const verifyDeliveryMan = async (req, res, next) => {
      const tokenEmail = req?.user?.email;
      const query = { email: tokenEmail };
      const user = await userCollection.findOne(query);
      if (!user || user?.role !== "deliverymen") {
        return res.status(403).send({ message: "you are not delivery man!" });
      }
      next();
    };

    app.patch("/payment-status/:id", async (req, res) => {
      const { message } = req.body;
      console.log(message);
      const parcelID = req.params.id;
      const filter = { _id: new ObjectId(parcelID) };

      const updatePaymentInfo = {
        $set: {
          paymentStatus: message,
        },
      };
      const result = await parcelCollection.updateOne(
        filter,
        updatePaymentInfo
      );
      res.send(result);
    });

    //getting one user role
    app.get("/user-role/:email", async (req, res) => {
      const userEmail = req.params.email;
      const query = { email: userEmail };
      const result = await userCollection.findOne(query);
      res.send({ role: result?.role });
    });

    app.get("/home-stats", async (req, res) => {
      const allUser = (await userCollection.find().toArray()).length;
      const allBookParcel = (await parcelCollection.find().toArray()).length;

      const allDeliverManInfo = await userCollection
        .find({
          role: "deliverymen",
        })
        .toArray();

      const totalCount = allDeliverManInfo.reduce(
        (sum, total) => sum + total.number_of_parcel_delivered,
        0
      );

      res.send({ allUser, allBookParcel, totalCount });
    });

    //adding user info to database
    app.post("/all-user-info", async (req, res) => {
      const userInfo = req.body;
      let query = { email: userInfo.email };
      const isExist = await userCollection.findOne(query);
      if (isExist) {
        return res.status(409).send({ message: "You have already an account" });
      }
      const result = await userCollection.insertOne(userInfo);
      res.send({ status: true, result: result });
    });

    //updating number of booked and price
    //updating number of deliver
    app.patch("/update-user-data/:email", async (req, res) => {
      const info = req.body; //price , role
      const userEmail = req.params.email;
      const filter = { email: userEmail };

      if (info.role === "user") {
        const updateinfo = {
          $inc: {
            number_of_parcel_booked: 1,
            total_spent_amount: info.price,
          },
        };
        const result = await userCollection.updateOne(filter, updateinfo);
        res.send(result);
      } else if (info.role === "deliverymen") {
        const updateinfo = {
          $inc: {
            number_of_parcel_delivered: 1,
          },
        };
        const result2 = await userCollection.updateOne(filter, updateinfo);
        res.send(result2);
      }
    });

    app.patch("/update-profile-pic/:email", async (req, res) => {
      const image = req.body;
      const userEmail = req.params.email;
      const filter = { email: userEmail };

      const updateImage = {
        $set: {
          image: image.image,
        },
      };
      const result = await userCollection.updateOne(filter, updateImage);
      res.send(result);
    });

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // +++++++++++++++++++++++++++++++++++    User    +++++++++++++++++++++++++++++++++++++++++++++++++++++
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    //getting one user full info (++User++)(++deliveryMan++)(++admin++)
    app.get("/user-info/:email", async (req, res) => {
      const userEmail = req.params.email;
      if (userEmail) {
        const query = { email: userEmail };
        const result = await userCollection.findOne(query);
        res.send(result);
      }
    });

    //user one parcel info using ID (++User++)
    app.get("/my-parcel/get-one-percel/:id", async (req, res) => {
      const parcelId = req.params.id;
      const query = { _id: new ObjectId(parcelId) };
      const result = await parcelCollection.findOne(query);
      res.send(result);
    });

    //adding all parcel info to database (+++User+++)
    app.post("/add-parcel", verifyToken, async (req, res) => {
      const parcelInfo = req.body;
      const result = await parcelCollection.insertOne(parcelInfo);
      res.send(result);
    });

    //user specific mail holder parcel array (table) (+++User+++)
    app.get("/my-parcel/:email", verifyToken, async (req, res) => {
      const userEmail = req.params.email;
      const query = { email: userEmail };
      const result = await parcelCollection.find(query).toArray();
      res.send(result);
    });

    //cancel status (+++User+++)
    app.patch("/cancel-deliver-status/:id", async (req, res) => {
      const updateParcelID = req.params.id;
      const updateStatus = req.body;
      const filter = { _id: new ObjectId(updateParcelID) };
      const update = {
        $set: {
          status: updateStatus.status,
        },
      };
      const result = await parcelCollection.updateOne(filter, update);
      res.send(result);
    });

    //full-parcel update (++User++)
    app.patch("/update-parcel/:id", async (req, res) => {
      const parcelID = req.params.id;
      const parcelInfo = req.body;
      const filter = { _id: new ObjectId(parcelID) };

      const updateParcelInfo = {
        $set: {
          deliveryAddressLatitude: parcelInfo.deliveryAddressLatitude,
          deliveryAddressLongitude: parcelInfo.deliveryAddressLongitude,
          email: parcelInfo.email,
          name: parcelInfo.name,
          parcelDeliveryAddress: parcelInfo.parcelDeliveryAddress,
          parcelType: parcelInfo.parcelType,
          parcelWeight: parcelInfo.parcelWeight,
          phonenumber: parcelInfo.phonenumber,
          price: parcelInfo.price,
          receiverPhoneNumber: parcelInfo.receiverPhoneNumber,
          requestedDeliveryDate: parcelInfo.requestedDeliveryDate,
        },
      };
      const result = await parcelCollection.updateOne(filter, updateParcelInfo);
      res.send(result);
    });

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // +++++++++++++++++++++++++++++++++++    Admin    +++++++++++++++++++++++++++++++++++++++++++++++++++++
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    //stats (++admin++)
    app.get("/stats", verifyToken, verifyAdmin, async (req, res) => {
      const dateArray = await parcelCollection
        .aggregate([
          {
            $group: {
              _id: "$bookingDate",
              count: { $sum: 1 },
            },
          },
          {
            $project: {
              date: "$_id",
              count: 1,
              _id: 0,
            },
          },
        ])
        .toArray();

      console.log(dateArray);
      res.send(dateArray);
    });

    app.get("/products", verifyToken, verifyAdmin, async (req, res) => {
      const page = parseInt(req.query.page);
      const size = parseInt(req.query.size);

      const query = { role: "user" };
      const result = await userCollection
        .find(query)
        .skip(page * size)
        .limit(size)
        .toArray();
      res.send(result);
    });

    //getting all parcel info (+++Admin+++)
    app.get("/all-parcel", verifyToken, verifyAdmin, async (req, res) => {
      const result = await parcelCollection.find().toArray();
      res.send(result);
    });

    //get date range searched data (++Admin++)
    app.get("/date-range", async (req, res) => {
      const { date_from, date_to } = req.query;
      const query = {
        requestedDeliveryDate: { $gte: date_from, $lte: date_to },
      };
      const result = await parcelCollection.find(query).toArray();
      res.send(result);
    });

    //getting all role specific array data (+++Admin+++)
    app.get("/all-role", async (req, res) => {
      const role = req.query;
      let query = {};
      if (role) {
        query = { role: role.role };
      }
      const allSpecificRole = await userCollection.find(query).toArray();
      res.send(allSpecificRole);
    });

    //update status to admin or deliveyMan
    app.patch("/update-role-tpye/:email", async (req, res) => {
      const userEmail = req.params.email;
      const role = req.body;

      const filter = { email: userEmail };
      const updateRole = {
        $set: {
          role: role.role,
        },
      };
      const result = await userCollection.updateOne(filter, updateRole);
      res.send(result);
    });

    //changing status and adding deliveryMen ID (+++Admin+++)
    app.patch("/update-status-addID/:id", async (req, res) => {
      const parcelID = req.params.id;
      const updateInfo = req.body;
      const filter = { _id: new ObjectId(parcelID) };

      const update = {
        $set: {
          status: updateInfo.status,
          assignedDeliveryManID: updateInfo.assignedDeliveryManID,
          approximateDeliveryDate: updateInfo.approximateDeliveryDate,
        },
      };
      const result = await parcelCollection.updateOne(filter, update);
      res.send(result);
    });

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // +++++++++++++++++++++++++++++++++++    Delivery Man    ++++++++++++++++++++++++++++++++++++++++++++++
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    //get one deliver man ID to find all received orders verifyDeliveryMan
    app.get(
      "/one-deliveryman-info/:email",
      verifyToken,
      verifyDeliveryMan,
      async (req, res) => {
        const userEmail = req.params.email;
        const query = { email: userEmail };
        const singleDeliveryMan = await userCollection.findOne(query);
        deliveryManID = singleDeliveryMan._id.toString();
        const filter = { assignedDeliveryManID: deliveryManID };
        const result = await parcelCollection.find(filter).toArray();
        res.send(result);
      }
    );

    //update deliver status and update deliver stats stats
    app.patch("/deliver-status/:id", async (req, res) => {
      const updateParcelID = req.params.id;
      const updateStatus = req.body;
      const filter = { _id: new ObjectId(updateParcelID) };
      const update = {
        $set: {
          status: updateStatus.status,
        },
      };
      const result = await parcelCollection.updateOne(filter, update);
      res.send(result);
    });

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // +++++++++++++++++++++++++++++++++++    Reviews    +++++++++++++++++++++++++++++++++++++++++++++++++++
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    app.get(
      "/deliveryMan-reviews/:email",
      verifyToken,
      verifyDeliveryMan,
      async (req, res) => {
        const userEmail = req.params.email;
        const query = { email: userEmail };
        const singleDeliveryMan = await userCollection.findOne(query);
        if (singleDeliveryMan) {
          deliveryManID = singleDeliveryMan._id.toString();
        }
        const filter = { assignedDeliveryManID: deliveryManID };
        const result = await reviewCollection.find(filter).toArray();
        res.send(result);
      }
    );
    // post
    app.post("/add-reviews", async (req, res) => {
      const review = req.body;
      await reviewCollection.insertOne(review);

      const averageRating = await reviewCollection
        .aggregate([
          {
            $match: { assignedDeliveryManID: review.assignedDeliveryManID },
          },
          {
            $group: {
              _id: "$assignedDeliveryManID",
              rating: { $avg: "$rating" },
            },
          }, //here calculate finish
        ])
        .toArray();

      const calculatedRating = parseFloat(averageRating[0].rating.toFixed(2));
      const filter = { _id: new ObjectId(review.assignedDeliveryManID) };
      const updateRating = {
        $set: {
          rating: calculatedRating,
        },
      };

      await userCollection.updateOne(filter, updateRating);
      res.send({ message: "Review added and rating updated successfully." });
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
  res.send("Parcel Tracker server!");
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
