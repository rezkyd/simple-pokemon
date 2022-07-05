# Simple Pokemon with React and Go

This is a project assignment for recruitment test at Phincon as web developer.
Its a simple web app to display list of Pokemons, detail of Pokemon, and list of caught Pokemon.

The frontend is build with [Create React App](https://github.com/facebook/create-react-app) in Typescript with [Redux](https://redux.js.org/) for state management and [MUI](https://mui.com/) for UI library.

The API backend is build in Golang with [Gin](https://gin-gonic.com/) as the web framework.


## How To Run

Both frontend and backend need to run for the web app to works

Install the latest version of [NodeJs](https://nodejs.org/en/download/) and [Go](https://go.dev/dl/)

In the client folder run the following command

`npm install`

`npm start`

In the server folder run the following command

`go get .`

`go run .`

Access the web app from http://localhost:3000

## Explanation

The web app has 3 pages:

- Pokemon List
  
  This page display all the pokemon image and name from the [PokeAPI](https://pokeapi.co/) in pagination view.

- Pokemon Detail

  This page display the detailed attribute of the selected Pokemon. There is also a button to catch the pokemon and give it a nickname with 50% success probability.

- My Pokemon List

  This page display all the caught Pokemon and the nickname given to them. Caught pokemon can be released with a chance to succeed if random number given by backend is prime. They can also be renamed, giving it suffix `-n`, where n is the nth fibonacci number everytime its renamed.

The API backend has 3 endpoint:

- `pokemon/catch`

  With no parameter, when called will return whether catching pokemon succeed or failed. The chance is always 50%.

- `pokemon/release`

  With no parameter, when called will return random number from 0 to 99. Frontend will check whether the number is prime or not to decide if releasing the pokemon success or fail.

- `pokemon/rename`

  Require 2 parameters, current nickname and previous nickname of the pokemon. When called will return new nickname with the next fibonacci number from current nickname as suffix, 
  
  For example parameters pikachu-2 and pikachu-3 will return pikachu-5.

