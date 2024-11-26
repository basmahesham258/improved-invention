// /api/currencies.js
module.exports = async (req, res) => {
    const baseCurrency = req.body.baseCurrency || 'USD';
  
    // Static data example
    const currencies = [
      { currency: 'USD', rate: 1 },
      { currency: 'EUR', rate: 0.85 },
      { currency: 'GBP', rate: 0.75 }
    ];
  
    // Return data for the selected baseCurrency
    const result = currencies.find(currency => currency.currency === baseCurrency);
  
    if (result) {
      res.status(200).json({ success: true, data: result });
    } else {
      res.status(400).json({ success: false, message: 'Currency not found' });
    }
  };
  