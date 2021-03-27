# Investments and Holdings

This project consists of 3 microservices `admin` , `financial-companies` and `investments` , each representing different domains.

The main point is the report generation crossing data between investment records and companies.

## Techs

This project was bootstrapped with `yarn` , and have the following characteristics, libs and other bullets:

- [eslint](https://eslint.org/) + [editorconfig](https://editorconfig.org/)
- [express](https://expressjs.com/)
- Automated tests with [jest](https://jestjs.io/)
- An custom folder structure by each concern
- [JSDocs](https://jsdoc.app/)

## Getting Started

First you clone the project

```bash
git clone https://github.com/gabriellfsouza/monorepo-backend-investments
```

You have two options to **run the service**, as a **development environment**, the **tests**, the **linting** process and to **install the dependencies**, from each folder or from the project root folder:

```bash
yarn install # Packages installation command
or
yarn start # run the service
or
yarn develop # run as development (restart the service after any code change)
or
yarn test # run the automated tests
or
yarn lint # run the linting check process
```

Please, note that it was used **`yarn`** instead of **`npm`** in this case

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
