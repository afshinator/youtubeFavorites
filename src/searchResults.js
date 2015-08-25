var youtubeFavorites = ( function ($, my) {

	my.searchResults = function() {
		
		var $resultsPanel = $( '#panel2' ),
			$resultsSummary = $( '#resultsSummary'),
			$resultsList = $( '#resultsList' ),
			$resultsTitle = $( '#resultsTitle' ),
			rawData,
			paginationLinks,
			favoriteStar = '<span class="oi " data-glyph="star" title="favorite Video" aria-hidden="true"></span>',



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
			resultsSummary += '</p>';

			$resultsSummary.empty().append( resultsSummary );
		},


		setResultsListings = function() {
			var resultsHtml = '<ul class="listing">';

			for ( var i = 0; i < rawData.items.length; i++ ) {
				resultsHtml += '<li>';

				resultsHtml += '<a class="favButton right">' + favoriteStar + '</a>';
				resultsHtml += '<div class="sideBySide ">';
				resultsHtml += '<a class="shadow2 vidLink" data-index="' + i + '" data-videoId="' +  rawData.items[i].id.videoId + '">';
				resultsHtml += '<img class="listingImage " src="' + rawData.items[i].snippet.thumbnails.default.url + '">';
				resultsHtml += '</a></div>';

				resultsHtml += '<div class="sideBySide">';
				resultsHtml += '<a  data-index="' + i + '" data-videoId="' +  rawData.items[i].id.videoId + '">';
				resultsHtml += rawData.items[i].snippet.title + "</a><br>";

				resultsHtml += '<small>' + rawData.items[i].snippet.description + '</small>';

				resultsHtml += '</div></li>';
				resultsHtml += '<hr>';
			}

			resultsHtml += '</ul>';

			$resultsList.empty().append( resultsHtml );
		},


		setResultsFooter = function() {


		},

		setNewSearchResults = function( searchParams, rawSearchResults ) {
			rawData = $.extend( true, searchParams, rawSearchResults );
			console.log( rawData );

			setResultsSummary();
			setResultsListings();
			setResultsFooter();

			bindEvents();
		},



		bindEvents = function() {
			$( '.vidLink' ).on( 'click', function() {
				console.log( $(this).data( 'index' ) );
				$( 'iframe' ).attr( 'src', "https://www.youtube.com/embed/" + $(this).data( 'videoid') + "?rel=0" );
				my.accordion.closePanel(1);
				my.accordion.openPanel(2);				
			});

			$( '.favButton' ).on( 'click', function(e) {
				$(this).off();			// Turn off handler for this listing since its already going to be added to favorites
				$(this).css( 'color', '#581B10' ).animate({fontSize: '1.5em'}, "slow");		// Give some feedback that it was clicked

				my.favorites.addFave( $(this).parent().find( '.vidLink' ).data( 'index' ), $(this).parent() );

				console.log( $(this).parent().find( '.vidLink' ).data( 'index' ) );			// index of which one was clicked
			});
		},

		getListingData = function( index ) {
			return rawData.items[ index ];
		},


		init = function() {
			if ( my.debug_log ) { console.log( 'searchResults initialized.' ); }
		};


		return {
			init : init,
			setNewSearchResults : setNewSearchResults,
			getListingData : getListingData
		};
	}();


	return my;
}( jQuery, youtubeFavorites || {} ) );