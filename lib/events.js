const timeago = require('time-ago').ago

module.exports = async function getEvents (username) {
  let totalEvents = 0
  const maxEvents = 1000
  const octokit = await require('./octokit')()
  const events = await octokit.paginate(
    'GET /users/:username/events',
    {
      username: username || octokit.user,
      per_page: 100
    },
    (response, done) => {
      totalEvents += response.data.length
      if (totalEvents >= maxEvents) done()
      return response.data
    }
  )

  return events
    .map(event => {
      event.created_at = new Date(event.created_at)
      event.timeago = timeago(event.created_at)
      return event
    })
    .sort((a, b) => b.created_at - a.created_at)
}
