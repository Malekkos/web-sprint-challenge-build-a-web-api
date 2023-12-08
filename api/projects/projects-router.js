// Write your "projects" router here!
const express = require("express")
const { validateUserId, validateRequestBody } = require("./projects-middleware") // middleware import once done
const Projects = require("./projects-model")
const Actions = require("../actions/actions-model")
const router = express.Router()


router.get("/", (req, res, next) => {
  console.log("getting projects...")
  Projects.get()
  .then(projects => {
    console.log(projects)
    res.status(200).json(projects)
  })
  .catch(error => {
    next(error)
  })
})

router.get("/:id", validateUserId, (req, res, next) => {
  if(!req.user || !req.id) {
    console.log("you fooled yourself!")
  } else {
  Projects.get(req.id)
  .then(project => {
    res.status(200).json(project)
  })
  .catch(error => {
    next(error)
  })
}
})


router.post("/", validateRequestBody, (req, res, next) => {
  if(!req.name || !req.description) {
    res.status(400).json({
      message: "You fooled yourself!"
    })
  } else {
  Projects.insert({name: req.name, description: req.description, completed: req.completed})
  .then(project => {
    res.status(201).json(project)
  })
  .catch(error => {
    next(error)
  })
}
})

router.put("/:id", validateUserId, validateRequestBody, (req, res, next) => {
  const body = req.body.completed
  if(body === undefined || !req.name || !req.description) {
    res.status(400).json({message: "lol"})
  } else {
  if(!req.id) {
    res.status(404).json({message: "You fooled yourself!"})
  } else {
    Projects.update(req.id, {name: req.name, description: req.description, completed: req.completed})
    .then(project => {
      // console.log("this is the project", project)
      res.status(201).json(project)
    })
    .catch(error => {
      next(error)
    })
  }
}
})

router.delete("/:id", validateUserId, (req, res, next) => {
  Projects.remove(req.id)
  .then(project => {
    res.status(204).json(project)
  })
  .catch(error => {
    next(error)
  })
})

router.get("/:id/actions", validateUserId, (req, res, next) => {
  Projects.getProjectActions(req.id)
  .then(project => {
    res.status(200).json(project)
  })
  .catch(error => {
    next(error)
  })
})

router.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message,
    customMessage: "Something bad has happened inside of the projects router"
  })
})

module.exports = router