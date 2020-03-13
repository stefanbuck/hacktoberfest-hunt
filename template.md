## Closed Issues

{%- for event in closedIssues %}
- [{{event.repo.name}}#{{event.payload.issue.number}}]({{ event.payload.issue.html_url }}) {{ event.payload.issue.title }} - {{event.timeago}}
{%- endfor %}

## Opened Issues

{%- for event in openedIssues %}
- [{{event.repo.name}}#{{event.payload.issue.number}}]({{ event.payload.issue.html_url }}) {{ event.payload.issue.title }} - {{event.timeago}}
{%- endfor %}

## Opened Pull Requests

{%- for event in openedPullRequests %}
- [{{event.repo.name}}#{{event.payload.pull_request.number}}]({{ event.payload.pull_request.html_url }}) {{ event.payload.pull_request.title }} - {{event.timeago}}
{%- endfor %}

## Closed Pull Requests

{%- for event in closedPullRequests %}
- [{{event.repo.name}}#{{event.payload.pull_request.number}}]({{ event.payload.pull_request.html_url }}) {{ event.payload.pull_request.title }} - {{event.timeago}}
{%- endfor %}