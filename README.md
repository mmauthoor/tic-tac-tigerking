# tic-tac-tigerking

Sit back and enjoy the chaotic energy of the colourful characters from Netflix's *Tiger King* through the classic game of tic tac toe. Who will win? Who will lose? Who will ride a jet ski into the sunset? Only your tic tac toe skills will decide! Inspired by season 2 of *Tiger King*, this game aims to deliver those mid-2000s online flash animation game vibes that we all remember from countless wasted hours in our teenage years. The design and CSS leans hard into the trashy, Vegas casino look. Play it [here](https://mmauthoor.github.io/tic-tac-tigerking/).


## Technologies & installation

Mostly straight JavaScript, HTML and CSS. Animations are by Animista. 
No installation of plug-ins etc. necessary, though I recommend viewing via Chrome or Safari (or literally anything other than IE) to make the most of them. 

## Special thanks to

Netflix for the endless amusement *Tiger King* has afforded me (and also for the beautiful images). Background and tiger icons by [Freepik](https://www.freepik.com/). Animations by [Animista](https://animista.net/). 


## Unsolved problems/fixes needed

- When a win/tie state is achieved, the page content would ideally not be clickable and would grey-out so only the win/tie pop-up message is clickable. 
- Responsiveness needs to be improved so it can be played on all screen/device sizes - further media queries to come.
- Ideally the board would be expandable beyond 3x3. Currently the JavaScript can handle this for row and column wins, but not for recognising diagonal wins as the diagonal cell coordinates are hard-coded. 
- Further refactoring to clean up the CSS.

## Trimmings to add in the future

- A Round 2 easter egg based on Tiger King Season 2 that can only be accessed when players have a tie game. The players would swap out from Joe v Carole to the villains of season 2, Jeff Lowe and Tim Stark.
- Wildcard random events to disrupt the game (e.g. a 10% chance that the psychic detective from season 2 will roll in and occupy one of the gameboard cells, preventing players from putting tokens there.
- Sound effects (e.g. tiger roar) when players start/win a game
- More animations (e.g. jiggly Joe/Carole heads) to amp up the chaotic energy.
