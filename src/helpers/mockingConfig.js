import { faker } from "@faker-js/faker";

const { database, commerce, random, image } = faker;

export const productsGenerator = () => {
    return {
        id: database.mongodbObjectId(),
        title: commerce.product(),
        description: commerce.productDescription(),
        price: parseInt(commerce.price(100, 9000, 2)),
        thumbnail: image.imageUrl(),
        code: random.alphaNumeric(7),
        stock: parseInt(random.numeric(3)),
        category: commerce.department(),
    }
};