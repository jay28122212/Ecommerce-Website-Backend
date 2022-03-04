const express = require('express')
const userRouter = require('./routes/user')
const itemRouter =require('./routes/item')
const cartRouter = require('./routes/cart')
const orderRouter = require('./routes/order')
const stripeRoute = require("./routes/stripe");


require('./db/databse')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(itemRouter)
app.use(cartRouter)
app.use(orderRouter)
app.use(stripeRoute)



var port = process.env.PORT || 3000;
app.listen(port, function () {
console.log(`Server Has Started! ${port}`);
});