
# Event Management System (Events@Sathyabama)

The Event Management System is a web-based application that simplifies the process of managing events within a college campus.

## Authors

- [@Surya-Kumar-03](https://github.com/Surya-Kumar-03)
- [@Aryanamish](https://github.com/Aryanamish)



## Contributing Guidelines

Thank you for considering contributing to our project! Your contributions are highly appreciated.

## Getting Started

To start contributing, follow these steps:

1. **Fork the Repository**: Fork this repository to your GitHub account.

2. **Clone the Repository**: Clone the forked repository to your local machine using the following command:
   
   ```bash
   git clone https://github.com/sathyabama-event-management/Events-Sathyabama
   ```

3. **Set Up**: Follow the setup process outlined below to configure your development environment.



4. **Create a Branch**: Create a new branch for your contribution. Use a descriptive name that reflects the nature of your work.

   ```bash
   git checkout -b feature/your-feature
   ```

## Running the server `Python (3.12.0)`
It should work with python above `3.7` but if dosent match it with ou version.
- In the cloned Repo Create a Virtual Environment
```shell
python -m venv venv
```
- Activate the Virtual Environment
```shell
# for windows
venv\source\activate
# for mac and linux
source venv\bin\activate
```
- Install all the requirements
```shell
pip install -r requirements.txt
```

- Migrate the DB
```shell
python manage.py migrate

```
- Create Super User
```shell
python manage.py createsuperuser
```

- Running the Server
```shell
python manage.py runserver
```
## running the Frontend `Node 20.11.0` `npm 10.8.1`


- Go to the front-end folder and install the packages
```shell
cd front-end
npm i
npm run compile
```
 // The server should be running on localhost:3000

 #### Note: If the frontend is not working or the backend is not working checkout https://events.aryanamish.in to see the live demo


## Making Changes

1. **Code**: Write your code following the project's coding standards and best practices. Keep your code clean and well-documented.

2. **Commit**: Commit your changes with a clear and concise commit message. Use present tense and provide a brief overview of your changes.

   ```bash
   git commit -m "Add feature: description of your changes"
   ```

3. **Pull Request**: Push your branch to your forked repository and create a pull request to the original repository's `main` branch. Include a detailed description of your changes in the pull request.

## Code of Conduct

We expect all contributors to adhere to our code of conduct, which promotes a positive and inclusive environment. 

## Tips

- Coordinate with the project maintainers or community through issues and discussions to align your contribution with the project's goals.
- Keep your pull requests focused and avoid bundling multiple unrelated changes in a single request.
- Be patient and open to feedback. Code reviews are part of the process to maintain code quality.

Thank you for being a part of our project and helping us make it better! Your contributions are valuable in making our project successful and impactful.

