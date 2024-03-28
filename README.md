# Best Rest Implementation

- 🦥🌃💤
- Welcome to Best Rest, a source of information for anyone looking for tips on how to improve their sleep!

## Current Bugs

- When the user types a topic that does not exist in the API, the page becomes blank. I would like to put an error message when this happens. ❌
- When the user enters white space and clicks submit, nothing changes. I would like a message asking the user, 'please type a topic' when this happens. ❌

## Setup

### Dependencies

- Run `npm install` in the project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies (React).

### Database Prep

- 1. Access the MySQL interface in your terminal by running `mysql -u root -p`. (Or your password, if not 'root')

- 2. Create a new database called 'favorites' by running the command `create database favorites`.

- 3. - Create an `.env` file in the project folder of this repository containing the MySQL authentication information for MySQL user. For example:

```bash
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=favorites
  DB_PASS=YOURPASSWORD
```

- 4. Run `npm run migrate` in a new terminal window in the project folder of this repository. This will create a table called 'topics' in the database.
