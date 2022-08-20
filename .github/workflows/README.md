This folder contains workflows for [Github Actions](https://docs.github.com/en/actions).

To work with these workflows locally a software called act can be utilized: https://github.com/nektos/act. Please refer to their documentation for advanced usage.

## Installation
Act can be installed using Homebrew:
```bash
brew install act
```

## Basic usage
If you want to know what actions would be triggered by a specific event the `-l` flag can be used. For example, to see which actions would be triggered by opening a PR:
```bash
act pull_request -l
```

To then execute the actions from the previous list:
```bash
act pull_request
```

If no event is specified, push is used as a default.