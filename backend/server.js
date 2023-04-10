const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const shortid = require('shortid');
const cors =  require('cors')
const app = express()
const port = 5000
app.use(bodyParser.json());
app.use(cors())
/* mongoose.connect("mongodb://localhost/react-shop-db",{
useNewUrlParser: true,
useCreateIndex:true,
useUnifiedTopology:true
});
 */
mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected!'));
  
const Product = mongoose.model(
"products",
new mongoose.Schema({
    _id:{type: String,default:shortid.generate},
    title:String,
    description:String,
    image:String,
    price:Number,
    availableSizes:[String],
})
);

app.post("/api/products",async (req,res) =>{
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
}
)

app.get("/api/products",async (req,res) =>{
    const products = await Product.find({});
    res.send(products);

}
)

app.delete("/api/products/:id",async (req,res) =>{
    const deletedProduct = await Product.findByIdAndDelete(req.params.id)
    res.send(deletedProduct);
});

app.get('/', (req, res) => {
  res.send('MaanavaN Learn Code - React JS Training')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})