const pool = require("../config/db"); // Database connection

const getProductsForHomepage = async (req, res) => {
  try {
    const result = await pool.query(`
        SELECT 
          p.product_id, p.name, p.description, p.default_price, p.average_rating, pi.image_url AS primary_image
        FROM products p
        LEFT JOIN product_images pi ON pi.product_id = p.product_id AND pi.is_primary = true
        LIMIT 10;
      `);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching products for homepage:", error.message);
    console.error(error.stack); // This will give the stack trace for debugging
    res.status(500).send("Server error");
  }
};

const searchProducts = async (req, res) => {
  const { query } = req.params; // Assume query is passed as a URL parameter
  try {
    const result = await pool.query(
      `
        SELECT 
          p.product_id, p.name, p.description, p.default_price, p.average_rating, pi.image_url AS primary_image
        FROM products p
        LEFT JOIN product_images pi ON pi.product_id = p.product_id AND pi.is_primary = true
        WHERE p.name ILIKE $1  // Case-insensitive search
        LIMIT 10;  // Limit the number of results to avoid overloading
      `,
      [`%${query}%`]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).send("Server error");
  }
};

const getProductDetail = async (req, res) => {
  const { productId } = req.params; // Get product ID from URL params
  try {
    const result = await pool.query(
      `
        SELECT 
          p.product_id, p.name, p.description, p.default_price, p.average_rating, p.review_count,
          pi.image_url AS primary_image,
          pv.variation_id, pv.variation_name, pv.variation_price,
          pv_images.image_url AS variation_image
        FROM products p
        LEFT JOIN product_images pi ON pi.product_id = p.product_id AND pi.is_primary = true
        LEFT JOIN product_variations pv ON pv.product_id = p.product_id
        LEFT JOIN product_variation_images pv_images ON pv_images.variation_id = pv.variation_id
        WHERE p.product_id = $1;  // Get specific product by ID
      `,
      [productId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).send("Server error");
  }
};

module.exports = { getProductsForHomepage, searchProducts, getProductDetail };
