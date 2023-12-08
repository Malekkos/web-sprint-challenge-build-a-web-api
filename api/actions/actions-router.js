// Write your "actions" router here!
const express = require("express")
const { validateUserActionsId, validateActionsRequestBody } = require("./actions-middlware")
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

router.get("/:id", validateUserActionsId, (req, res, next) => {
  Actions.get(req.id)
  .then(action => {
    res.status(200).json(action)
  })
  .catch(error => {
    next(error)
  })
})

router.post("/", validateActionsRequestBody, (req, res, next) => {
  if(req.notes === undefined || req.description === undefined || req.projectId === undefined) {
    res.status(400).json({message: "You are missing vital fields"})
  } else {
  Actions.insert({project_id: req.projectId, description: req.description ,notes: req.notes, completed: req.completed})
  .then(createdAction => {
    console.log(createdAction)
    res.status(201).json(createdAction)
  })
  .catch(error => {
    next(error)
  })
  }
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