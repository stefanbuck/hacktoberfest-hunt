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
  spinnies.add('loading', { text: 'Retrieving your starred repositories...' })

  const starredRepos = await getStarredRepos(username)
  
  spinnies.succeed('loading', { text: 'Retrieved your starred repositories.' });

  mapLimit(starredRepos, 20, getTopic, (err, res) => {
    if (err) {
      console.log(err)
      process.exit(1)
    }

    const repos = res.filter(repo => repo.topics.includes('hacktoberfest'))

    console.log('From %s of your starred repositories %s are participating in Hacktoberfest\n', starredRepos.length, repos.length)

    repos.forEach(repo => {
      console.log(repo.html_url)
    })
  })
}
