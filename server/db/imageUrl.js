const client = require("./client");


async function createImage(URL) {  
    console.log("initiating create image")
    try {
      const {
        rows: [image],
      } = await client.query(
        `
        INSERT INTO imageUrl(url) 
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
    console.log(imageId,"initiating get image by ID")

    try {
      const {
        rows: [image],
      } = await client.query(`
      SELECT * 
      FROM imageUrl
      WHERE id =${imageId};
      `);
      if (!image) {
        console.log(image, "no image found")
        return null;
      }
      console.log("finished getting image")
    return image;
} catch (error) {
  throw error;
}
}

async function updateImageUrl(imageId, {...fields}) {
    const setString = Object.keys(fields)
      .map((key, index) => `"${key}"=$${index + 1}`)
      .join(", ");
      console.log(imageId, setString, fields, "intiating update ImageUrl")
  
      if (setString.length === 0) {
        console.log("no update")
        return;
      }
      try {
        const {
          rows: [image],
        } = await client.query(
          `
      UPDATE imageUrl
      SET ${setString}
      WHERE id=${imageId}
      RETURNING *;
      `,
          Object.values(fields)
        );
        console.log("finish updating image")
        return image;
    } catch (error) {
      throw error;
    }
  }

  async function destroyImage(id) {
    console.log(id,"intiating delete image url")
    try {
      const {
        rows: [image],
      } = await client.query(
        `
      DELETE FROM imageUrl
      WHERE id = ${id}
      RETURNING *;
      `,
      );
      console.log(image, "DELETING image URL");
      return image;
    } catch (error) {
      throw error;
    }}
  
  
  
  module.exports = {
createImage,
getImagebyId,
updateImageUrl,
destroyImage,

}