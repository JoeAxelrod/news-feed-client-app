const {MongoClient} = require('mongodb');

async function connectDB() {
	const client = await MongoClient.connect('mongodb://localhost:27017');
	console.log('Connected to Database');
	const db = client.db('newsItems');

	const collectionName = 'items';
	const collections = await db.listCollections({}, {nameOnly: true}).toArray();

	if (!collections.some(coll => coll.name === collectionName)) {
		const initialData = [
			{
				title: "Check this out",
				text: "Our new hamburger is ready!",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Hamburger_%28black_bg%29.jpg/500px-Hamburger_%28black_bg%29.jpg",
				link: {
					text: "Order Now!",
					path: "/order"
				}
			}, {
				title: "Did someone say VEGAN?",
				text: "We also have a vegan Option, just check out our vegan options!",
				image: "https://images.everydayhealth.com/images/what-is-a-vegan-diet-benefits-food-list-beginners-guide-alt-1440x810.jpg?w=1110",
				link: {
					text: "I'm Vegan",
					path: "/order"
				}
			}];
		await db.collection(collectionName).insertMany(initialData);
		console.log("Data migrated to MongoDB.");
	}

	return db;
}


module.exports = { connectDB };

