var youtubeFavorites = ( function ($, my) {

	my.debug_log = 1;					// Set to 0 for no output, 1 for yes, 2 for verbose

	my.constants = {
		colorLight : '#ede9ce',
		colorMustard : '#c7ad88',
		colorDkGrey: '#c7ad88',
		colorRust: '#935347'


	};



	/* 
	 * 	--------- 	App startup
	 */

	if ( ! my.googleSearchApiAuthKey ) {
		// API key needed to access the search api, 
		// 'youtubeAPI.js' should contain that key, but its not defined!
		// Read the project README.md file.

		// No api access, therefore terminate program
		var problem = 'No youtube API key found in apiKeys.js!';
		console.error( problem + '  my.googleSearchApiAuthKey = ' + my.googleSearchApiAuthKey );
		alert( problem + ' You have to get your own.  See the project readme for instructions on how to fix this.');
		throw problem;		// todo: make an exit fx that tells all objects to end()
	} 
	else {		// happy path: youtube api key was where it should be

		// my.storage.init();				// Check for saved favorites & view history
		// my.youtubeAPI.init();			// Do a default search
		// my.uiFramework.init();			// Materialize CSS framework js initialization for drop-downs, etc...
		// my.searchBox.init();			// Bind click from nav bar to search box, ...
		// my.vidPlayer.init( true );		// Sets the height of the main player based on screen width, show height slider
		// my.searchResults.init();
		
		// if ( my.storage.empty() ){		// if no saved favorites or view history

		// }

	}



	return my;
}( jQuery, youtubeFavorites || {} ) );