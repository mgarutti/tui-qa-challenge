# QA Code Assessment - Marco Garutti

This is my approach on the Code Assessment. This current branch (test/playwright-qa) contains the code from the original repo (main branch), with the addition to Playwright.
I opted by this approach so would be easier to run the server locally, but also because I believe that using the same repository for both test and development can be really usefull for the team.

## Issues encountered during testing

Before starting the automation, I did an exploratory test to know how the application was behaving, and I found some issues during my analysis. These issues can be found at the "Issues" tab
for this repo (or going to https://github.com/mgarutti/tui-qa-challenge/issues). All issues contains a brief description, an screenshot (when available) and the steps to reproduce it.
Also, there are some minor issues/enhancements suggestions.

## Getting Started and running the tests

You should first clone the repository on your local machine and install the dependencies:

```
$ npm i
```
There are a number of ways to run the Playwright tests.
To run ALL of the existing Playwright tests:

```
$ npx playwright test
```

To run a specific set of tests, grouped by tags:

```
$ npx playwright test --grep "@dashboard"
```
```
$ npx playwright test --grep "@login"
```

Or, if you want to run the smoke suite:

```
$ npx playwright test --grep "@smoke"
```

If the test fails, the report will be displayed automatically, but if you want to check the latest report available, just run the following command:

```
$ npx playwright show-report
```

## GitHub Actions workflow

Every time that there is a pull request or a push to the selected branches, the GitHub Actions workflow will be triggered. You can check the workflows here:
https://github.com/mgarutti/tui-qa-challenge/actions 