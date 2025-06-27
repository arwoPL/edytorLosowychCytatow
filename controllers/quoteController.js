const Quote = require("../model/quoteModel");

async function getQuotes() {
    try {
        const quotes = await Quote.getAll();
        return quotes;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function getQuote(id) {
    try {
        const quote = Quote.getById(id);
        return quote;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getRandom() {
    try {
        const quotes = await getQuotes();

        if(quotes) {
            return quotes[ Math.floor(Math.random() * quotes.length )];
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function prepareDB() {
    try {
        const quotes = await getQuotes();

        if (!quotes) {
            const quotesArr = [
                { quote: "Knowing yourself is the beginning of all wisdom.", author: "Aristotle" },
                { quote: "No great mind has ever existed without a touch of madness.", author: "Aristotle" },
                { quote: "Educating the mind without educating the heart is no education at all.", author: "Aristotle" },
                { quote: "What is a friend? A single soul dwelling in two bodies.", author: "Aristotle" },
                { quote: "Hope is a waking dream", author: "Aristotle" },
                { quote: "Happiness depends upon ourselves.", author: "Aristotle" },
                { quote: "A friend to all is a friend to none.", author: "Aristotle" },
                { quote: "Wishing to be friends is quick work, but friendship is a slow ripening fruit.", author: "Aristotle" }
            ];

            await Quote.saveAll(quotesArr);
        }
    } catch (err) {
        console.error(err);
        return null;
    }
}

module.exports = {
    getQuote,
    getQuotes,
    getRandom,
    prepareDB
}