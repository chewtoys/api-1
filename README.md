# KFC Delivery

## How to start

**Pay attention:** in this project we don't use ~~npm~~, we use [yarn](https://yarnpkg.com) instead!

1. Clone repository: `git clone https://github.com/laapl/api.git`
1. Checkout to **develop** branch `git checkout develop`
1. Install all dependencies: `yarn install`
1. Set all the necessary environment variables `export NAME="VALUE"`
1. Start the app: `yarn start`

## How to store paswords/keys/tokens

On your local machine **and on server** create file `.env` and put all your non-public infornmation (like password, tokents, etc...) in that file (don't worry, it's already included in [.gitignore](./.gitignore), so it won't be tracked). Example can be found in [.env.example](./.env.example)

```
NAME="VALUE"
```

In your Node.js code use following syntax:

```js
const name = process.env.NAME;
```

## How to deploy

Config deploy section in [ecosystem.config.js](./ecosystem.config.js), and then run

```sh
pm2 deploy production update
```
