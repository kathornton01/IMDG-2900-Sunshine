/*
game.js for Perlenspiel 3.3.x
Last revision: 2022-03-15 (BM)

/* jshint browser : true, devel : true, esversion : 6, freeze : true */
/* globals PS : true */
//Mod 1: Changed grid size to 13x1
//Mod 2: Changed status text
//Mod 3: Changed initial starting color of the 1st, 3rd, 6th, 8th and 10th squares in the grid to black
//Mod 4: On touch, square turns red but keeps original color data
//Mod 5: On touch, each square plays a short piano note based on its placement (c3 to c4)
//Mod 6: On release, square returns to original color
//Mod 7: Modified background color
//Mod 8: Added glyphs for all white keys, as black keys could only read "C" and not "C#"


"use strict"; // Do NOT remove this directive!

PS.init = function( system, options ) {
	// Establish grid dimensions
	PS.gridSize( 13, 1 );

	// Set background color to yellow
	PS.gridColor( 0xfef2c0 );

	// Change status line color and text
	var GRAY = PS.makeRGB( 128, 128, 128 );
	PS.statusColor( PS.GRAY );
	PS.statusText( "Touch any piano key to play" );

	//set variables blackKey and whiteKey to the PS colors
	let blackKey;
	blackKey = PS.COLOR_BLACK;
	let whiteKey;
	whiteKey = PS.COLOR_WHITE;

	//Assign black and white keys to each tile in the grid
	for (let i = 0; i < 13; i++) { //13 keys per scale, C to C
		if (i == 1 || i == 3 || i == 6 || i == 8 || i == 10) { //only black keys should be the second, fourth, seventh, ninth and eleventh
			PS.data(i, 0, blackKey);	//set data to black
			PS.color(i, 0, blackKey); // set color to black
		}
		else { //set all other keys' color and data to white
			PS.data(i, 0, whiteKey);
			PS.color(i, 0, whiteKey);
		}

	}

	//Assign glyphs to all natural notes
	PS.glyph(PS.ALL, PS.ALL, PS.GRAY);
	PS.glyph ( 0, 0, "C" ); //first note is a C, etc.
	//PS.glyph ( 1, 0, "C#" );
	PS.glyph ( 2, 0, "D" );
	//PS.glyph ( 3, 0, "D#" );
	PS.glyph ( 4, 0, "E" );
	PS.glyph ( 5, 0, "F" );
	//PS.glyph ( 6, 0, "F#" );
	PS.glyph ( 7, 0, "G" );
	//PS.glyph ( 8, 0, "G#" );
	PS.glyph ( 9, 0, "A" );
	//PS.glyph ( 10, 0, "A#" );
	PS.glyph ( 11, 0, "B" );
	PS.glyph ( 12, 0, "C" );
	//PS.data( x, y, next );

	// Preload click sound
	PS.audioLoad( "fx_click" );
};

PS.touch = function( x, y, data, options ) {

	//On touch, set color to
	PS.color( x, y, PS.COLOR_RED ); // set color to current value of data

	//Play piano sound
	PS.audioPlay( PS.piano( x + 38 ) ); //38 is the note C3, so at x=0 the note plays. At x=1, C#3 plays, then at x=2 D plays, etc.
	//PS.debug("Key: " + (x + 38) +  "\n" );

};

PS.release = function( x, y, data, options ) {

	 PS.color( x, y, data ); // set color to  value of data, the key's original color


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

