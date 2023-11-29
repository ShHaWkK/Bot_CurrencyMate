const axios = require('axios');

exports.getExchangeRate = async function(fromCurrency, toCurrency) {
    const url = ` https://v6.exchangerate-api.com/v6/a21440e3c1f0c84f605c1a70/latest/USD`;
    /*Si il est renté ou pas */
    if (fromCurrency === toCurrency) {
        console.log('Je suis entré dans le if de la fonction getExchangeRate')
        return 1;
    } else {
        console.log('Je ne suis pas entré ')   
     }
    try {
        const response = await axios.get(url);
        const rate = response.data.rates[toCurrency];
        if (!rate) {
            throw new Error(`Unable to find exchange rate for ${toCurrency}`);
        }
        return rate;
    } catch (error) {
        throw new Error(`Error fetching data from the API: ${error.response.status}`);
    }
};
