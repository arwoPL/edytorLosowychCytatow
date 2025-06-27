const MongoSingleton = require("../data/mongoDbSingleton");
const ObjectId = require("mongodb").ObjectId;


function saveAll(quotes) {
    return new Promise( async (resolve, reject) => {
        const collection = await MongoSingleton.getCollection();
        const result = await collection.insertMany(quotes);

        if (result.insertedCount) {
            resolve(result);
        } else {
            reject ("Couldn't save quotes.");
        }
    });
}

function getAll() {
    return new Promise( async (resolve,reject) => {
        const collection = await MongoSingleton.getCollection();
        const cursor = collection.find();
        const results = await cursor.toArray();

        if (results.length > 0) {
            resolve(results);
        } else {
            reject("Can't get all quotes");
        }
    } );
}

function getById(id) {
    return new Promise( async (resolve, reject) => {
        const collection = await MongoSingleton.getCollection();
        const result = await collection.findOne({_id: ObjectId(id)});

        if (result) {
            resolve(result);
        } else {
            reject("Can't get quote by id: ", id );
        }
    } );
}

module.exports = {
    getById,
    getAll,
    saveAll
};