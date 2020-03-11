const { Octokit } = require('@octokit/core')
const { paginateRest } = require('@octokit/plugin-paginate-rest')
const pkg = require('../package.json')

module.exports = async function getOctokit () {
  const ghauth = require('ghauth')
  const authOptions = {
    configName: pkg.name,
    scopes: [ 'repo' ],
    note: pkg.description
  }
  
  const { user, token: auth } = await ghauth(authOptions)

  const MyOctokit = Octokit.plugin(paginateRest)
  const octokit = new MyOctokit({ auth })
  octokit.user = user
  return octokit
}