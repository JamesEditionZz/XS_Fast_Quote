const express = require("express");
const sql = require("mssql");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs-extra");
const path = require("path");

const app = express();
const port = 5002;

app.use(cors());
app.use(bodyParser.json());

const config = {
  user: "sa",
  password: "P@55w0rd",
  server: "192.168.199.20",
  port: 1433,
  database: "dbXsfq",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

app.get("/api/get", async (req, res) => {
  try {
    const pool = await sql.connect(config);

    const result = await pool
      .request()
      .query(
        "SELECT DISTINCT Product_type,Product_name, Product_img, Product_img_name FROM Product_group"
      );

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("SQL error:", error);
    res.status(500).send("Error querying the database");
  } finally {
    await sql.close();
  }
});

app.get(`/api/equipment_list`, async (req, res) => {
  try {
    const pool = await sql.connect(config);

    const { id } = req.query;

    if (id) {
      storedProductType = id;
    }

    const result = await pool
      .request()
      .input("ProductType", sql.VarChar, storedProductType)
      .execute("dbProduct_list");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("Error fetching equipment list:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post(`/api/model`, async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const model = req.body;

    const result = await pool
      .request()
      .input("value", sql.VarChar, model.Product_model)
      .input("type", sql.VarChar, model.type)
      .execute("dbGET_model");


    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("Error fetching model:", error); // Log ข้อผิดพลาด
    res.status(500).send("Internal Server Error");
  }
});

app.post(`/api/size`, async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const model = req.body;

    const result = await pool

      .request()
      .input("value", sql.VarChar, model.productName)
      .execute("dbfind_size_model");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
  }
});

app.post(`/api/checksize`, async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const { width, height, depth, product_model, product_type } = req.body;

    const widthValue = width ? width : null;
    const heightValue = height ? height : null;
    const depthValue = depth ? depth : null;
    const modelValue = product_model ? product_model : null;

    const result = await pool

      .request()
      .input("width", sql.VarChar, widthValue)
      .input("height", sql.VarChar, heightValue)
      .input("depth", sql.VarChar, depthValue)
      .input("modelValue", sql.VarChar, modelValue)
      .input("Product_type", sql.VarChar, product_type)
      .execute("dbfind_model");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
  }
});

app.post(`/api/checkprice`, async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const { lowPrice, highPrice, product_model, product_type } = req.body;

    const lowPriceValue = lowPrice ? lowPrice : null;
    const highPriceValue = highPrice ? highPrice : null;
    const modelValue = product_model ? product_model : null;

    const result = await pool

      .request()
      .input("lowPrice", sql.VarChar, lowPriceValue)
      .input("highPrice", sql.VarChar, highPriceValue)
      .input("modelValue", sql.VarChar, modelValue)
      .input("Product_type", sql.VarChar, product_type)
      .execute("dbfind_Price_model");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
  }
});

app.post(`/api/selectItem`, async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const { type, product_model, product_type } = req.body;

    const result = await pool

      .request()
      .input("type", sql.VarChar, type)
      .input("product_name", sql.VarChar, product_model)
      .execute("dbfind_type");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
  }
});

app.post(`/api/Accessories`, async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const selectedProduct = req.body.selectedProduct;

    const result = await pool

      .request()
      .input("Product_name", sql.VarChar, selectedProduct.Product_name)
      .input("Product_model", sql.VarChar, selectedProduct.Product_model)
      .input("category", sql.VarChar, selectedProduct.category)
      .input("type", sql.VarChar, selectedProduct.type)
      .input("depth", sql.Int, selectedProduct.depth)
      .input("width", sql.Int, selectedProduct.width)
      .input("height", sql.Int, selectedProduct.height)

      .execute("dbSelect_Accesseries");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
  }
});

app.get(`/api/Screen`, async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().execute("db_Accessories_Screen");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
  }
});

app.get(`/api/Flip`, async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().execute("db_Accesseries_Flip");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
  }
});

app.get(`/api/Electric`, async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().execute("db_Accesseries_Electric");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
  }
});

