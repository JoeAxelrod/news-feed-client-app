const express = require('express');
const cors = require('cors');
const app = express();
const {connectDB} = require('./db');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({
	origin: 'http://localhost:3000'
}));

let server, db;

async function startServer() {
	try {
		db = await connectDB();
		app.get("/items", async (req, res) => {
			let query = {};
			const phoneNumber = req.query.phoneNumber;
			if (phoneNumber) {
				query.visibleTo = {$in: ['all', phoneNumber]};
			}
			const items = await db.collection('items').find(query).toArray();
			res.send(items);
		});


		let users = {}; // Temporary in-memory storage
		app.post("/signup", (req, res) => {
			const {phoneNumber} = req.body;
			users[phoneNumber] = true;
			res.send("Signed up");
		});

		app.post("/add-item", async (req, res) => {
			const item = req.body;
			await db.collection('items').insertOne(item);
			res.send("Item added");
		});
		server = app.listen(8081);
		return {app, server};
	} catch (err) {
		console.error("Failed to connect to MongoDB: ", err);
	}
}

if (require.main === module) {
	startServer()
	.then(app => {
		console.log("Server started successfully.");
	})
	.catch(err => {
		console.error("Failed to start server: ", err);
	});
}

module.exports = {startServer};

