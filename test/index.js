process.env.TOWER_PROTOCOL = 'http'

var app = require('./server')
var client = require('../')
var assert = require('assert')

describe('client', function() {
  before(function(done) {
    this.server = require('http').createServer(app)
    this.server.listen(20401, done)
  })

  it('has success', function(done) {
    var options = {
      user: 'brian',
      pass: 'test1',
      host: 'localhost:20401',
      name: 'test'
    }
    client(options, done)
  })

  it('handles missing template with an error', function(done) {
    var options = {
      user: 'brian',
      pass: 'test1',
      host: 'localhost:20401',
      name: 'test-missing'
    }
    client(options, function(err) {
      assert(err, 'should have returned an error on missing job template')
      done()
    })
  })

  after(function() {
    this.server.close()
  })
})

