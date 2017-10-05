const fetch = require('node-fetch');
const moment = require('moment');
const SLACK_URL = process.env.SLACK_URL
const GITHUB_URLS = [
    'https://api.github.com/repos/openfisca/openfisca-france/issues?labels=contribution',
    'https://api.github.com/repos/openfisca/openfisca-core/issues?labels=contribution',
    'https://api.github.com/repos/openfisca/openfisca-france/issues?labels=support',
    'https://api.github.com/repos/openfisca/openfisca-core/issues?labels=support'
]

function buildMessage(issue) {
    const author = issue.user.login;
    const url = issue.html_url;
    const date = moment(issue.created_at)
    const duration = moment().diff(date, 'day')
    return `${author} has been waiting for ${duration} days : ${url}.`
}

function buildMessages(url) {
    return fetch(url)
        .then(function(response) {
            return response.json();
        }).then(function(response) {
            return response.map(buildMessage)
        });
}

function postToSlack(message) {
    fetch(SLACK_URL,
        {
            method: 'POST',
            body: JSON.stringify({text: message}),
            headers: {'Content-type': 'application/json'}
        }
    )
}

postToSlack("Hi <!here>, this is the support bot talking to you. Time to take care of those poor hanging users!")
GITHUB_URLS.forEach(url => {
    buildMessages(url).then(messages => {
        messages.forEach(message =>{
            postToSlack(message)
        })
    });
})
