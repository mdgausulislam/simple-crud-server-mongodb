const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json())

// gausulislam5
// uKawagvWEIZYsWcH


const uri = "mongodb+srv://gausulislam5:uKawagvWEIZYsWcH@cluster0.gxta02q.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    // const database = client.db("usersDB");
    // const userCollection = database.collection("users");

    const userCollection = client.db("usersDB").collection("users");

    app.get('/users', async (req, res) => {
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/users/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await userCollection.findOne(query);
      res.send(result);
    })


    app.post('/users', async (req, res) => {
      const user = req.body;
      console.log('new user:', user);
      // const result = await userCollection.insertOne(user);
      // res.send(result);
      const result = await userCollection.insertOne(user)
      res.send(result)
    });

    app.put('/users/:id', async (req, res) => {
      const id = req.params.id;
      const updateUser = req.body;
      console.log(updateUser);
      const filter = { _id: new ObjectId(id) }
      const option = { upsert: true }
      const updated = {
        $set: {
          name: updateUser.name,
          email:updateUser.email
        }
      }

      const result=await userCollection.updateOne(filter,updated,option,);
      res.send(result);

    })

    app.delete('/users/:id', async (req, res) => {
      const id = req.params.id;
      console.log('Please delete id', id);

      const query = { _id: new ObjectId(id) };
      const result = await userCollection.deleteOne(query)
      res.send(result)
    })





    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res) => {
  res.send('server is running')
})

app.listen(port, () => {
  console.log(`server example port are :${port}`);
})
