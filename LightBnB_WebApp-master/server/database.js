const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');
  const args = process.argv.slice(2);
  const pool = new Pool({
    user: 'vagrant',
    password: '123',
    host: 'localhost',
    database: 'lightbnb'
  });

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool
  .query(`SELECT id, name, email, password 
  FROM users
  WHERE email = $1`, [email])
  .then((result) => {
    if(result) {
      return result.rows[0];
    } else {
      return NULL;
    }
  })
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool
  .query(`SELECT id, name, email, password 
  FROM users
  WHERE id = $1`, [id])
  .then((result) => {
    if(result) {
      console.log(result.rows[0])
      return result.rows[0];
    } else {
      return NULL;
    }
  })
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const name = user.name;
  const email = user.email;
  const password = user.password;
  return pool
  .query(`INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;`, [name, email, password])
  .then((result) => {
    if(result) {
      console.log(result.rows[0])
      return result.rows[0];
    } else {
      return NULL;
    }
  })

}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool
  .query(`SELECT properties.*, reservations.*, avg(rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.guest_id = $1
  AND reservations.end_date < now()::date
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date
  LIMIT 10;`, [guest_id])
  .then((result) => {
    if(result) {
      console.log(result.rows)
      return result.rows;
    } else {
      return NULL;
    }
  })
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
 const getAllProperties = function (options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  WHERE 1 = 1
  `;
  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryString += `AND owner_id = $${queryParams.length} `;
  }
  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `AND city LIKE $${queryParams.length} `;
  }
  if (options.minimum_price_per_night) {
    const minPrice = Number(options.minimum_price_per_night) * 100;
    queryParams.push(`${minPrice}`);
    queryString += `AND cost_per_night >= $${queryParams.length} `;
  }
  if (options.maximum_price_per_night) {
    const maxPrice = Number(options.maximum_price_per_night) * 100;
    queryParams.push(`${maxPrice}`);
    queryString += `AND cost_per_night <= $${queryParams.length} `;
  }

  // 4
  if (options.minimum_rating) {
    const minRating = options.minimum_rating;
    console.log(minRating);
    queryParams.push(`${minRating}`);
    queryString += `GROUP BY properties.id
    HAVING  avg(rating) >= $${queryParams.length} `;
  } else {
    queryString += `GROUP BY properties.id
     `
  }

  queryParams.push(limit);

  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams).then((res) => res.rows);
};
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const owner_id = property.owner_id;
  const title = property.title;
  const description = property.description;
  const thumbnail_photo_url = property.thumbnail_photo_url;
  const cover_photo_url = property.cover_photo_url;
  const cost_per_night = property.cost_per_night;
  const street = property.street;
  const city = property.city;
  const province = property.province;
  const post_code = property.post_code;
  const country = property.post_code;
  const parking_spaces = property.parking_spaces;
  const number_of_bathrooms = property.number_of_bathrooms;
  const number_of_bedrooms = property.number_of_bedrooms;

  return pool
  .query(`INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;`, [owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms])
  .then((result) => {
    if(result) {
      console.log(result.rows[0])
      return result.rows[0];
    } else {
      return NULL;
    }
  })



}
exports.addProperty = addProperty;
