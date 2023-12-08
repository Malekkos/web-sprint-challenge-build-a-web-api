// add middlewares here related to actions
const Actions = require("./actions-model")

async function validateUserActionsId(req, res, next) {
  console.log("Validating User ID...")
  const id = req.params.id
  const user = await Actions.get(req.params.id)
  if(!user) {
    res.status(404).json({message: "this id doesnt exist!"})
  } else {
    req.user = user
    req.id = id
  }
  next()
}

async function validateActionsRequestBody(req, res, next) {
  console.log("Validating request body...")
  const body = req.body
  if(!body.name || !body.description) {
    console.log("there is incompleted fields")
  } else {
    req.name = req.body.name
    req.description = req.body.description
    req.completed = req.body.completed
  }
  next()
}

module.exports = {
  validateUserActionsId,
  validateActionsRequestBody
}