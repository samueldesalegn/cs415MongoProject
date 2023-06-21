import express from "express";
import { MongoClient } from "mongodb";

import cors from "cors";


const app = express();


const client = new MongoClient("mongodb://127.0.0.1:27017");
let db = null;


async function main() {
	await client.connect();
	db = client.db('cs415MongProject');
}

main()
.then(()=>console.log("MongoDb connected..."))
.catch((err) =>console.log(err.message));

app.use(express.json());
app.use(cors("http://localhost:3000/"))

app.get("/", (req, res) => {
	res.json("Hello, this is from Backend!")
});

app.get("/books", async (req, res) => {

	const books = await req.db.collection('books').find(query).toArray();
	console.log(books)
		res.status(200).json(books);

});


app.post('/books', async (req, res) => {

	try {
		const book = req.body;
		const result = await req.db.collection('books').insertOne(book);
		res.status(201).json(result);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

app.get('/books', async (req, res) => {
	try {
		const { author, title, publisher } = req.query;
		const query = {};
		if (author) {
			query.author = author;
		}
		if (title) {
			query.title = title;
		}

		if (publisher) {
			query.publisher = publisher;

		}

		const books = await req.db.collection('books').find(query).toArray();
		res.status(200).json(books);

	} catch (error) {
		res.status(400).json({ error: error.message });
	}

});

app.listen(8800, () => {
	console.log("Connected to Server.....");
});