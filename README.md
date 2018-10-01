# KFC Delivery

## How to start

**Pay attention:** in this project we don't use ~~npm~~, we use [yarn](https://yarnpkg.com) instead!

1. Clone repository: `git clone https://github.com/BorisHasikov/kfc.git`
1. Checkout to **develop** branch `git checkout develop`
1. Install all dependencies: `yarn install`
1. Set all the necessary environment variables `export NAME="VALUE"`
1. Start the app: `yarn start`

## How to store paswords/keys/tokens

In console on your local machine **and on server** run command. Once you run this command, value will be saved in system enviroment variables. You don't need to run this command every time you run the script.

```sh
export NAME="VALUE"
```

In your Node.js code use following syntax:

```js
const name = process.env.NAME;
```
