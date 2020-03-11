module.exports = async function getEvents (username) {
  const maxEvents = 1000
  let totalEvents = 0

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
}