app.get(`/api/Snake`, async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().execute("db_Accesseries_Snake");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
  }
});

app.post(`/api/ProductReport`, async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const { Product, color } = req.body;

    const productData = JSON.parse(Product);

    const result = await pool

      .request()
      .input("Product_name", sql.VarChar, productData.Product_name)
      .input("Product_model", sql.VarChar, productData.Product_model)
      .input("category", sql.VarChar, productData.category)
      .input("type", sql.VarChar, productData.type)
      .input("depth", sql.Int, productData.depth)
      .input("width", sql.Int, productData.width)
      .input("height", sql.Int, productData.height)
      .input("color", sql.VarChar, color)
      .execute("db_TableReport");

    res.status(200).json(result.recordset);

  } catch (error) {
    console.log(error);
  }
});

app.post(`/api/Chairproductreport`, async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const { Product } = req.body;    

    const result = await pool

      .request()
      .input("Product_name", sql.VarChar, Product.Product_name)
      .input("Product_model", sql.VarChar, Product.Product_model)
      .input("type", sql.VarChar, Product.type)
      .input("depth", sql.Int, Product.depth)
      .input("width", sql.Int, Product.width)
      .input("height", sql.Int, Product.height)
      .execute("db_ChairReport");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
  }
});

app.post(`/api/Report/modesty`, async (req, res) => {
  try {
    const pool = await sql.connect(config);

    const modesty = req.body;

    const result = await pool
      .request()
      .input("modesty", sql.VarChar, modesty.modesty)
      .query("SELECT * FROM Accessories WHERE Access_name = @modesty");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
  }
});

app.post(`/api/Report/Screen`, async (req, res) => {
  try {
    const pool = await sql.connect(config);

    const screen = req.body;

    const result = await pool
      .request()
      .input("screen", sql.VarChar, screen.screen)
      .query("SELECT * FROM Accessories WHERE Access_name = @screen");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
  }
});

app.post(`/api/Report/Flip`, async (req, res) => {
  try {
    const pool = await sql.connect(config);

    const flip = req.body;

    const result = await pool
      .request()
      .input("flip", sql.VarChar, flip.flip)
      .query("SELECT * FROM Accessories WHERE Access_name = @flip");


    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
  }
});

app.post(`/api/Report/Wireway`, async (req, res) => {
  try {
    const pool = await sql.connect(config);

    const wireway = req.body;

    const result = await pool
      .request()
      .input("wireway", sql.VarChar, wireway.Snake)
      .query("SELECT * FROM Accessories WHERE Access_name = @wireway");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
  }
});

app.post(`/api/Report/Electric`, async (req, res) => {
  try {
    const pool = await sql.connect(config);

    const Electric = req.body;

    const result = await pool
      .request()
      .input("Electric", sql.VarChar, Electric.Electric)
      .query("SELECT * FROM Accessories WHERE Access_name = @Electric");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
  }
});

app.post(`/api/searchProductmodel`, async (req, res) => {
  try {
    const pool = await sql.connect(config);

    const {e, product_type, product_Name} = req.body;

    const result = await pool
    .request()
    .input("Product_name", sql.VarChar, product_Name)
    .input("Product_modal", sql.VarChar, e)
    .input("product_type", sql.VarChar, product_type)
    .execute("dbsearchProduct_Modal")

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
    
  }
})

////// backendDashboard ///////

app.post(`/backenddashboard/check/member`, async (req, res) => {
  try {
    const pool = await sql.connect(config);

    const { username, password } = req.body;

    const result = await pool
      .request()
      .input("username", sql.VarChar, username)
      .input("password", sql.VarChar, password)
      .execute("db_slogin");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
  }
});

app.get(`/backenddashboard/list_product`, async (req, res) => {
  try {
    const pool = await sql.connect(config);

    const result = await pool.request().execute("db_product");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
  }
});

