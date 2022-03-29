/*
game.js for Perlenspiel 3.3.x
Last revision: 2022-03-15 (BM)

Perlenspiel is a scheme by Professor Moriarty (bmoriarty@wpi.edu).
This version of Perlenspiel (3.3.x) is hosted at <https://ps3.perlenspiel.net>
Perlenspiel is Copyright © 2009-22 Brian Moriarty.
This file is part of the standard Perlenspiel 3.3.x devkit distribution.

Perlenspiel is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Perlenspiel is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You may have received a copy of the GNU Lesser General Public License
along with the Perlenspiel devkit. If not, see <http://www.gnu.org/licenses/>.
*/

/*
This JavaScript file is a template for creating new Perlenspiel 3.3.x games.
Any unused event-handling function templates can be safely deleted.
Refer to the tutorials and documentation at <https://ps3.perlenspiel.net> for details.
*/

/*
The following comment lines are for JSHint <https://jshint.com>, a tool for monitoring code quality.
You may find them useful if your development environment is configured to support JSHint.
If you don't use JSHint (or are using it with a configuration file), you can safely delete these two lines.
*/

/* jshint browser : true, devel : true, esversion : 6, freeze : true */
/* globals PS : true */

"use strict"; // Do NOT remove this directive!

//Declare variables
let num;
//Declare all colors from RGB, and combine into array
let PINK = PS.makeRGB( 247, 181, 230);
let PURPLE = PS.makeRGB(218, 189, 246);
let RED = PS.makeRGB(255, 125, 94);
let YELLOW = PS.makeRGB(253, 249, 140);
let BLUE = PS.makeRGB(168, 222, 250);
let GREEN = PS.makeRGB(168, 250, 214);
let ORANGE = PS.makeRGB(255, 179, 140);
//let WHITE = PS.makeRGB(243, 243, 252);
let BACKGROUND_PINK = PS.makeRGB(254, 238, 234);
//let BACKGROUND_GRAY = PS.COLOR_GRAY_DARK;
let background = BACKGROUND_PINK;
let colors = [RED, PINK, PURPLE, YELLOW, BLUE, GREEN, ORANGE]

//declare size variable
let size = 14;

PS.init = function( system, options ) { //initialize grid
    //declare grid size to pre-determined size
    PS.gridSize( size, size );

    //get random numbers for coordinates, color, size and radius of the block
    let colorNum = Math.floor((Math.random() * colors.length) );
    let xNum = Math.floor((Math.random() * size) );
    let yNum = Math.floor((Math.random() * size) );
    let scaleNum = 50 + Math.floor((Math.random() * 50) + 1);
    let radNum = Math.floor(Math.random() * 51);

    //initialize number of clicked blocks to zero
    num = 0;
    // Set background color to defined above
    PS.gridColor( background );
    PS.gridColor( background );


    PS.data(PS.ALL, PS.ALL, background);	//set data of all to background color
    PS.color(PS.ALL, PS.ALL, background); // set color of all to background color
    PS.borderColor(PS.ALL, PS.ALL, background); //set border color to background color

    //set scale, radius and color of randomly selected block
    PS.scale ( xNum, yNum, scaleNum );
    PS.radius ( xNum, yNum, radNum );
    PS.color(xNum, yNum, colors[colorNum]);

    PS.statusText( num ); //count of numbers clicked
    PS.statusColor(PINK); //set status text color

};


PS.touch = function( x, y, data, options ) {

    //combine audio sounds into array
    let goodNoise = ["fx_blip", "fx_pop", "fx_coin1", "fx_coin3", "fx_coin6"]


    if (PS.color(x,y) === background) {
        //if the block color is the same as background, do nothing and play "bad" audio
        PS.audioPlay("fx_bloink");
    }

    else { //if color is not the same as background
        //fade the block and set to background color
        PS.fade( x, y, 30 );
        PS.color(x, y, background);
        //get random numbers for coordinates, color, size and radius of the block
        let colorNum = Math.floor((Math.random() * colors.length) );
        let xNum = Math.floor((Math.random() * size) );
        let yNum = Math.floor((Math.random() * size) );
        let scaleNum = 50 + Math.floor((Math.random() * 50) + 1);
        let radNum = Math.floor(Math.random() * 51);
        //get random number for "good" audio
        let audioNum = Math.floor((Math.random() * goodNoise.length) );
        //assign random radius, scale, and color for randomly chosen block
        PS.scale ( xNum, yNum, scaleNum );
        PS.radius( xNum, yNum, radNum );
        PS.color(xNum, yNum, colors[colorNum]);
        //increment the number of blocks clicked by 1 and display
        num += 1;
        PS.statusText(num);
        //if the number of blocks clicked is a multiple of 100, play tada
        if (num % 100 === 0 ) {
            PS.audioPlay("fx_tada");
        }
        else {
            //otherwise, choose a different "good" audio
            PS.audioPlay(goodNoise[audioNum]);
        }
    }

};


PS.release = function( x, y, data, options ) {
    // Uncomment the following code line to inspect x/y parameters:

    // PS.debug( "PS.release() @ " + x + ", " + y + "\n" );

    // Add code here for when the mouse button/touch is released over a bead.
};



PS.enter = function( x, y, data, options ) {
    // Uncomment the following code line to inspect x/y parameters:

    // PS.debug( "PS.enter() @ " + x + ", " + y + "\n" );

    // Add code here for when the mouse cursor/touch enters a bead.
};



PS.exit = function( x, y, data, options ) {
    // Uncomment the following code line to inspect x/y parameters:

    // PS.debug( "PS.exit() @ " + x + ", " + y + "\n" );

    // Add code here for when the mouse cursor/touch exits a bead.
};



PS.exitGrid = function( options ) {
    // Uncomment the following code line to verify operation:

    // PS.debug( "PS.exitGrid() called\n" );

    // Add code here for when the mouse cursor/touch moves off the grid.
};

PS.keyDown = function( key, shift, ctrl, options ) {
    // Uncomment the following code line to inspect first three parameters:

    // PS.debug( "PS.keyDown(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

    // Add code here for when a key is pressed.
};


PS.keyUp = function( key, shift, ctrl, options ) {
    // Uncomment the following code line to inspect first three parameters:

    // PS.debug( "PS.keyUp(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

    // Add code here for when a key is released.
};


PS.input = function( sensors, options ) {
    // Uncomment the following code lines to inspect first parameter:

//	 var device = sensors.wheel; // check for scroll wheel
//
//	 if ( device ) {
//	   PS.debug( "PS.input(): " + device + "\n" );
//	 }

    // Add code here for when an input event is detected.
};

