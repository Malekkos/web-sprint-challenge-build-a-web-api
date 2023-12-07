// Write your "projects" router here!
const express = require("express")
const { validateUserId } = require("./projects-middleware") // middleware import once done
const Projects = require("./projects-model")
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


router.post("/", (req, res, next) => {

})

router.put("/:id", (req, res, next) => {

})

router.delete("/:id", (req, res, next) => {

})

router.get("/:id/actions", (req, res, next) => {

})

router.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message,
    customMessage: "Something bad has happened inside of the projects router"
  })
})

module.exports = router