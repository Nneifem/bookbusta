const axios = require('axios');

const getQuote = async (book) => {
    const response = await axios.get(process.env.API_QUOTE_URL + book);
    return response;
};

module.exports = {
    getQuote
}