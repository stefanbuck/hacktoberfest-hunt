#!/usr/bin/env node

const getStarredRepos = require('./lib/starred')
const getTopic = require('./lib/topics')
const { mapLimit } = require('async')
const args = process.argv.slice(2)
const username = args[0]

main()

async function main () {
  const starredRepos = await getStarredRepos(username)

  mapLimit(starredRepos, 20, getTopic, (err, res) => {
    if (err) {
      console.log(err)
      process.exit(1)
    }

    const repos = res.filter(repo => repo.topics.includes('hacktoberfest'))

    repos.forEach(repo => {
      console.log(repo.html_url)
    })
    console.log('\n%s out of %s are participating in Hacktoberfest', repos.length, starredRepos.length)
  })
}
