<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/seb.wojtasik/flashy">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Flashy</h3>

  <p align="center">
    Open-source Spaced Repetition System.
    <br />
    <br />
    <a href="http://138.68.84.207">View Demo</a>
    ·
    <a href="https://github.com/seb.wojtasik/flashy/issues">Report Bug</a>
    ·
    <a href="https://github.com/seb.wojtasik/flashy/issues">Request Feature</a>
  </p>
</div>


<!-- ABOUT THE PROJECT -->
## About The Project

![Flashy Screenshot][product-screenshot]

Flashy was created to be an easy to use, open source spaced repetition system packed in a web app.

You can try it out [here](http://138.68.84.207) and create an account or log into the sample one using the details below.

### Demo user account:

E-mail: `demo@test.com`
Passowrd: `demo`

---

### Built With

##### Frontend
* [React.js](https://reactjs.org/)
* [GraphQL](https://graphql.org)
* [ApolloClient](https://www.apollographql.com)
* [CSS Modules](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/)
* [React Router](https://reactrouter.com)
* [react-toastify](https://github.com/fkhadra/react-toastify)
* [Day.js](https://day.js.org)
  
##### Backend
* [Node.js](https://nodejs.org/)
* [ApolloServer](https://www.apollographql.com)
* [Prisma ORM](https://www.prisma.io)
* [JWT](https://jwt.io)

---

<!-- FEATURES -->
## Features

- Flashcard creation
- Organizing flashcards in decks
- Automatic review scheduling based on recall performance
- User registration/login

### Upcoming
  - Different learning modes (quizz, match pairs etc.)

---

<!-- GETTING STARTED -->
## Getting started

The simplest way to get your own instance up and running is by using Docker.

1. Clone the project `git clone https://github.com/sebwojtasik/flashy.git`.
2. Create your own .env files by editing `.env.template` in the main directory, /server and /client folders.
3. Run `docker-compose up` to build the images and start the containers.

---

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch `git checkout -b feature/AmazingFeature`
3. Commit your Changes `git commit -m 'Add some AmazingFeature'`
4. Push to the Branch `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[product-screenshot]: images/screenshot.png