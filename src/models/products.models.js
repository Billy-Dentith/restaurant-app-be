const db = require("../db/connection");
const { selectCategories } = require("./categories.models");

exports.selectProducts = (category, isFeatured) => {
  return selectCategories().then((categoriesArray) => {
    const validCategories = categoriesArray.map((categories) => {
      return categories.slug;
    });

    let queryString = `SELECT * FROM products `;
    const queryVals = [];

    if (category) {
      if (validCategories.includes(category)) {
        queryString += `WHERE cat_slug=$1`;
        queryVals.push(category);
      } else {
        return Promise.reject({ status: 400, message: "Invalid Query" });
      }
    }
    if (isFeatured) {
      queryString += `WHERE is_featured=true`;
    }

    queryString += `;`;

    return db.query(queryString, queryVals).then(({ rows }) => {
      return rows;
    });
  });
};

exports.selectSingleProduct = (id) => {
  return db
    .query(`SELECT * FROM products WHERE id=$1;`, [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, message: "Product not found" });
      }
      return rows[0];
    });
};

exports.removeProductById = (id) => {
  return db
    .query(`DELETE FROM products WHERE id=$1 RETURNING*;`, [id])
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, message: "Product not found" });
      }
    });
};

exports.addProduct = ({
  title,
  description,
  image,
  price,
  options,
  catSlug,
}) => {
  const queryVals = [
    title,
    description,
    image,
    price,
    JSON.stringify(options),
    catSlug,
  ];
  const queryStr = `
        INSERT INTO products 
            (title, description, image, price, options, cat_slug)
        VALUES
            ($1, $2, $3, $4, $5, $6)
        RETURNING*;`;

  return db.query(queryStr, queryVals).then(({ rows }) => {
    return rows[0];
  });
};

exports.editProduct = (id, updates) => {
  const acceptedProperties = [
    "title",
    "description",
    "image",
    "price",
    "is_featured",
    "options",
  ];

  const validUpdates = Object.keys(updates).filter((key) =>
    acceptedProperties.includes(key)
  );

  if (validUpdates.length === 0) {
    return Promise.reject({
      status: 400,
      message: "No valid fields provided for update",
    });
  }

  const params = validUpdates
    .map((key, index) => `${key}=$${index + 1}`)
    .join(", ");
  const queryVals = validUpdates.map((key) =>
    key === "options" ? JSON.stringify(updates[key]) : updates[key]
  );
  queryVals.push(id);

  const queryStr = `
        UPDATE products
        SET ${params}
        WHERE id=$${queryVals.length}
        RETURNING*;`;

  return db.query(queryStr, queryVals).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, message: "Product not found" });
    }
    return rows[0];
  });
};
