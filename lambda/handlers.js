var aws = require('aws-sdk')

// Instance status
exports.status = (event, context) => {
  return _run(event, context, 'describeInstances')
}

// Start instance
exports.start = (event, context) => {
  return _run(event, context, 'startInstances')
}

// Stop instance
exports.stop = (event, context) => {
  return _run(event, context, 'stopInstances')
}

const _run = (event, context, method) => {
  const instanceId = process.env.INSTANCE_ID
  if (!instanceId) {
    const error = 'No instanceId provided'
    console.error(error)
    return context.fail(error)
  }

  aws.config.update({region: 'us-east-1'})
  const params = {
    InstanceIds: [ instanceId ],
  }

  new aws.EC2()[method](params, function(error, data) {
    if (error) {
      console.error(error)
      context.fail(error)
    }

    context.succeed(data)
  })
}
