# QA Code Assessment

Thanks for joining us today and many thanks for your time.


Contained within this repository is a basic web application. This application features a login form and a secure page that displays a list of products, which are retrieved from a downstream service. The primary objective of this assessment is:

- Bug Identification: Your first task is to scrutinize the project and uncover any existing bugs or security vulnerabilities.
- Test Automation: Following this, you are required to develop automated tests for the software.

## Getting Started

You should first clone the repository on your local machine andI install the dependencies:

```
$ npm i
```

Then you should be able to start the application:

```
$ npm run dev
```

After that application should be running and you should be able to load it using your browser pointing to http://localhost:3000.

## Task

Your task is to perform a thorough quality assurance assessment on the provided code. This includes but is not limited to:

1. **Identifying Flaws**: Look for any bugs, errors, or issues within the code. This could be anything from flow errors to logical flaws. Your list should also contain a proper prioritization.

2. **Security Concerns**: Assess the code for potential security vulnerabilities. Consider aspects such as data validation, error handling, and secure communication with the downstream service.

3. **Test Cases**: Write detailed test cases to ensure the software functions as expected. This should cover both positive (expected usage) and negative (handling of unexpected inputs or conditions) scenarios.

## Deliverables

At the end of the assessment, you should provide:

1. A **detailed report** outlining any identified flaws and security concerns, along with recommendations for improvement and with the proper priority flag.
2. A **comprehensive set of test cases**, clearly described and ready to be executed. We expect 3 to 4 automated test cases (preference to Typescript or Playwright) and a README file with detailed instructions on how to run tests.
3. Any other **observations or suggestions** you may have to improve the quality of the software.

## Conclusion

This assessment is designed to test your ability to critically analyze a piece of software from a quality assurance perspective. Take your time, be thorough, and remember to justify your findings and recommendations.

Good luck!
