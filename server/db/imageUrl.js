const client = require("./client");


async function createImage({URL}) {  
    try {
      const {
        rows: [image],
      } = await client.query(
        `
        INSERT INTO imageUrl(URL) 
        VALUES($1) 
        RETURNING *;
      `,
        [URL, isProduct]
      );
      if (!image) {
        return null;
      }
  
      return image;
    } catch (error) {
      throw error;
    }
  }
  async function getImagebyId(imageId) {
    try {
      const {
        rows: [image],
      } = await client.query(`
      SELECT id, image 
      FROM imageUrl
      WHERE id =${imageId};
      `);
      if (!image) {
        return null;
      }

    return image;
} catch (error) {
  throw error;
}
}

async function updateImageUrl({image}) {
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
      UPDATE imageUrl
      SET ${setString}
      WHERE id=${image}
      RETURNING *;
      `,
          Object.values(fields)
        );
        return product;
    } catch (error) {
      throw error;
    }
  }

  
  module.exports = {
createImage,
getImagebyId,
updateImageUrl

}