const format = require('pg-format'); 
const db = require('../connection');

async function seed({ categoriesData, productsData, usersData, ordersData }) {
  try {
    // Clear existing data
    await db.query('DROP TABLE IF EXISTS orders');
    await db.query('DROP TABLE IF EXISTS products');
    await db.query('DROP TABLE IF EXISTS categories');
    await db.query('DROP TABLE IF EXISTS verification_tokens');
    await db.query('DROP TABLE IF EXISTS sessions');
    await db.query('DROP TABLE IF EXISTS accounts');
    await db.query('DROP TABLE IF EXISTS users');

    // Create users table
    await db.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL,
        email VARCHAR UNIQUE NOT NULL,
        "emailVerified" TIMESTAMPTZ,
        image VARCHAR,
        is_admin BOOLEAN DEFAULT false
      );
    `);

    // Create accounts table 
    await db.query(`
      CREATE TABLE accounts (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER NOT NULL REFERENCES users(id),
        type VARCHAR(255) NOT NULL,
        provider VARCHAR(255) NOT NULL,
        "providerAccountId" VARCHAR(255) NOT NULL,
        refresh_token TEXT,
        access_token TEXT,
        expires_at BIGINT,
        id_token TEXT,
        scope TEXT,
        session_state TEXT,
        token_type TEXT
      ); 
    `)

    // Create sessions table 
    await db.query(`
      CREATE TABLE sessions (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER NOT NULL REFERENCES users(id),
        expires TIMESTAMPTZ NOT NULL, 
        "sessionToken" VARCHAR(255) NOT NULL
      );
    `)

    // Create verification_token table
    await db.query(`
      CREATE TABLE verification_tokens (
        identifier TEXT NOT NULL PRIMARY KEY,
        expires TIMESTAMPTZ NOT NULL,
        token TEXT NOT NULL
      );
    `)

    // Create categories table
    await db.query(`
      CREATE TABLE categories (
        id SERIAL PRIMARY KEY,
        title VARCHAR NOT NULL,
        description TEXT,
        image VARCHAR,
        slug VARCHAR UNIQUE NOT NULL,
        color VARCHAR
      );
    `);

    // Create products table
    await db.query(`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        title VARCHAR NOT NULL,
        description TEXT,
        image VARCHAR,
        price INTEGER NOT NULL,
        is_featured BOOLEAN DEFAULT false,
        options JSON,
        cat_slug VARCHAR NOT NULL REFERENCES categories(slug)
      );
    `);

    // Create orders table
    await db.query(`
      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        price INTEGER NOT NULL,
        status VARCHAR(50) NOT NULL,
        products JSON NOT NULL,
        user_email VARCHAR NOT NULL REFERENCES users(email),
        stripe_id VARCHAR
      );
    `);

    // Insert data into users table
    // const insertUsersQueryStr = format(
    //   'INSERT INTO users (id, name, email, image, is_admin) VALUES %L',
    //   usersData.map(({ id, name, email, image, isAdmin }) => [id, name, email, image, isAdmin])
    // );

    // await db.query(insertUsersQueryStr);
  
    // Insert data into categories table
    const insertCategoriesQueryStr = format(
      'INSERT INTO categories (id, title, description, image, slug, color) VALUES %L',
      categoriesData.map(({ id, title, desc, image, slug, color }) => [id, title, desc, image, slug, color])
    );
    
    await db.query(insertCategoriesQueryStr);

    // Insert data into products table
    const insertProductsQueryStr = format(
      'INSERT INTO products (id, title, description, image, price, is_featured, options, cat_slug) VALUES %L',
      productsData.map(({ id, title, desc, image, price, isFeatured, options, catSlug }) => [id, title, desc, image, price, isFeatured, JSON.stringify(options), catSlug])
    );

    await db.query(insertProductsQueryStr);

    // Insert data into orders table
    // const insertOrdersQueryStr = format(
    //   'INSERT INTO orders (id, price, status, products, user_email, stripe_id) VALUES %L',
    //   ordersData.map(({ id, price, status, products, userEmail, stripeId }) => [id, price, status, products, userEmail, stripeId])
    // );

    // await db.query(insertOrdersQueryStr);
  
    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error during seeding:", error);
  }
}

module.exports = seed;