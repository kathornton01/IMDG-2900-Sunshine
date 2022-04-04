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
let colors = [PURPLE, GREEN, PINK, BLUE, YELLOW, RED, ORANGE]


let status;
let currColor;
let canDraw;
let levelNum;
let answers;
let gridNum;
let locations;

"use strict"; // Do NOT remove this directive!



PS.init = function( system, options ) {
    currColor = background;
    status = "SELECT";
    canDraw = false;
    levelChooser();

	// PS.statusText( "Game" );

	// Add any other initialization code you need here.
};


PS.touch = function( x, y, data, options ) {

    if (status === "SELECT") {
        levelNum = (PS.glyph(x, y) - 48);
        if (levelNum === 1) {
            answers = 4;
            gridNum = 6;
            //original coords: locations = (0,0, 4,0, 0,1, 2,3, 2,2, 3,3, 1,3, 3,4)
            locations = [1, 1, 13, 1, 1, 4, 7, 10, 7, 7, 10, 10, 4, 10, 10, 13];
            PS.statusText("Level One");
        }
        levelMaker(answers, gridNum, locations);
    }

    if (status === "GAME") {
        if (PS.color(x, y) === background) {

        }
        else if (PS.color(x, y) === PS.COLOR_BLACK) {
           if (PS.glyph(x,y) === 0x00002716) {
               levelMaker(answers, gridNum, locations);
           }
        }
        else {
            setCurrColor(PS.color(x, y));
            canDraw = true;
        }

    }


	// Uncomment the following code line
	// to inspect x/y parameters:


	// Add code here for mouse clicks/touches
	// over a bead.
};



PS.release = function( x, y, data, options ) {
    canDraw = false;
    //checkSolution(levelNum, gridNum);
};



PS.enter = function( x, y, data, options ) {
    if (status === "GAME" && canDraw) {
        if (PS.color(x, y) === background) {
            PS.color(x,y, currColor);
        }
    }
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
    PS.gridSize( 5, 5)
    PS.color(PS.ALL, PS.ALL, background);
    PS.color(0, 0, RED)
    PS.color(2, 0, RED)
    PS.color(4, 0, RED)
    // PS.color(0, 2, RED)
    // PS.color(2, 2, RED)
    // PS.color(4, 2, RED)
    // PS.color(0, 4, RED)
    // PS.color(2, 4, RED)
    // PS.color(4, 4, RED)

    PS.glyph(0, 0, "1")
    PS.glyph(2, 0, "2")
    PS.glyph(4, 0, "3")
    // PS.glyph(0, 2, "4")
    // PS.glyph(2, 2, "5")
    // PS.glyph(4, 2, "6")
    // PS.glyph(0, 4, "7")
    // PS.glyph(2, 4, "8")
    // PS.glyph(4, 4, "9")
}

function levelMaker ( answerNum, gridNum, locations ) {

    status = "GAME";
    let j = 0;
    let trueGrid = gridNum * 3;
    PS.gridSize( trueGrid - 1, trueGrid);
    PS.color(PS.ALL, PS.ALL, background);
    //Make answers
    for (let i = 0; i < answerNum; i++) {
        PS.applyRect(locations[j], locations[j+1], 3, 3, PS.color, colors[i] );
        PS.applyRect(locations[j+2], locations[j+3], 3, 3, PS.color, colors[i] );
        j += 4;
    }

    //Make black border
    PS.applyRect(0, 0, trueGrid, 1, PS.color, PS.COLOR_BLACK)
    PS.applyRect(0, trueGrid - 2, trueGrid, 2, PS.color, PS.COLOR_BLACK)

    PS.applyRect(0, 0, 1, trueGrid , PS.color, PS.COLOR_BLACK)
    PS.applyRect(trueGrid - 2, 0, 1, trueGrid, PS.color, PS.COLOR_BLACK)

    //Make bottom glyphs
    PS.glyphColor(PS.ALL, PS.ALL, background);
    PS.glyph(0, trueGrid-1, 0x00002716);
    //timer?
    //erase

    PS.borderColor(PS.ALL, PS.ALL, PS.COLOR_BLACK);

};

function checkSolution(level, grid) {
    // let allWhiteSpaces = false;
    // if (level === 1) {
    //     if (PS.color())
    //     for (let i = 0; i < grid; i++) {
    //         for (let j = 0; j < grid; j++) {
    //
    //         }
    //
    //     }
    // }
}

function setCurrColor(color) {
    currColor = color;
}