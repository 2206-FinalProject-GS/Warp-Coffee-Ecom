const client = require("./client");


async function createImage({URL}) {  
    console.log("initiating create image")
    try {
      const {
        rows: [image],
      } = await client.query(
        `
        INSERT INTO imageUrl(id) 
        VALUES($1) 
        RETURNING *;
      `,
        [URL]
      );
      if (!image) {
        console.log("no image found")
        return null;
      }
      console.log(image,"finished creating image")
      return image;
    } catch (error) {
      throw error;
    }
  }
  async function getImagebyId(imageId) {
    console.log("initiating get image by ID")

    try {
      const {
        rows: [image],
      } = await client.query(`
      SELECT id, image 
      FROM imageUrl
      WHERE id =${imageId};
      `);
      if (!image) {
        console.log("no image found")
        return null;
      }
      console.log("finished getting image")
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