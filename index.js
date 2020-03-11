const { chain } = require('lodash')
const getEvents = require('./lib/events')
const render = require('./lib/render')
const username = 'zeke'

main()

async function main () {
  const events = await getEvents(username)

  const eventTypes = chain(events)
    .map(event => event.type)
    .uniq()
    .sort()
    .value()

  const repos = chain(events)
    .filter(event => event.repo)
    .map(event => event.repo.name)
    .uniq()
    .sort()
    .value()

  const closedIssues = chain(events)
    .filter(event => event.type === 'IssuesEvent')
    .filter(event => event.payload.action === 'closed')
    .value()

  const openedIssues = chain(events)
    .filter(event => event.type === 'IssuesEvent')
    .filter(event => event.payload.action === 'opened')
    .value()

  const openedPullRequests = chain(events)
    .filter(event => event.type === 'PullRequestEvent')
    .filter(event => event.payload.action === 'opened')
    .value()

  const closedPullRequests = chain(events)
    .filter(event => event.type === 'PullRequestEvent')
    .filter(event => event.payload.action === 'closed')
    .value()

  const context = {
    eventTypes,
    repos,
    closedIssues,
    openedIssues,
    openedPullRequests,
    closedPullRequests
  }

  // console.log(openedPullRequests.map(issue => issue))

  const template = require('fs').readFileSync('./template.md', 'utf8')
  const output = await render(template, context)

  console.log(output)
}
