const { Octokit } = require('@octokit/core')
const { paginateRest } = require('@octokit/plugin-paginate-rest')
const pkg = require('../package.json')

module.exports = async function getOctokit () {
  const ghauth = require('ghauth')
  const authOptions = {
    noDeviceFlow: true,
    noSave: false,
    configName: pkg.name,
    note: pkg.description
  }

  const { user, token: auth } = await ghauth(authOptions)

  const MyOctokit = Octokit.plugin(paginateRest)
  const octokit = new MyOctokit({ auth, previews: ['mercy-preview'] })
  octokit.user = user
  return octokit
}
