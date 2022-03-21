// Kerri Thornton (IMGD BA)
// Team Sunshine

// Mod 1: Changed bead toggle color to pastel ROYGBV, depending on row (and light gray for each bead's first click)
// Mod 2: Changed grid size is 10 x 6
// Mod 3: Changed grid background color
// Mod 4: Changed status text content and color
// Mod 5: Changed intro text content and color
// Mod 6: Changed intro image
// Mod 7: Changed intro background color
// Mod 8: Changed initial touch sound ("initializes" bead the very first time with squish noise)
// Mod 9: Changed touch sound for all subsequent touches (pop noise)


/*
game.js for Perlenspiel 3.3.x
Last revision: 2022-03-15 (BM)

/* jshint browser : true, devel : true, esversion : 6, freeze : true */
/* globals PS : true */

"use strict"; // Do NOT remove this directive!

PS.init = function( system, options )
{
	// Establish grid dimensions

	PS.gridSize( 10, 6 );

	// Set background color to pink

	PS.gridColor( 0xEFD3D3 );

	// Change status line color and text

	PS.statusColor( PS.COLOR_WHITE );
	PS.statusText( "Click beads to toggle color!" );
	PS.statusColor( 0xEF6881 );

	// Preload pop sound

	PS.audioLoad( "fx_pop" );
	PS.audioLoad( "fx_squish" );

};

PS.touch = function( x, y, data, options )
{


	// Toggle color of touched bead from white to gray, back again, and then to ROYGBV
	// NOTE: The default value of a bead's [data] is 0, which happens to be equal to PS.COLOR_BLACK


	if (data === PS.COLOR_BLACK) //default color is black so I had to change it
	{
		data = PS.COLOR_GRAY_LIGHT;
		PS.audioPlay( "fx_squish" );
	}

	PS.color( x, y, data ); // set color to current value of data

	// Decide what the next color should be.
	// If the current value was ROYGBV, change it to white.
	// Otherwise change it to ROYGBV.

	// NOTE: This is not the most succinct way to code this functionality.
	// It's written this way for clarity.

	let next; // variable to save next color

	if (y === 0)
	{
		if ( data === PS.COLOR_WHITE )
		{
			next = 0xFFB3BA;
		}
		else
		{
			next = PS.COLOR_WHITE;
		}
	}
	if (y === 1)
	{
		if ( data === PS.COLOR_WHITE )
		{
			next = 0xFFDFBA;
		}
		else
		{
			next = PS.COLOR_WHITE;
		}
	}
	if (y === 2)
	{
		if ( data === PS.COLOR_WHITE )
		{
			next = 0xFFFFBA;
		}
		else
		{
			next = PS.COLOR_WHITE;
		}
	}
	if (y === 3)
	{
		if ( data === PS.COLOR_WHITE )
		{
			next = 0xBAFFC9;
		}
		else
		{
			next = PS.COLOR_WHITE;
		}
	}
	if (y === 4)
	{
		if ( data === PS.COLOR_WHITE )
		{
			next = 0xBAE1FF;
		}
		else
		{
			next = PS.COLOR_WHITE;
		}
	}
	if (y === 5)
	{
		if ( data === PS.COLOR_WHITE )
		{
			next = 0xC0C0FF;
		}
		else
		{
			next = PS.COLOR_WHITE;
		}
	}

	// NOTE: The above statement could be expressed more succinctly using JavaScript's ternary operator:
	//let next = ( data === PS.COLOR_BLACK ) ? PS.COLOR_WHITE : PS.COLOR_BLACK;

	// Remember the newly-changed color by storing it in the bead's data.

	PS.data( x, y, next );

	// Play pop sound.

	PS.audioPlay( "fx_pop" );
};

/*
PS.release ( x, y, data, options )
Called when the left mouse button is released, or when a touch is lifted, over bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.release = function( x, y, data, options )
{
	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.release() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse button/touch is released over a bead.
};

/*
PS.enter ( x, y, button, data, options )
Called when the mouse cursor/touch enters bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.enter = function( x, y, data, options )
{
	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.enter() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch enters a bead.
};

/*
PS.exit ( x, y, data, options )
Called when the mouse cursor/touch exits bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.exit = function( x, y, data, options )
{
	// Uncomment the following code line to inspect x/y parameters:

	// PS.debug( "PS.exit() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch exits a bead.
};

/*
PS.exitGrid ( options )
Called when the mouse cursor/touch exits the grid perimeter.
This function doesn't have to do anything. Any value returned is ignored.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.exitGrid = function( options )
{
	// Uncomment the following code line to verify operation:

	// PS.debug( "PS.exitGrid() called\n" );

	// Add code here for when the mouse cursor/touch moves off the grid.
};

/*
PS.keyDown ( key, shift, ctrl, options )
Called when a key on the keyboard is pressed.
This function doesn't have to do anything. Any value returned is ignored.
[key : Number] = ASCII code of the released key, or one of the PS.KEY_* constants documented in the API.
[shift : Boolean] = true if shift key is held down, else false.
[ctrl : Boolean] = true if control key is held down, else false.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.keyDown = function( key, shift, ctrl, options )
{
	// Uncomment the following code line to inspect first three parameters:

	// PS.debug( "PS.keyDown(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

	// Add code here for when a key is pressed.
};

/*
PS.keyUp ( key, shift, ctrl, options )
Called when a key on the keyboard is released.
This function doesn't have to do anything. Any value returned is ignored.
[key : Number] = ASCII code of the released key, or one of the PS.KEY_* constants documented in the API.
[shift : Boolean] = true if shift key is held down, else false.
[ctrl : Boolean] = true if control key is held down, else false.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

PS.keyUp = function( key, shift, ctrl, options )
{
	// Uncomment the following code line to inspect first three parameters:

	// PS.debug( "PS.keyUp(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

	// Add code here for when a key is released.
};

/*
PS.input ( sensors, options )
Called when a supported input device event (other than those above) is detected.
This function doesn't have to do anything. Any value returned is ignored.
[sensors : Object] = A JavaScript object with properties indicating sensor status; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
NOTE: Currently, only mouse wheel events are reported, and only when the mouse cursor is positioned directly over the grid.
*/

PS.input = function( sensors, options )
{
	// Uncomment the following code lines to inspect first parameter:

//	 var device = sensors.wheel; // check for scroll wheel
//
//	 if ( device ) {
//	   PS.debug( "PS.input(): " + device + "\n" );
//	 }

	// Add code here for when an input event is detected.
};

