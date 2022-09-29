react-test-sample
=======

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Motivation

This is a sample project to explore [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)(RTL).

# Run Tests

To run tests

```sh
$ npm test
```

This command will run all test files wherever it is within the project folder.

The format of test file is `ComponentName.test.js`.


For mocking API remote access, I used [msw](https://mswjs.io). See `Greeting2.test.js`, `User.test.js` and `Users.test.js` test files for reference.


# Installation

Clone the repository, install the dependencies and run

```sh
$ git clone https://github.com/supershaneski/react-test-sample.git myproject

$ cd myproject

$ npm install

$ npm start
```

Your browser will open to `http://localhost:3000/` or some other port depending on the availability.