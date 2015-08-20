var youtubeFavorites = ( function ($, my) {

	my.youtubeAPI = function() {
		
		var searchEndPoint = 'https://www.googleapis.com/youtube/v3/search',
			defaultApiParams = {
				part: 'snippet',
				maxResults : 25,
				q : 'djembe',
				key: my.googleSearchApiAuthKey
			},
			jqxhr,
			searchTerms = [],
			rawSearchResults = {},


		init = function() {
			// todo: might want to ping the api or something, make sure connection is alive??

			if ( my.debug_log ) { console.log( 'youtubeAPI initialized.' ); }
		},

		lastSearchTerm = function() {
			if ( searchTerms.length ) {
				return searchTerms[ searchTerms.length - 1 ];
			}
			return null;
		},		

		sendSearchRequest = function( apiParams, searchSuccessHandler ) {
			var success = false;

			if ( my.debug_log > 1 ) { 
				console.log( 'In youtubeAPI, search params: ' );
				console.log( apiParams );
			}

			jqxhr = $.get( searchEndPoint, apiParams, function( data ) {
				if ( my.debug_log > 1 ) { console.log('info from request: '); console.info( data ); }
				success = true;
				$.extend( rawSearchResults, data ); 		// deep object copy
				searchSuccessHandler( rawSearchResults );	// Execute function that was passed in			
			})
			.fail(function() {
				console.log( "error searching for term: " + apiParams.q );
			});			
		},


		simpleNoLocationSearch = function( order, searchTerm, searchSuccessHandler ) {
			var apiParams = {
					part: 'snippet',
					maxResults: 25,
					q: searchTerm,
					order: order,
					key: my.googleSearchApiAuthKey
				};

			// if same as last query, then result is already in rawSearchResults
			if ( searchTerms.length && searchTerm === lastSearchTerm() ) return;	// todo: expand this criteria ?

			searchTerms.push( searchTerm );				// save the last search term

			sendSearchRequest( apiParams, searchSuccessHandler );
		},


		simpleLocationBasedSearch = function( lat, lon, radius, order, searchTerm, searchSuccessHandler ) {
			var apiParams = {
					part: 'snippet',
					maxResults: 25,
					q: searchTerm,
					location: lat + ', ' + lon,
					locationRadius: radius,
					order: order,
					key: my.googleSearchApiAuthKey
				};

			// if same as last query, then result is already in rawSearchResults
			if ( searchTerms.length && searchTerm === lastSearchTerm() ) return;	// todo: expand this criteria ?

			searchTerms.push( searchTerm );				// save the last search term

			sendSearchRequest( apiParams, searchSuccessHandler );
		};


		return {
			init : init,
			lastSearchTerm : lastSearchTerm,
			simpleNoLocationSearch: simpleNoLocationSearch,
			simpleLocationBasedSearch : simpleLocationBasedSearch
		};
	}();


	return my;
}( jQuery, youtubeFavorites || {} ) );