app.post("/backenddashboard/searchItem", async (req, res) => {
  try {
    const pool = await sql.connect(config);

    const { model } = req.body;

    const result = await pool
      .request()
      .input("model", sql.VarChar, model)
      .execute("db_searchItem");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
  }
});

app.get(`/backenddashboard/list_accessories`, async (req, res) => {
  try {
    const pool = await sql.connect(config);

    const result = await pool.request().execute("db_Accessories");


    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
  }
});

app.post(`/backenddashboard/searchaccessories`, async (req, res) => {
  try {
    const pool = await sql.connect(config);

    const { access } = req.body;

    const result = await pool
      .request()
      .input("access", sql.VarChar, `%${access}%`)
      .query(
        `SELECT DISTINCT Access_type FROM Accessories WHERE Access_type LIKE @access`
      );

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
  }
});

app.post(`/backenddashboard/Delete_Item`, async (req, res) => {
  try {
    const pool = await sql.connect(config);

    const { ID } = req.body;

    const result = await pool
      .request()
      .input("Access_ID", sql.Int, ID)
      .execute(`Delete_Accessories`);

    res.status(200).json(result.recordset);
    
  } catch (error) {
    console.error(error);
  }
});

app.get(`/backenddashboard/list_group`, async (req, res) => {
  try {
    const pool = await sql.connect(config);

    const result = await pool.request().query("SELECT * FROM Product_group");

    res.status(200).json(result.recordset);
    
  } catch (error) {
    console.error(error);
  }
});

app.post(`/post/product`, async (req, res) => {
  try {
    const pool = await sql.connect(config);

    const product_Color = req.body.product_Color;

    const {
      product_Type,
      product_name,
      product_Model,
      product_Category,
      product_FG,
      product_Width,
      product_Depth,
      product_Height,
      product_Price,
      product_Ctype,
      product_Cfunction,
      product_Cfeature,
      pathFile,
      Image,
    } = req.body;

    const path = pathFile.replace(/\\\\/g, "\\");

    for (let index = 0; index < product_Color.length; index++) {
      const result = await pool
        .request()
        .input("product_Type", sql.VarChar, product_Type)
        .input("product_name", sql.VarChar, product_name)
        .input("product_Model", sql.VarChar, product_Model)
        .input("product_Category", sql.VarChar, product_Category)
        .input("product_FG", sql.VarChar, product_FG)
        .input("product_Width", sql.Int, product_Width)
        .input("product_Depth", sql.Int, product_Depth)
        .input("product_Height", sql.Int, product_Height)
        .input("product_Price", sql.Int, product_Price)
        .input("product_Ctype", sql.VarChar, product_Ctype)
        .input("product_Cfunction", sql.VarChar, product_Cfunction)
        .input("product_Cfeature", sql.VarChar, product_Cfeature)
        .input("pathFile", sql.VarChar, path)
        .input("Image", sql.VarChar, Image)
        .input("product_Color", sql.VarChar, product_Color[index])
        .execute(`Insert_Product`);
    }

    res.status(200).json("true");
  } catch (error) {
    console.error(error);
  }
});

app.post(`/backenddashboard/Insert_Accessories`, async (req, res) => {
  try {
    const pool = await sql.connect(config);

    const {
      fg,
      selectAccessories,
      modal,
      width,
      depth,
      height,
      price,
      path_File,
      image,
    } = req.body;

    const path = path_File.replace(/\\\\/g, "\\");
    const name_image = image.split(".").slice(0, -1).join(".");

    const result = await pool
      .request()
      .input("Access_name", sql.VarChar, modal)
      .input("Access_type", sql.VarChar, selectAccessories)
      .input("Access_price", sql.VarChar, price)
      .input("Access_width", sql.VarChar, width)
      .input("Access_depth", sql.VarChar, depth)
      .input("Access_height", sql.VarChar, height)
      .input("Access_img", sql.VarChar, path)
      .input("Access_FG", sql.VarChar, fg)
      .input("Access_img_name", sql.VarChar, name_image)
      .execute(`Insert_Accessories`);

    res.status(200).json(true);
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
