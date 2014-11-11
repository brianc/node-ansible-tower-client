# ansible-tower-client

Easy way to kick of a job in ansible tower from a template by name.

## install

```sh
$: npm install ansible-tower-client
```

## use

```js
var client = require('ansible-tower-client')
var config = {
  host: 'localhost',
  user: 'ansible-tower-user',
  pass: 'ansible-tower-password',
  name: 'ansible-job-template-name'
}

client(config, function(err) {
  if(err) {
    console.log('Job could not be created')
    return console.log(err)
  }
  console.log('job', config.name, 'started!')
})
```

## api

Right now this module just exports a single function you can invoke to start a job on ansible tower.  The function takes a config object & a callback which is called with an error if there was a problem starting the job.

The config object has the following options:

- __name__: (required) the name of the job template to use
- __host__: (required) the host of the ansible tower server. e.g. `localhost` or `towerserver.company.com`
- __user__: (required) the user name to use to kick of the job. This user must exist in your tower setup.
- __pass__: (required) the password of the user above.
- __protocol__: either `https` or `http`. Default is `https`.


### license

The MIT License (MIT)

Copyright (c) 2014 Brian M. Carlson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
