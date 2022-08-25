import dotenv from "dotenv";
dotenv.config();

let ProductDao;
let CartDao;

switch (process.env.database) {
    case "mongodb":
        const { default: ProductDaoMongo } = await import(
            '../daos/product/productDaoMongo.js');
        const { default: CartDaoMongo } = await import(
            "./cart/cartDaoMongo.js");

        ProductDao = new ProductDaoMongo();
        CartDao = new CartDaoMongo();

        break;

    case "firebase":
        const { default: ProductDaoFirebase } = await import(
            "./product/productDaoFirebase.js");
        const { default: CartDaoFirebase } = await import(
            "./cart/cartDaoFirebase.js");

        ProductDao = new ProductDaoFirebase();
        CartDao = new CartDaoFirebase();

        break;
}

export { ProductDao, CartDao };
