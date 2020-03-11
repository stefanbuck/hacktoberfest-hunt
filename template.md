## Closed Issues

{%- for issue in closedIssues %}
- [{{issue.repo.name}}#{{issue.payload.issue.number}}]({{ issue.payload.issue.url }}) {{ issue.payload.issue.title }}
{%- endfor %}

## Opened Issues

{%- for issue in openedIssues %}
- [{{issue.repo.name}}#{{issue.payload.issue.number}}]({{ issue.payload.issue.url }}) {{ issue.payload.issue.title }}
{%- endfor %}

## Opened Pull Requests

{%- for pr in openedPullRequests %}
- [{{pr.repo.name}}#{{pr.payload.pull_request.number}}]({{ pr.payload.pull_request.url }}) {{ pr.payload.pull_request.title }}
{%- endfor %}

## Closed Pull Requests

{%- for pr in closedPullRequests %}
- [{{pr.repo.name}}#{{pr.payload.pull_request.number}}]({{ pr.payload.pull_request.url }}) {{ pr.payload.pull_request.title }}
{%- endfor %}