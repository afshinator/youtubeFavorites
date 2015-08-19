var youtubeFavorites = ( function ($, my) {

	my.youtubeAPI = function() {
		
		var searchDefaultEndpoint = 'https://www.googleapis.com/youtube/v3/search',
			searchEndPoint = '',
			defaultApiParams = {
				part: 'snippet',
				maxResults : 25,
				q : 'djembe',
				key: my.googleSearchApiAuthKey
			},
			jqxhr,
			searchTerms = [],
			rawSearchResults = {},

		bindEvents = function() {

		},

		init = function() {

			bindEvents();

			if ( my.debug_log ) { console.log( 'youtubeAPI initialized.' ); }
		};		



		return {
			init : init
		};
	}();


	return my;
}( jQuery, youtubeFavorites || {} ) );