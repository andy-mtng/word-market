const Stripe = require("stripe");
import stripeApiKey from "./stripeApiKey";
const stripe = Stripe(stripeApiKey);

const getAllStripePrices = async () => {
    let allPrices: any = [];
    let hasMore = true;
    const params: any = {
        limit: 100
    };

    while (hasMore) {
        const prices = await stripe.prices.list(params);
        allPrices = allPrices.concat(prices.data);
        hasMore = prices.has_more;
        params.starting_after = prices.data[prices.data.length - 1].id;
    }

    return allPrices; // Array containing all prices
};

export default getAllStripePrices;
