// add middlewares here related to projects

const Projects = require("./projects-model")

async function validateUserId(req, res, next) {
  console.log("Validating User ID...")
  const id = req.params.id
  const user = await Projects.get(req.params.id)
  if(!user) {
    res.status(404).json({message: "this id doesnt exist!"})
  } else {
    req.user = user
    req.id = id
  }
  next()
}

async function validateRequestBody(req, res, next) {
  console.log("Validating request body...")
  const body = req.body
  console.log("this is the body", body)
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
  validateUserId,
  validateRequestBody
}