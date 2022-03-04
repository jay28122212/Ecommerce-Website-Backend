const express = require("express")
const Auth = require("../auth")
const Order = require("../models/order")
const Cart = require("../models/cart")
const User = require("../models/user")
const router = new express.Router()


const stripe = require('stripe')('sk_test_51KZXr4SHlyfCZ45ViYpof7smYCTP9bGL932e6unCm85db9EZZFxsM2pROkvMe5ILQOdMmZOrGw3ybwy15yWcCbyV00HpnLimPv');

router.post("/payment",async (req, res) => {
 stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
          res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});
module.exports = router
