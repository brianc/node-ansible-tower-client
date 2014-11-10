var request = require('request')
var _ = require('lodash')
var async = require('async')

var runJob = module.exports = function(config, cb) {

  var host = config.host || process.env.TOWER_HOST
  var pass = config.pass || process.env.TOWER_PASS
  var user = config.user || process.env.TOWER_USER

  var protocol = process.env.TOWER_PROTOCOL || 'https'
  var ROOT_URL = protocol + '://' + host + '/api/v1'

  var name = config.name

  var options = function(extra) {
    var url = ROOT_URL + extra.path
    var options = {
      method: 'OPTIONS',
      json: true,
      uri: url,
      strictSSL: false,
      auth: {
        user: user,
        pass: pass
      }
    }
    return _.extend(options, extra)
  }


  var check = function(after) {
    return function(err, res) {
      if(err) return cb(err)

      if(res.statusCode > 299) {
        var msg = 'Bad status code: ' + res.statusCode
        var err = new Error(msg)
        err.body = res.body
        err.headers = res.headers
        return cb(err)
      }

      return after(res.body)
    }
  }

  var getTemplate = function(name, cb) {
    var opts = options({
      method: 'GET',
      path: '/job_templates?name=' + name
    })

    request(opts, check(function(body) {
      if(body.count !== 1) {
        var msg = 'Received ' + body.count + ' results. Expected exactly 1'
        return cb(new Error(msg))
      }
      cb(null, body.results[0])
    }))
  }

  var createJob = function(template, cb) {
    var id = template.id
    delete template.id
    var opts = options({
      method: 'POST',
      json: template,
      path: '/job_templates/' + id + '/jobs/'
    })
    request(opts, check(function(body) {
      cb(null, body)
    }))
  }

  var startJob = function(job, cb) {
    var opts = options({
      method: 'POST',
      path: '/jobs/' + job.id + '/start/'
    })
    request(opts, check(function(body) {
      cb(null, body)
    }))
  }

  var seed = function(cb) {
    cb(null, name)
  }

  var tasks = [seed, getTemplate, createJob, startJob]

  async.waterfall(tasks, cb)
}
