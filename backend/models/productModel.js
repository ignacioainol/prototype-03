import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, requred: true, unique: true },
    slug: { type: String, requred: true, unique: true },
    image: { type: String, requred: true },
    brand: { type: String, requred: true },
    category: { type: String, requred: true },
    description: { type: String, requred: true },
    price: { type: Number, requred: true },
    countInStock: { type: Number, requred: true },
    rating: { type: Number, requred: true },
    numReviews: { type: Number, requred: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
