const express = require('express');
const router = express.Router();
const axios = require('axios');
const domainsUrl =
  'https://www.101domain.com/extension_category_list_service.json';
const requestBody = require('../resources/domain_categories');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/domains', async (req, res, next) => {
  try {
    const response = await axios.post(domainsUrl, requestBody);
    const domains = getDomains(response.data.data);
    res.send(domains);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

getDomains = categories => {
  const response = [];
  for (category in categories) {
    const categoryObj = categories[category];
    for (url in categories[category]) {
      const price = getFormattedPrice(categoryObj[url].price);
      response.push({ url: url.toLowerCase(), category, price });
    }
  }

  return response;
};

getFormattedPrice = priceString =>
  Math.round(Number(priceString.split(' ')[0]));

module.exports = router;
