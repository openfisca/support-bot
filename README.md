# OpenFisca Support Bot

To message the OpenFisca team about hanging users, run:

```sh
SLACK_URL="https://hooks.slack.com/services/<some>/<secret>/<key>" node check-hanging-users.js
```

The secret slack url can be found on [this page](https://openfisca.slack.com/services/B7ELMHLT0).

To run this script on Monday and Thursday at 10am on a server, add a cron task, for instance by creating a file `/etc/cron.d/support` containing:

```
0 10 * * 1,4 openfisca SLACK_URL="https://hooks.slack.com/services/<some>/<secret>/<key>" /usr/bin/node /home/openfisca/support-bot/check-hanging-users.js
```
