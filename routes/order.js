const express = require("express")
const Order = require("../models/order")
const Cart = require("../models/cart")
const User = require("../models/user")
const Auth = require("../auth")
// const stripe = require('stripe')('sk_test_51K5oDhFyMddIu9oDIxWr4FhcaSElSU6IYZXfS04HH4YWz80STi6uJxe7lKrcThMKO3ZKysEVXbcSnuqJpkqRe4QW00ldfUU1v5');

const router = new express.Router()


//CREATE

router.post("/order", Auth, async (req, res) => {
    const owner = req.user._id;

    if (req.body.items.length === 0) {
        res.status(400).send({ message: 'Cart is empty' });
      }

    const items = req.body.items 
    let bill = 0
    items.map((item) => {
        bill += (item.quantity * item.price)
    })
    const newOrder = new Order({
        owner,
        items:req.body.items,
        address:req.body.address,
        bill,

        // status:req.body.status
    });
  
    try {
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //GET ALL

  router.get("/order", Auth, async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  });


//GET USER ORDERS
router.get("/order/:userId", Auth, async (req, res) => {
    try {
      const orders = await Order.find({ userId: req.params.userId });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  //UPDATE
router.put("/order/:id", Auth, async (req, res) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  //DELETE
router.delete("/order/:id", Auth, async (req, res) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json("Order has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });



module.exports = router







// //get orders

// router.get('/orders', Auth, async (req, res) => {
//     const owner = req.user._id;
//     try {
//         const order = await Order.find({ owner: owner }).sort({ date: -1 });
//         res.status(200).send(order)
//     } catch (error) {
//         res.status(500).send()
//     }
// })

