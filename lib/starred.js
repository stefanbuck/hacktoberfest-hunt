module.exports = async function getStarredRepos (username) {
  let total = 0
  const maxStarredReposs = 2000
  const octokit = await require('./octokit')()
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

  return events
}
