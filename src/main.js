var youtubeFavorites = ( function ($, my) {

	my.debug_log = 2;					// Set to 0 for no output, 1 for yes, 2 for verbose

	my.constants = {
		colorLight : '#ede9ce',			// main background yellowish white
		colorMustard : '#c7ad88',		// search
		colorDkGrey: '#64706c',			// search results
		colorRust: '#935347'			// favorites

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

		// my.uiFramework.init(); 		not needed since it autoexecutes
		// my.accordion.init();			is kicked off by uiFramework

		my.storage.init();
		my.searchBox.init();
		my.youtubeAPI.init();		// right now, this doesn't do jack!
		
		my.uiFramework.statusReady();

		
		// if ( my.storage.empty() ){		// if no saved favorites or view history

		// }

	}



	return my;
}( jQuery, youtubeFavorites || {} ) );