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

/**
 * TODO: CHANGE PALETTE
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
let solved = false;

"use strict"; // Do NOT remove this directive!


PS.init = function( system, options ) {
    currColor = background;
    status = "SELECT";
    PS.statusText("Select a level");
    canDraw = false;
    levelChooser();
    PS.borderColor(PS.ALL, PS.ALL, PS.background);
    PS.gridColor(background);

    // PS.statusText( "Game" );

	// Add any other initialization code you need here.
};


PS.touch = function( x, y, data, options ) {
    PS.audioPlay("fx_blip");
    if (status === "SELECT" && PS.color(x,y) != background) {
        /**
         * TODO: ADD AUDIO
         */
        levelNum = (PS.glyph(x, y) - 48);
        getLevel(levelNum);
    }

    if (status === "GAME") {
        //PS.debug( "PS.touch() @ " + x + ", " + y + "\n" );
        /**
         * TODO: ADD AUDIO ??
         */
        if (PS.color(x, y) === background) {
        }
        else if (PS.color(x, y) === PS.COLOR_BLACK) {
            if (PS.glyph(x, y) === 0x00002716) {
                getLevel();
            }
            else if (PS.glyph(x,y) === 0x00002190) {
                PS.init();
            }
        } else {
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
    if (status === "GAME") {
        /**
         * TODO: ADD AUDIO ??
         */
        canDraw = false;
        solved = checkSolution();
        if(solved) {
            PS.statusText("Solved! Congratulations!");
            PS.audioPlay("fx_tada");
            /**
             * TODO: ADD BETTER AUDIO
             */

        }
    }

};



PS.enter = function( x, y, data, options ) {
    checkCanDraw(x,y);
    if (status === "GAME" && canDraw) {
        if (PS.color(x, y) === background) {
            PS.borderColor(x, y, currColor);
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
    PS.gridSize( 6, 1)
    PS.color(PS.ALL, PS.ALL, background);
    PS.borderColor(PS.ALL, PS.ALL, background);
    PS.color(1, 0, RED)
    PS.color(3, 0, RED)
    PS.color(5, 0, RED)
    // PS.color(0, 2, RED)
    // PS.color(2, 2, RED)
    // PS.color(4, 2, RED)
    // PS.color(0, 4, RED)
    // PS.color(2, 4, RED)
    // PS.color(4, 4, RED)

    PS.glyph(1, 0, "1")
    PS.glyph(3, 0, "2")
    PS.glyph(5, 0, "3")
    // PS.glyph(0, 2, "4")
    // PS.glyph(2, 2, "5")
    // PS.glyph(4, 2, "6")
    // PS.glyph(0, 4, "7")
    // PS.glyph(2, 4, "8")
    // PS.glyph(4, 4, "9")
}

function levelMaker ( answerNum, gridNum, locations ) {
    status = "GAME";
    let trueGrid = gridNum * 3;
    let h = trueGrid;
    let w = trueGrid;
    if (levelNum === 1) {
        PS.gridSize(trueGrid - 1, 6);
        let h = 6-1;
        let w = trueGrid-1;
    }
    else if (levelNum === 2 || levelNum === 3) {
        PS.gridSize(trueGrid - 1, trueGrid);
        h=trueGrid;
        w=trueGrid;
    }
    PS.gridColor(background);
    PS.color(PS.ALL, PS.ALL, background);
    PS.borderColor(PS.ALL, PS.ALL, background);
    //Make answers
    answerSquares();
    answerBorders(h,w, trueGrid);



};

function checkSolution() {
    let isSolved = false;
    let color1 = false;
    let color2 = false;
    let color3 = false;
    let color4 = false;
    if (levelNum === 1) {
        if (PS.color(4,2) === colors[0] && PS.color (5,2) === colors[0] && PS.color(6,2) === colors[0]) {
            color1 = true;
        }
        color2 = true;
        color3 = true;
        color4 = true;
    }
    else if (levelNum === 2) {
        //check color 1
        for (let i = 4; i < 13; i++) {
            if (PS.color(i,2) === colors[0]) {
                color1 = true;
            }
            else color1 = false;
        }

        //check color 2
        for (let i = 7; i < 15; i++) {
            if (PS.color(2,i) === colors[1]) {
                color2 = true;
            }
            else color2 = false;
        }
        for (let i = 2; i < 9; i++) {
            if (PS.color(i,14) === colors[1] && color2) {
                color2 = true;
            }
            else color2 = false;
        }
        if (PS.color(8,13) === colors[1] && color2) {
            color2 = true;
        }
        else color2 = false;

        //check color 3
        if (PS.color(10,8) === colors[2] && PS.color(11,8) === colors[2] && PS.color(11,9) === colors[2]) {
            color3 = true;
        }
        else color3 = false;

        //check color 4
        for (let i = 5; i < 10; i++) {
            if (PS.color(5,i) === colors[3]) {
                color4 = true;
            }
            else color4 = false;
        }
        for (let i = 5; i < 15; i++) {
            if (PS.color(i,5) === colors[3] && color4) {
                color4 = true;
            }
            else color4 = false;
        }
        for (let i = 5; i < 15; i++) {
            if (PS.color(14,i) === colors[3] && color4) {
                color4 = true;
            }
            else color4 = false;
        }
        if (PS.color(13,14) === colors[3] && color4) {
            color4 = true;
        }
        else color4 = false;

    }
    else if (levelNum === 3) {
        //Color 1
        for (let i = 4; i < 15; i++) {
            if (PS.color(2,i) === colors[0]) {
                color1 = true;
            }
            else color1 = false;
        }
        for (let i = 2; i < 15; i++) {
            if (PS.color(i,14) === colors[0] && color1) {
                color1 = true;
            }
            else color1 = false;
        }
        //Color 2
        for (let i = 4; i < 7; i++) {
            if (PS.color(i,2) === colors[1]) {
                color2 = true;
            }
            else color2 = false;
        }
        for (let i = 2; i < 10; i++) {
            if (PS.color(5,i) === colors[1] && color2) {
                color2 = true;
            }
            else color2 = false;
        }
        //Color 3
        for (let i = 8; i < 12; i++) {
            if (PS.color(i,5) === colors[2]) {
                color3 = true;
            }
            else color3 = false;
        }
        for (let i = 5; i < 12; i++) {
            if (PS.color(8,i) === colors[2] && color3) {
                color3 = true;
            }
            else color3 = false;
        }
        for (let i = 8; i < 13; i++) {
            if (PS.color(i,11) === colors[2] && color3) {
                color3 = true;
            }
            else color3 = false;
        }
        if (PS.color(11,4) === colors[2]) {
            color3 = true;
        }
        else color3 = false;
        //Color 4
        for (let i = 4; i < 9; i++) {
            if (PS.color(14,i) === colors[3]) {
                color4 = true;
            }
            else color4 = false;
        }
        if (PS.color(13,8) === colors[3]) {
            color4 = true;
        }
    }
        isSolved = color1 && color2 && color3 && color4;
    return isSolved;

}

function setCurrColor(color) {
    currColor = color;
}

function getLevel() {
    if (levelNum === 1) {
        answers = 1;
        gridNum = 4;
        //original coords: locations = (0,0, 0, 2)
        locations = [1, 1, 7, 1];
        /**
         * TODO: Change status text ??
         */
        PS.statusText("Level One: Connect the Colors");
    }
    if (levelNum === 2) {
        answers = 4;
        gridNum = 6;
        //original coords: locations = (0,0, 4,0, 0,1, 2,3, 2,2, 3,3, 1,3, 3,4)
        locations = [1, 1, 13, 1, 1, 4, 7, 10, 7, 7, 10, 10, 4, 10, 10, 13];
        /**
         * TODO: Change status text:
         */
        PS.statusText("Level Two: Connect Without Overlapping");
    }
    if (levelNum === 3) {
        answers = 4;
        gridNum = 6;
        //original coords: locations = (0,0, 4,4, 2,0, 1,3 3,0, 4,3 ,4,0 ,3,2   0-4: 1,4,7,10,13
        locations = [1,1, 13,13, 7,1, 4,10, 10,1, 13,10, 13,1, 10,7];
        PS.statusText("Level Three");
    }
    levelMaker(answers, gridNum, locations);
}

function checkCanDraw(x,y) {
    if (levelNum === 1) {
    if (y === 1 || y === 3) {
        canDraw = false;
    }
    }

    if (levelNum === 2) {
        if (x === 1 || x === 15 || y===1 || y === 15
            || (x === 3 && y!= 8 && y!= 11 && y != 14)
            || (x=== 12 && y!= 2 && y!= 4 && y!= 5 && y!=8)
            || (x === 13 && y!=4 && y!= 5 && y!= 8 && y!= 11 && y!= 14)
            || (y === 3 && x!= 5 && x!= 8 && x!= 11)
            || (y === 4 && x!= 5 && x!= 8 && x!= 11 && x!= 14)
            || (y === 6 && x!= 5 && x!= 8 && x!= 11 && x!= 14)
            || (y === 7 && x!= 2 && x!= 5 && x!= 8 && x!= 11 && x!= 14)
            || (y === 9 && x!= 2 && x!= 5 && x!= 8 && x!= 11 && x!= 14)
            || (y === 13 && x!= 2 && x!= 5 && x!= 8 && x!= 14)) {
            canDraw = false;
        }
    }
    if (levelNum === 3) {
        if (x === 1 || x === 15 || y===1 || y === 15
            || (x === 3 && y!= 5 && y!= 8 && y!= 11 && y != 14)
            || (x === 10 && (y===10 || y===12))
            || (x=== 12 && y!= 2 && y!= 4 && y!= 5 && y!=8 && y!= 11 && y!= 14)
            || (x === 13 && y!=4 && y!= 5 && y!= 8 && y!= 11 && y!= 14)
            || (y === 3 && x!= 2 && x!= 5 && x!= 8 && x!= 11)
            || (y === 4 && x!= 2 && x!= 5 && x!= 8 && x!= 11 && x!= 14)
            || (y === 6 && x!= 2 && x!= 5 && x!= 8 && x!= 11 && x!= 14)
            || (y === 7 && x!= 2 && x!= 2 && x!= 5 && x!= 8 && x!= 11 && x!= 14)
            || (y === 9 && x!= 2 && x!= 5 && x!= 8 && x!= 11 && x!= 14)
            || (y === 13 && x!= 2 && x!= 5 && x!= 8 && x!= 11 && x!= 14)
            ){
            canDraw = false;
        }
    }

}

function answerSquares() {
    let j = 0;
        for (let i = 0; i < answers; i++) {
            PS.applyRect(locations[j], locations[j + 1], 3, 3, PS.color, colors[i]);
            PS.applyRect(locations[j + 2], locations[j + 3], 3, 3, PS.color, colors[i]);
            PS.applyRect(locations[j], locations[j + 1], 3, 3, PS.borderColor, colors[i]);
            PS.applyRect(locations[j + 2], locations[j + 3], 3, 3, PS.borderColor, colors[i]);
            j += 4;
        }

}

function answerBorders(h,w,trueGrid) {
    if (levelNum === 1) {
        //Make black border of squares
        PS.applyRect(0, 0, trueGrid, 1, PS.color, PS.COLOR_BLACK)
        PS.applyRect(0, 4, trueGrid, 2, PS.color, PS.COLOR_BLACK)

        PS.applyRect(0, 0, 1, trueGrid , PS.color, PS.COLOR_BLACK)
        PS.applyRect(trueGrid - 2, 0, 1, h, PS.color, PS.COLOR_BLACK)

        //Make borders black
        PS.applyRect(0, 0, trueGrid, 1, PS.borderColor, PS.COLOR_BLACK)
        PS.applyRect(0, 4, trueGrid, 2, PS.borderColor, PS.COLOR_BLACK)

        PS.applyRect(0, 0, 1, trueGrid , PS.borderColor, PS.COLOR_BLACK)
        PS.applyRect(trueGrid - 2, 0, 1, h, PS.borderColor, PS.COLOR_BLACK)

        //Make bottom glyphs
        PS.glyphColor(PS.ALL, PS.ALL, background);
        //ERASE GLYPH
        PS.glyph(0, 5, 0x00002716);
        //BACK GLYPH
        PS.glyph(0, 0, 0x00002190);
        //timer?


    }
    else if (levelNum === 2 || levelNum === 3) {
        //Make black border of squares
        PS.applyRect(0, 0, trueGrid, 1, PS.color, PS.COLOR_BLACK)
        PS.applyRect(0, trueGrid - 2, trueGrid, 2, PS.color, PS.COLOR_BLACK)

        PS.applyRect(0, 0, 1, trueGrid , PS.color, PS.COLOR_BLACK)
        PS.applyRect(trueGrid - 2, 0, 1, trueGrid, PS.color, PS.COLOR_BLACK)

        //Make borders black
        PS.applyRect(0, 0, trueGrid, 1, PS.borderColor, PS.COLOR_BLACK)
        PS.applyRect(0, trueGrid - 2, trueGrid, 2, PS.borderColor, PS.COLOR_BLACK)

        PS.applyRect(0, 0, 1, trueGrid , PS.borderColor, PS.COLOR_BLACK)
        PS.applyRect(trueGrid - 2, 0, 1, trueGrid, PS.borderColor, PS.COLOR_BLACK)

        //Make bottom glyphs
        PS.glyphColor(PS.ALL, PS.ALL, background);
        //ERASE GLYPH
        PS.glyph(0, h-1, 0x00002716);
        //BACK GLYPH
        PS.glyph(0, 0, 0x00002190);
        //timer?

        }

    }