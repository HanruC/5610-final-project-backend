const path = require("path");
const goodsService = require("./goods.service");

class GoodsController {
  constructor() {}

  getGoodsOfSeller = async (req, res) => {
    try {
      const seller = req.user;
      const goods = await goodsService.fetchVendorProducts(seller.id);
      res.status(200).json(goods);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  };

  searchGoods = async (req, res) => {
    try {
      const { query } = req.params;
      const goods = await goodsService.searchProducts(query);
      res.status(200).json(goods);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  getAllGoods = async (req, res) => {
    try {
      const goods = await goodsService.searchProducts();
      res.status(200).json(goods);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  getGoodsDetail = async (req, res) => {
    try {
      const { id } = req.params;
      const goods = await goodsService.getProductDetails(id);
      res.status(200).json(goods);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  };

  createGoods = async (req, res) => {
    try {
      let imagePaths = [],
          imageNames = [];
      const user = req.user,
          uploadPath = "/images",
          goods = req.body;

      imageNames = req.body.imageNames.split(",");
      await Promise.all(
          imageNames.map((imageName) => {
            return new Promise((resolve, reject) => {
              const file = req.files[imageName];
              const filePath =
                  uploadPath + "/" + user.id + Date.now() + ".jpg";
              const mvPath = path.resolve(__dirname, "../public/" + filePath);
              file.mv(mvPath, (err) => {
                if (err) return reject(err);
                imagePaths.push(filePath);
                resolve();
              });
            });
          })
      );

      goods.imageUrls = imagePaths;
      goods.vendor = user.id;
      await goodsService.createProduct(goods);
      res.status(200).json({ msg: "ok" });
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  };

  updateGoods = async (req, res) => {
    try {
      let imagePaths = [],
          imageNames = [];
      const user = req.user,
          uploadPath = "/images",
          goods = req.body,
          goodsId = req.params.id;

      if (req.body.imageNames) {
        imageNames = req.body.imageNames.split(",");
        await Promise.all(
            imageNames.map((imageName) => {
              return new Promise((resolve, reject) => {
                const file = req.files[imageName];
                const filePath =
                    uploadPath + "/" + user.id + Date.now() + ".jpg";
                const mvPath = path.resolve(__dirname, "../public/" + filePath);
                file.mv(mvPath, (err) => {
                  if (err) return reject(err);
                  imagePaths.push(filePath);
                  resolve();
                });
              });
            })
        );

        goods.imageUrls = imagePaths;
      }

      await goodsService.updateProduct(goodsId, goods);
      res.status(200).json({ msg: "ok" });
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  };

  removeGoods = async (req, res) => {
    try {
      const { id } = req.params;
      const user = req.user;
      const goods = await goodsService.getProductDetails(id);
    
      if (user.id !== goods.vendor._id.toString()) {
        return res.status(403).send("Forbidden");
      }
      await goodsService.deleteProduct(id);
      res.status(200).send({ msg: "ok" });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  };

  getProductOfVendor = async (req, res) => {
    try {
      const { vendorId } = req.params;
      const goods = await goodsService.getProductOfVendor(vendorId);
      res.status(200).json(goods);
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  }
}

module.exports = new GoodsController();
