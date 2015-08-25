var youtubeFavorites = ( function ($, my) {

	my.storage = function() {
	
		// Stuff that nobody outside this module needs access to
		var storagePrefix = 'youtubeViewer',
			storageKey = storagePrefix + '-default',
			historyKey = storagePrefix + '-history',

			// stuff that we can expose to the world
			data = {
				storedData : null,
				historyData : null
			};


		// init() - Check localstorage for saved favorites & history
		var init = function() {
			data.storedData = JSON.parse( localStorage.getItem( storageKey ) );	// Get previously saved favorites from localstorage
			data.historyData = JSON.parse( localStorage.getItem( historyKey ) );	// Get history list

			if ( my.debug_log ) {
				console.log( 'storedData:' + data.storedData );
				console.log( 'historyData:' + data.historyData );
			}			
		},

		hasNothingSaved = function() {
			return ( !data.storedData && !data.historyData );
		},

		store = function( allData ) {
			localStorage.setItem( storageKey, JSON.stringify( allData ) );
		};


/*
localStorage.setItem( 'car', JSON.stringify(car) );
console.log( JSON.parse( localStorage.getItem( 'car' ) ) );
*/


		return {
			init : init,
			data : data,
			empty : hasNothingSaved,
			store : store
		};
	}();



	return my;
}( jQuery, youtubeFavorites || {} ) );