const client = require("./client");
const { getMerchantByUsername } = require("./merchant");

async function createProduct({
  creatorId,
  name,
  description,
  price,
  inventory,
  roast,
  grind,
  country,
  product_wt,
  image
}) {
  try {
    const {
      rows: [Products],
    } = await client.query(
      `
      INSERT INTO Product("creatorId", name, description, price, inventory, roast, grind, country, product_wt, image) 
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
      RETURNING *;
    `,
      [
        creatorId,
        name,
        description,
        price,
        inventory,
        roast,
        grind,
        country,
        product_wt,
        image
      ]
    );
    creatorId,
      name,
      description,
      price,
      inventory,
      roast,
      grind,
      country,
      product_wt,
      image;

    return Products;
  } catch (error) {
    throw error;
  }
}

async function getProductById(productId) {
  try {
    const {
      rows: [Products],
    } = await client.query(`
    SELECT *
    FROM Product
    WHERE id =${productId};
    `);
    if (!Products) {
      return null;
    }
    return Products;
  } catch (error) {
    throw error;
  }
}
async function getAllProducts() {
  try {
    const { rows: productId } = await client.query(`
      SELECT id
      FROM Product;
    `);

    const products = await Promise.all(
      productId.map((product) => getProductById(product.id))
    );

    return products;
  } catch (error) {
    throw error;
  }
}

async function getProductsByName(name) {
  try {
    const {
      rows: [Products],
    } = await client.query(
      `
    SELECT *
    FROM Product
    WHERE name=$1;
    `,
      [name]
    );
    if (!Products) {
      return null;
    }
    return Products;
  } catch (error) {
    throw error;
  }
}



async function destroyProduct(id) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
    DELETE FROM Product
    WHERE id = $1
    RETURNING *;
    `,
      [id]
    );
    console.log(product, "DELETING PRODUCT");
    return product;
  } catch (error) {
    throw error;
  }}


async function updateProduct({ productId, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

    if (setString.length === 0) {
      return;
    }
    try {
      const {
        rows: [product],
      } = await client.query(
        `
    UPDATE Product
    SET ${setString}
    WHERE id=${productId}
    RETURNING *;
    `,
        Object.values(fields)
      );
      return product;
  } catch (error) {
    throw error;
  }
}

async function getProductsByMerchant( username ) {
  try {
    const { rows: products } = await client.query(
      `
    SELECT Product.*, Merchants.username AS "creatorName"
    FROM Product
    JOIN Merchants ON Product."creatorId" = Merchants.id
    WHERE username = $1;
  `,
      [username]
    );
    return products;
  } catch (error) {
    console.error("Trouble getting products", error);
  }
}



async function getProductsByCategoryWeight(weight) {
  try {
    const {
      rows: [Products],
    } = await client.query(
      `
    SELECT *
    FROM Product
    WHERE product_wt=$1;
    `,
      [weight]
    );
    if (!Products) {
      return null;
    }
    return Products;
  } catch (error) {
    throw error;
  }
}

async function getProductsByCategoryRoast(roast) {
  try {
    const {
      rows: [Products],
    } = await client.query(
      `
    SELECT *
    FROM Product
    WHERE roast=$1;
    `,
      [roast]
    );
    if (!Products) {
      return null;
    }
    return Products;
  } catch (error) {
    throw error;
  }
}

async function getProductsByCategoryGrind(grind) {
  try {
    const {
      rows: [Products],
    } = await client.query(
      `
    SELECT *
    FROM Product
    WHERE grind=$1;
    `,
      [grind]
    );
    if (!Products) {
      return null;
    }
    return Products;
  } catch (error) {
    throw error;
  }
}

async function getProductsByCategoryCountry(country) {
  console.log("getting products by country")
  try {
    const {
      rows: [Products],
    } = await client.query(
      `
    SELECT *
    FROM Product
    WHERE country=$1;
    `,
      [country]
    );
    if (!Products) {
      return null;
    }
    return Products;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductsByName,
  updateProduct,
  destroyProduct,
  getProductById,
  getProductsByMerchant,
  getProductsByCategoryWeight,
  getProductsByCategoryRoast,
  getProductsByCategoryCountry,
  getProductsByCategoryGrind,
};
