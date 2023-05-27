const express = require('express')
const router = express.Router();
const path = require('path');
const data = {}
data.employees = require('../../data/employees.json')

router.route('/')
.get((req, res, next) => {
    res.json(data.employees)
})
.post((req, res, next) => {
    res.json({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    })
})
.put((req, res, next) => {
    res.json({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    })
})
.delete((req, res, next) => {
    res.json({
        "id": req.body.id
    })
})


module.exports = router;