var youtubeFavorites = ( function ($, my) {

	// Some globally accessible values
	// 
	my.debug_log = 1;					// Set to 0 for no output, 1 for yes, 2 for verbose

	my.constants = {
		colorLight : '#ede9ce',			// main background yellowish white
		colorMustard : '#c7ad88',		// search
		colorDkGrey: '#64706c',			// search results
		colorRust: '#935347'			// favorites
	};

	my.searchDisabled = false;			// set to true if api key not found


 	// --------- 	App startup
 	//
	my.statusAlert.init();				// Put up an initializing message

	// API key needed to access the search api, should be in 'apiKeys.js' file;
	// If not defined for whatever reason, we can't call Youtube API
	if ( ! my.googleSearchApiAuthKey ) {
		// alert that no api was found.
		my.statusAlert.updateAlertBoxStatusColor( 'red' );
		my.statusAlert.updateStatusAlertImage( '<span class="oi statusImage" data-glyph="warning" title="warning" aria-hidden="true"></span>' );			
		my.statusAlert.updateStatusAlertText( 'No Youtube API key found! Search disabled' );
		my.statusAlert.showStatusAlertBox( function() {
			var problem = 'Uh oh, no youtube API key found in apiKeys.js!';

			my.searchDisabled = true;			// search can't work w/o api key

			console.error( problem + ' User will not be able to search.' );
			// alert( problem + ' You have to get your own.  See the project readme for instructions on how to fix this.');
			// throw problem;			
		});

	}
	// happy path: youtube api key was where it should be	
	else {

		// my.uiFramework.init(); 		not needed since it autoexecutes
		// my.accordion.init();			is kicked off by uiFramework

		my.storage.init();
		my.searchBox.init();
		my.youtubeAPI.init();		// right now, this doesn't do jack!
		
		my.favorites.init();
		my.statusAlert.statusReady();
	}


	return my;
}( jQuery, youtubeFavorites || {} ) );