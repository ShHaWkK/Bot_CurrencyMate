const axios = require('axios');

exports.getExchangeRate = async function(fromCurrency, toCurrency) {
    if (fromCurrency === toCurrency) {
        return 1;
    }

    const url = `https://v6.exchangerate-api.com/v6/a21440e3c1f0c84f605c1a70/latest/EUR`;

    try {
        const response = await axios.get(url);
        if (!response.data || !response.data.rates) {
            throw new Error(`Response from API is missing rates.`);
        }

        const rate = response.data.rates[toCurrency];
        if (!rate) {
            throw new Error(`Unable to find exchange rate for ${toCurrency}`);
        }
        return rate;
    } catch (error) {
        const errorMsg = error.response ? `${error.response.status}: ${error.response.statusText}` : error.message;
        throw new Error(`Error fetching data from the API: ${errorMsg}`);
    }
};

