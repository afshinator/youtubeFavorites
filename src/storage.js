var youtubeFavorites = ( function ($, my) {

	my.storage = function() {
	
		// Stuff that nobody outside this module needs access to
		var storagePrefix = 'youtubeFavorites',
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

			if ( my.debug_log > 1 && data.storedData ) {
				console.log( 'stored data array length :' + data.storedData.length );
				console.log( data.storedData );
				console.log( 'historyData:' + data.historyData );
			}

			// If there is saved favorites, restore them and open the faves accordion
			if ( data.storedData && data.storedData.length ) {
				my.favorites.restoreFavesFromStorage( data.storedData );
				my.accordion.openPanel(2);
			}			
		},


		hasNothingSaved = function() {
			return ( !data.storedData && !data.historyData );
		},


		store = function( allData ) {
			localStorage.setItem( storageKey, JSON.stringify( allData ) );
		};



		return {
			init : init,
			data : data,
			empty : hasNothingSaved,
			store : store
		};
	}();



	return my;
}( jQuery, youtubeFavorites || {} ) );