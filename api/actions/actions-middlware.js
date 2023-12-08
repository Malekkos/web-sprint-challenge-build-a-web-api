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
  const projectId = req.body.project_id
  const notes = req.body.notes
  const description = req.body.description
  const completed = req.body.completed
  if(!projectId || !notes || !description) {
    console.log("You are missing required fields!")
    req.projectId = undefined
    req.notes = undefined
    req.description = undefined
  } else {
    req.projectId = projectId
    req.notes = notes
    req.description = description
    req.completed = completed
  }
  next()
}

module.exports = {
  validateUserActionsId,
  validateActionsRequestBody
}