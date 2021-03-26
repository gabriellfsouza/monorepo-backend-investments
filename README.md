# Moneyhub Tech Test - Investments and Holdings

## Routes

Investments - localhost:8081

- `/investments` get all investments
- `/investments/:id` get an investment record by id
- `/investments/export` expects a csv formatted text input as the body

Financial Companies - localhost:8082

- `/companies` get all companies details
- `/companies/:id` get company by id

Admin - localhost:8083

- `/investments/:id` get an investment record by id
- `/investments/report` get the CSV report or you can start the upload to the `investments` service

## Getting Started

You have two options to **run the service**, as a **development environment**, the **tests**, the **linting** process and to **install the dependencies**, from each folder or from the project root folder:

```bash
yarn start
or
yarn develop
or
yarn test
or
yarn lint
or
yarn install
```
Please, note that it was used `yarn` instead of `npm` in this case

### Improvements that can be done:

1. How might you make this service more secure?

    We can implement an authorization token system using OAuth or a system like AWS Cognito to provide the authorization flow and then include this on all HTTP requests to ensure the right to access the service (through an express middleware to check this token, for example).

    Verifying the source of the request (like IP of origin);

    Running some penetration testing and reviewing the indicators;

    Being aware of new threats discovered in your packages;

    Monitoring our application with XRay or Sentry for example;

2. How would you make this solution scale to millions of records?

    We can scale horizontally through a horizontal scaling method (Docker, Kubernetes, Elastic Container Services, Load Balancers);

    As we grow the system part, we need to plan how to scale the database part as well;

    Implementing a cache system (Redis or Cloud Front for example);

3. What else would you have liked to improve given more time?

    I believe that I've made some improvements to the code, but we always can improve our code.

    A CI/CD pipeline is one thing that I'd like to improve;

    Implementing git hooks to ensure an runnable and "linted" code (like using husky).

# Test Description

At Moneyhub we use microservices to partition and separate the concerns of the codebase. In this exercise we have given you an example `admin` service and some accompanying services to work with. In this case the admin service backs a front end admin tool allowing non-technical staff to interact with data.

A request for a new admin feature has been received

## Requirements

- An admin is able to generate a csv formatted report showing the values of all user holdings
    - The report should be sent to the `/export` route of the investments service
    - The investments service expects the report to be sent as csv text
    - The csv should contain a row for each holding matching the following headers
    |User|First Name|Last Name|Date|Holding|Value|
    - The holding should be the name of the holding account given by the financial-companies service
    - The holding value can be calculated by `investmentTotal * investmentPercentage`
- Ensure use of up to date packages and libraries (the service is known to use deprecated packages)
- Make effective use of git

We prefer:

- Functional code
- Ramda.js (this is not a requirement but feel free to investigate)
- Unit testing

### Notes

All of you work should take place inside the `admin` microservice

For the purposes of this task we would assume there are sufficient security middleware, permissions access and PII safe protocols, you do not need to add additional security measures as part of this exercise.

You are free to use any packages that would help with this task

We're interested in how you break down the work and build your solution in a clean and reusable manner rather than seeing a perfect example, try to only spend arouns *1-2 hours* working on it

Relating to the task we'd also like you to write some answers to the following questions;

1. How might you make this service more secure?
2. How would you make this solution scale to millions of records?
3. What else would you have liked to improve given more time?

## Getting Started

Please clone this service and push it to your own github (or other) public repository

On completion email a link to your repository to your contact at Moneyhub and ensure it is publicly accessible.

To develop against all the services each one will need to be started in each service run

```bash
npm start
or
npm run develop
```

The develop command will run nodemon allowing you to make changes without restarting

The services will try to use ports 8081, 8082 and 8083

Use Postman or any API tool of you choice to trigger your endpoints (this is how we will test your new route). Please add your new routes to the readme

### Existing routes

We have provided a series of routes

Investments - localhost:8081

- `/investments` get all investments
- `/investments/:id` get an investment record by id
- `/investments/export` expects a csv formatted text input as the body

Financial Companies - localhost:8082

- `/companies` get all companies details
- `/companies/:id` get company by id

Admin - localhost:8083

- `/investments/:id` get an investment record by id
