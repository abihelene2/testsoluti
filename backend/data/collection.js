require('dotenv').config({ path: '../.env' });
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

///////////////////////////////////////////////////////
// THIS IS FOR THE CREATION OF INITIAL DATAS + TABLES
//////////////////////////////////////////////////////
async function main() {
    const uri = "mongodb://localhost:27017"; // Your MongoDB URI
    const client = new MongoClient(uri);

    try {
        await client.connect();

        // Get database
        const databaseName = process.env.DATABASE_NAME;
        console.log("Database URI:", process.env.MONGO_URI);
        console.log("Database Name:", process.env.DATABASE_NAME);

        if (!databaseName) {
            throw new Error("DATABASE_NAME is not defined in the environment variables.");
        }
        const db = client.db(databaseName);

        // Create a collection 'users' and insert a document
        const usersCollection = db.collection('users');
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash("password", salt);
        await usersCollection.insertOne({ email: "john@gmail.com", password: hashedPassword });

        // Create a collection 'movies' and insert a document
        const moviesCollection = db.collection('movies');
        await moviesCollection.insertOne({ title: "Barbie", genre: "comedy", year: 2003 });

        console.log("Documents inserted successfully!");

    } finally {
        await client.close();
    }
}

main().catch(console.error);
