import stripeApiKey from "./stripeApiKey";
const stripe = require("stripe")(stripeApiKey);

const deleteAllProducts = async () => {
    const products = await stripe.products.list({
        limit: 100
    });

    for (const product of products.data) {
        await stripe.products.del(product.id);
    }
};

deleteAllProducts();
