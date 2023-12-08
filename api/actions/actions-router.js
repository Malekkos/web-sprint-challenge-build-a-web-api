// Write your "actions" router here!
const express = require("express")
//const { } = require("./actions-middleware") for once actions middleware is fleshed out
const Actions = require("./actions-model")
const router = express.Router()

router.get("/", (req, res, next) => {

  Actions.get()
  .then(actions => {
    res.status(200).json(actions)
  })
  .catch(error => {
    next(error)
  })
})

router.get("/:id", (req, res, next) => {

})

router.post("/", (req, res, next) => {

})

router.put("/:id", (req, res, next) => {

})

router.delete("/:id", (req, res, next) => {

})

router.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message,
    customeMessage: "Something bad has happened inside of the actions router"
  })
})

module.exports = router