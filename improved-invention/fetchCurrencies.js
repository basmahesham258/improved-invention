const express = require('express');
const app = express();
const PORT = 3000;

// Static exchange rates
const currencyRates = {
    USD: { EUR: 0.89, GBP: 0.76, INR: 74.23, JPY: 113.5 },
    EUR: { USD: 1.12, GBP: 0.85, INR: 83.12, JPY: 127.8 },
    GBP: { USD: 1.32, EUR: 1.18, INR: 97.8, JPY: 150.5 },
    INR: { USD: 0.013, EUR: 0.012, GBP: 0.010, JPY: 1.54 },
    JPY: { USD: 0.0088, EUR: 0.0078, GBP: 0.0066, INR: 0.65 }
};

// Function to get static currency rates
function getStaticCurrencyRates(baseCurrency = 'USD') {
    if (currencyRates[baseCurrency]) {
        const ratesArray = Object.entries(currencyRates[baseCurrency]).map(([currency, rate]) => ({
            currency,
            rate
        }));

        return {
            baseCurrency,
            rates: ratesArray
        };
    } else {
        return {
            error: `Exchange rates for base currency '${baseCurrency}' not found.`,
            rates: []
        };
    }
}
app.use(express.json());

// API endpoint to fetch exchange rates
app.get('/api/currencies/:base', (req, res) => {
    const baseCurrency = req.params.base.toUpperCase();
    const data = getStaticCurrencyRates(baseCurrency);
    res.json(data);
});

app.post('/api/currencies', (req, res) => {
    const { baseCurrency } = req.body;

    // Validate the input
    if (!baseCurrency) {
        return res.status(400).json({
            error: "Missing 'baseCurrency' in request body."
        });
    }

    const currencyData = getStaticCurrencyRates(baseCurrency.toUpperCase());
    res.json(currencyData);
});


// Start the server
app.listen(PORT, () => {
    console.log(`Currency service is running at http://localhost:${PORT}`);
});
