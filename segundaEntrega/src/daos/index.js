import dotenv from "dotenv";
dotenv.config();
let productDao;
let cartDao;

switch (process.env.DATABASE) {
    case "mongo":
        const { default: productDaoMongo } = await import("./product/productDaoMongo.js");
        const { default: cartDaoMongo } = await import("./cart/cartDaoMongo.js");

        productDao = new productDaoMongo();
        cartDao = new cartDaoMongo();
        break;

    case "firebase":
        const { default: productDaoFirebase } = await import("./product/productDaoFirebase.js");
        const { default: cartDaoFirebase } = await import("./cart/cartDaoFirebase.js");

        productDao = new productDaoFirebase();
        cartDao = new cartDaoFirebase();
        break;
    default:
        break;
}

export { productDao, cartDao };
