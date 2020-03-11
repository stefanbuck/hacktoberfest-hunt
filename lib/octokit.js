require('dotenv').config()
require('assert')(process.env.GITHUB_TOKEN)
const { Octokit } = require('@octokit/core')
const { paginateRest } = require('@octokit/plugin-paginate-rest')
const MyOctokit = Octokit.plugin(paginateRest)
const octokit = new MyOctokit({ auth: process.env.GITHUB_TOKEN })

module.exports = octokit
