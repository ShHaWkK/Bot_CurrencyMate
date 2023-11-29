const axios = require('axios');

exports.getExchangeRate = async function(fromCurrency, toCurrency) {
    if (fromCurrency === toCurrency) {
        return 1;
    }

    const url = `https://v6.exchangerate-api.com/v6/YOUR API /latest/${fromCurrency}`;

    try {
        const response = await axios.get(url);
        if (!response.data || !response.data.conversion_rates) {
            throw new Error(`Response from API is missing conversion_rates.`);
        }

        const rate = response.data.conversion_rates[toCurrency];
        if (!rate) {
            throw new Error(`Unable to find exchange rate for ${toCurrency}`);
        }
        return rate;
    } catch (error) {
        const errorMsg = error.response ? `${error.response.status}: ${error.response.statusText}` : error.message;
        throw new Error(`Error fetching data from the API: ${errorMsg}`);
    }
};
