# How Long in Isolation?

How long has Benevity been working from home in isolation?

Counter is also running here: <https://how-long-in-isolation.herokuapp.com/>

## Deploying

Install the [Heroku Toolbelt](https://toolbelt.heroku.com/).

1. Clone this repo
1. `heroku create`
1. `git push heroku master`
1. `heroku open`

## Working inside Github Codespaces

To get this project running in a Github Codespace:

1. Open the project/repo in a codespace
1. Install the [Symfony Local Web Server](https://symfony.com/doc/current/setup/symfony_server.html#installation) with `wget https://get.symfony.com/cli/installer -O - | bash`
1. Run `/home/codespace/.symfony5/bin/symfony server:start` in the Codespace terminal
