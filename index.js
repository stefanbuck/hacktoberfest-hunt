#!/usr/bin/env node

const getStarredRepos = require('./lib/starred')
const getTopic = require('./lib/topics')
const { mapLimit } = require('async')
const Spinnies = require('spinnies')
const args = process.argv.slice(2)
const username = args[0]

main()

async function main () {
  const spinnies = new Spinnies()
  const starredRepos = await getStarredRepos(username, spinnies)

  spinnies.add('loading', { text: 'Processing...' })

  mapLimit(starredRepos, 20, getTopic, (err, res) => {
    if (err) {
      spinnies.fail('loading', { text: 'Error occurred!' })
      console.log(err)
      process.exit(1)
    }

    const repos = res.filter(repo => repo.topics.includes('hacktoberfest'))

    console.log('From %s of your starred repositories %s are participating in Hacktoberfest\n', starredRepos.length, repos.length)

    for (const repo of repos) {
      console.log(repo.html_url)
    }

    spinnies.succeed('loading', { text: 'Done.' })
  })
}
