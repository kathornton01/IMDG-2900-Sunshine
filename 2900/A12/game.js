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

/** SAMPLE PALETTE FROM A08, PLEASE CHANGE! JUST USING COLORS ARRAY
 *
 */
let PINK = PS.makeRGB( 247, 181, 230);
let PURPLE = PS.makeRGB(218, 189, 246);
let RED = PS.makeRGB(255, 125, 94);
let YELLOW = PS.makeRGB(253, 249, 140);
let BLUE = PS.makeRGB(168, 222, 250);
let GREEN = PS.makeRGB(168, 250, 214);
let ORANGE = PS.makeRGB(255, 179, 140);
let BACKGROUND_PINK = PS.makeRGB(254, 238, 234);
let background = BACKGROUND_PINK;
let colors = [RED, PINK, PURPLE, YELLOW, BLUE, GREEN, ORANGE]

"use strict"; // Do NOT remove this directive!


PS.init = function( system, options ) {

    levelChooser();
    //levelMaker(2, 10, [0,0,20,20]);
    PS.border(PS.ALL, PS.ALL, PS.COLOR_BLACK);

	// PS.statusText( "Game" );

	// Add any other initialization code you need here.
};


PS.touch = function( x, y, data, options ) {
    if (PS.statusText(PS.glyph(x,y)) == 49) {
        levelMaker(2, 10, [0,0,20,20]);
    }

	// Uncomment the following code line
	// to inspect x/y parameters:

	// PS.debug( "PS.touch() @ " + x + ", " + y + "\n" );

	// Add code here for mouse clicks/touches
	// over a bead.
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

function levelChooser() {
    PS.gridSize( 7, 7)
    PS.color(2, 1, RED)
    PS.color(4, 1, RED)
    PS.color(6, 1, RED)
    PS.color(2, 3, RED)
    PS.color(4, 3, RED)
    PS.color(6, 3, RED)
    PS.color(2, 5, RED)
    PS.color(4, 5, RED)
    PS.color(6, 5, RED)

    PS.glyph(2, 1, "1")
    PS.glyph(4, 1, "2")
    PS.glyph(6, 1, "3")
    PS.glyph(2, 3, "4")
    PS.glyph(4, 3, "5")
    PS.glyph(6, 3, "6")
    PS.glyph(2, 5, "7")
    PS.glyph(4, 5, "8")
    PS.glyph(6, 5, "9")
}

function levelMaker ( answerNum, gridNum, locations ) {
    let j = 0;
    PS.statusText( "LevelMaker Called" );
    let trueGrid = gridNum * 3;
    PS.gridSize( trueGrid, trueGrid);

    for (let i = 0; i < answerNum; i++) {
        for (let l = 0; l < 3; l ++) {
            PS.color(locations[j], locations[j] + l, colors[i])
            PS.color(locations[j] + 1, locations[j] + l, colors[i])
            PS.color(locations[j] + 2, locations[j] + l, colors[i])
            PS.color(locations[j + 1], locations[j + 1] + l, colors[i])
            PS.color(locations[j + 1] + 1, locations[j + 1] + l, colors[i])
            PS.color(locations[j + 1] + 2, locations[j + 1] + l, colors[i])
        }
        j += 2;
    }


};