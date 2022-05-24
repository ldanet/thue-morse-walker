# Thue-Morse Walker

[Visit the online app](http://thue-morse-walker.lydie.nz) and click "Draw"!

This app lets you render Thue-Morse sequences as a picture. A good explanation of the process can be found in this article: [Thue-Morse navigating turtles](http://blog.zacharyabel.com/2012/01/thue-morse-navigating-turtles/).
The article talks only about the binary sequence but I wanted to investigate with sequences in base 3, 4 or even more and see what the resulting pictures would look like.

While writing the background story, I stumbled upon [An Overview of the Thue-Morse Sequence](https://sites.math.washington.edu/~morrow/336_12/papers/christopher.pdf), which, in chapter 7 says:

> general TM sequence are defined as the sum of digits of the base _k_, mod _m_.

This app only cares about the special cases where _k_ = _m_.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Story

This little app was made after watching [Matt Parker's video about the Thue-Morse sequence](https://youtu.be/prh72BLNjIk). Matt describes it as the fairest share sequence for two players taking turns and also states that if you set simple drawing rules for 0's and 1's, the resulting picture is a fractal known as the Koch snowflake. He also points out that the sequence is a list of wether integers have an even number of 1's when written in binary and starting from 0.

I wondered what would happen for a bigger number of players. What would the Thue-Morse sequence would be if it were not binary but base 3, 4 or more, and what the resulting picture would look like when setting simple rules to draw it?

If in binary it's a list of whether there is an even number of 1's, that could really mean that the _n_<sup>th</sup> element of the sequence is the sum of the binary digits of _n_ mod 2. I guessed you could generalize this to higher bases and say that for any base _b_, the _n_<sup>th</sup> element would be the sum of the digits of _n_ written in base _b_ mod _b_. I tried to generate a base 3 sequence with this idea in a [spreadsheet](https://docs.google.com/spreadsheets/d/1iQxVMVnrvAqafFeAFKq-BvTMNAkmmDDvHH6-vVYnN1A/edit?usp=sharing) and I was glad to see that the resulting sequence seems to have the same fairness properties as the original binary sequence as shown in the video.

Now that I could generate a Thue-Morse sequence for any base, I had to create an app to see the fractalness of these sequences!
