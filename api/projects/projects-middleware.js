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


module.exports = {
  validateUserId
}