module.exports = async function getStarredRepos (username, spinnies) {
  let total = 0
  const maxStarredReposs = 2000
  const octokit = await require('./octokit')()

  spinnies.add('loading', { text: 'Retrieving your starred repositories...' })

  const events = await octokit.paginate(
    'GET /users/:username/starred',
    {
      username: username || octokit.user,
      per_page: 100
    },
    (response, done) => {
      total += response.data.length
      if (total >= maxStarredReposs) done()
      return response.data
    }
  )

  spinnies.succeed('loading', { text: 'Retrieved your starred repositories.' });
  
  return events
}
