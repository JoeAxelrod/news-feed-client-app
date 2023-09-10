const chai = require('chai');
const chaiHttp = require('chai-http');
const {expect} = chai;
const {startServer} = require('../index');

let app, server;
chai.use(chaiHttp);

describe('Server API Tests', function () {
	before(async function () {
		// drop the database before each test
		const {MongoClient} = require('mongodb');
		const client = await MongoClient.connect('mongodb://localhost:27017');
		const db = client.db('newsItems');
		await db.dropDatabase();
		await client.close();

		// start the server
		({app, server} = await startServer());
	});

	after(function (done) {
		// Close the server
		server.close(done);
	});

	it('GET /items should return items array', function (done) {
		chai.request(app)
		.get('/items')
		.end(function (err, res) {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
			expect(res.body).to.be.an('array');
			done();
		});
	});

	it('POST /signup should register a phone number', function (done) {
		const phoneNumber = '1234567890';
		chai.request(app)
		.post('/signup')
		.send({phoneNumber})
		.end(function (err, res) {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
			expect(res.text).to.equal('Signed up');
			done();
		});
	});

	it('POST /add-item should add a new item', function (done) {
		const newItem = {
			title: "Check this out",
			text: "Our new fish dish is ready!",
			image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Fish_dish_at_Golden_Pig_Restaurant%2C_Newstead%2C_Brisbane%2C_Queensland.jpg/640px-Fish_dish_at_Golden_Pig_Restaurant%2C_Newstead%2C_Brisbane%2C_Queensland.jpg",
			link: {
				text: "Order Now!",
				path: "/order"
			}
		};

		chai.request(app)
		.post('/add-item')
		.send(newItem)
		.end(function (err, res) {
			expect(err).to.be.null;
			expect(res).to.have.status(200);
			expect(res.text).to.equal('Item added');
			done();
		});
	});

});
