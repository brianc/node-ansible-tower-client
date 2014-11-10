var express = require('express')
var app = module.exports = express()

var template = {
  id: 1,
  job_type: 'run'
}

var job = {
  id: 3
}

app.get('/api/v1/job_templates', function(req, res, next) {
  if(req.query.name != 'test') {
    return res.json({count: 2})
  }

  return res.json({
    count: 1,
    results: [template]
  })
})

app.post('/api/v1/job_templates/:id/jobs/', function(req, res, next) {
  if(req.params.id != template.id) {
    return res.status(400).end()
  }

  return res.json(job)
})

app.post('/api/v1/jobs/:id/start/', function(req, res, next) {
  if(req.params.id != job.id) {
    return res.status(400).end()
  }

  return res.status(202).end()
})

app.use(function(req, res, next) {
  next()
})
