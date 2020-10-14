# Elsa code challenge

You have a partially complete react-native app that you now need to improve by adding more features.

We will use your additional implementation of our existing app skeleton as a common ground to go deep into tech discussions so feel free to browse around a bit in the existing code and familiarize yourself with how we write react-native at Elsa using TypeScript, react-navigation, hooks, redux etc.

Feel free to bring in your favorite libs that will enable you to write better and more production ready code.

Please take up to 8h (at most!) to work on this.

Good luck! And have fun!

## Features to be added (the backlog)

These are just examples of features, feel free to come up with your own. And there is no need to finish all of them.

- [ ] A way to add one (or more) medication(s)
- [ ] View your current medications (in a list maybe)
- [ ] Remove one (or more) medication(s)
- [ ] A history of all medications that you've been taking
- [ ] A reminder of when to take a particular medication
- [ ] At what date did you start taking a particular medication
- [ ] Provide both the brand name (i.e Ipren) and the substance (Ibuprofen). What about grouping on substances rathern than brand name?
- [ ] A way to specify how strong the medication is (i.e. 1mg, 5g etc.) and what about grouping different strenghts together?
- [ ] A way to specify how the medication is administered (orally, injection, infusion etc.)
- [ ] Pause a medication, some medications shouldn't be used while pregnant or in combination with other medications
- [ ] Your feature ™️

## Environment setup

Instructions on how to setup a React Native development environment can be found here:
https://reactnative.dev/docs/environment-setup

Make sure to follow the instructions for React Native CLI.

### Support tools

At Elsa we use quite a lot of extra tools to help us write consistent, safe and readable code. I.e. [prettier](https://prettier.io/) for code formatting, [eslint](https://eslint.org/) for linting, and [TypeScript](https://www.typescriptlang.org/) to enable a type system and lean on the compiler.

If any of these tools are making you confused or slowing you down, then feel free to opt out of using them. For instance, even though we write almost all our code in TypeScript (.ts or .tsx files) these days you can write your code in plain old JavaScript and make it run side by side with our code, just create a .js file and start writing your code.

## Installation

```
yarn install
```

### iOS installation

```
cd ios
gem install cocoapods
pod install
```

## Start React Native

NOTE! The React Native Bundler needs to be started on localhost:8081 before running the simulator / emulator. So start the bundler in a separate terminal by running the following command:

```sh
yarn start
```

### Android emulator

```
react-native run-android
```

### iOS simulator

```
react-native run-ios
```
