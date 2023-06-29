const axios = require('axios');

const getGenre = async (searchTerm) => {
    const cleangenreSearch = searchTerm.replace(" ", "+");
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${cleangenreSearch}` + searchTerm);
    return response;
};

module.exports = {
    getGenre
}