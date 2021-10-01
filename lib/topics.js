module.exports = async function getEvents (data) {
  const [owner, repo] = data.full_name.split('/')
  const octokit = await require('./octokit')()
  const events = await octokit.request(
    'GET /repos/:owner/:repo/topics',
    {
      owner,
      repo,
      per_page: 100
    }
  )

  return {
    html_url: data.html_url,
    topics: events.data.names
  }
}
