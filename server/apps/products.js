import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const collection = db.collection("products");
  const products = await collection.find().toArray();
  return res.json({ data: products });
});

productRouter.get("/:id", (req, res) => {});

productRouter.post("/", async (req, res) => {
  const collection = db.collection("products");
  const productData = { ...req.body };
  await collection.insertOne(productData);
  return res.json({
    message: "product has been created seccessfully",
  });
});

productRouter.put("/:productId", async (req, res) => {
  const id = new ObjectId(req.params.productId);
  const collection = db.collection("products");
  const updatedProductData = { ...req.body };
  await collection.updateOne({ _id: id }, { $set: updatedProductData });
  return res.json({
    message: "Product has been updated successfully",
  });
});

productRouter.delete("/:productId", async(req, res) => {
  const id = new ObjectId(req.params.productId);
  const collection = db.collection("products");
  await collection.deleteOne({_id:id})
  return res.json({
    message: "Product has been deleted successfully"
 }
 )
});

export default productRouter;
