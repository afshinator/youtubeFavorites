var youtubeFavorites = ( function ($, my) {

	my.searchResults = function() {
		
		var $resultsPanel = $( '#panel2' ),
			$resultsSummary = $( '#resultsSummary'),
			$resultsList = $( '#resultsList' ),
			$resultsTitle = $( '#resultsTitle' ),
			rawData,
			resultsHtml,
			paginationLinks,


		// SearchResult :
		//	Description
		//	publishedAt date
		//	title
		//	thumbnails
		//	videoId
		//	channel


		setResultsSummary = function() {
			var searchPhrase = rawData.searchPhrase.length > 50 ? (rawData.searchPhrase.substring(0, 50) + '...') : rawData.searchPhrase,
				resultsSummary = '';

			paginationLinks = '';

			// Add the search term to the title of the Search Results accordion panel
			$resultsTitle.html( 'Search Results <small>for: "' + searchPhrase + '"</small>' );

			resultsSummary += '<p>Showing ' + rawData.pageInfo.resultsPerPage + ' of ' + rawData.pageInfo.totalResults + ' results.  ';
			
			// For pagination
			if ( rawData.prevPageToken ) { paginationLinks += '<small><a>previous page</a></small>  '; }
			if ( rawData.nextPageToken ) { paginationLinks += '<small><a>next page</a></small> '; }

			resultsSummary += paginationLinks;

			$resultsSummary.empty().append( resultsSummary );
		},


		setResultsListings = function() {
			resultsHtml = '<ul>';

			for ( var i = 0; i < rawData.items.length; i++ ) {
				resultsHtml += '<li>';
				resultsHtml += '<img src="' + rawData.items[i].snippet.thumbnails.default.url + '"> ';
				resultsHtml += rawData.items[i].snippet.title + ' -- ';
				resultsHtml += rawData.items[i].snippet.description;
				resultsHtml += '</li>';
			}

			resultsHtml += '</ul>';

			$resultsList.empty().append( resultsHtml );
		},


		setNewSearchResults = function( searchParams, rawSearchResults ) {
			rawData = $.extend( true, searchParams, rawSearchResults );
			console.log( rawData );

			setResultsSummary();
			setResultsListings();
		},



		bindEvents = function() {

		},


		init = function() {
			if ( my.debug_log ) { console.log( 'searchResults initialized.' ); }
		};


		return {
			init : init,
			setNewSearchResults : setNewSearchResults
		};
	}();


	return my;
}( jQuery, youtubeFavorites || {} ) );