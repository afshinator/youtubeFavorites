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
			var resultsHtml = '<ul class="videoList">';

			for ( var i = 0; i < rawData.items.length; i++ ) {
				resultsHtml += '<li data-index="' + i + '" data-videoId="' +  rawData.items[i].id.videoId + '" >';

				resultsHtml += '<div class="sideBySide" >';
					resultsHtml += '<a class="shadow2 vidLink" >';
					resultsHtml += '<img class="listingImage " src="' + rawData.items[i].snippet.thumbnails.default.url + '">';
					resultsHtml += '</a>';
				resultsHtml += '</div>';

				resultsHtml += '<div class="sideBySide" >';
					resultsHtml += '<a>';
					resultsHtml += rawData.items[i].snippet.title + "</a><br>";
					resultsHtml += '<small>' + rawData.items[i].snippet.description + '</small>';
				resultsHtml += '</div>';

				resultsHtml += '<a class="favButton right">' + favoriteStar + '</a>';

				resultsHtml += '</li>';

				resultsHtml += '<hr>';
			}

			resultsHtml += '</ul>';

			$resultsList
				.empty()								// get rid of previous search results, if any
				.append( resultsHtml );					// inject new results
		},


		setResultsFooter = function() {


		},

		setNewSearchResults = function( searchParams, rawSearchResults ) {
			rawData = $.extend( true, searchParams, rawSearchResults );
			console.log( rawData );

			unbindEvents();		// unbind previous listing handlers, if any

			setResultsSummary();
			setResultsListings();
			setResultsFooter();

			bindEvents();
		},


		unbindEvents = function() {
			$( '.videoList' ).off();
		};

		bindEvents = function() {
			$( '.videoList' ).on( 'click', function( e ) {
				// delegated event caught, so grab who in particular was clicked on and find its parent <li> where data resides
				var eltClickedOn = $( e.target ),
					listEntryClicked$,
					index,
					videoId;	

				listEntryClicked$ = eltClickedOn.closest( 'li' );


				// Clicked on the description?  Dont do anything
				if ( eltClickedOn.is( 'small' ) ) return;


				index = listEntryClicked$.data( 'index' );
				videoId = listEntryClicked$.data( 'videoid' );


				// Clicked on star button to favorite?
				if ( eltClickedOn.is( 'span' ) ) {

					// If this has already been favorited, dont do anything
					if ( eltClickedOn.data( 'alreadyClicked' ) ) return;

					// else we are ready to deal with favoriting
					eltClickedOn.css( 'color', '#581B10' ).animate({fontSize: '1.5em'}, "slow");		// Give some feedback that it was clicked
					my.favorites.addFave( index, listEntryClicked$ );
					eltClickedOn.data( 'alreadyClicked', 'true' );
					return;
				}

				// They didnt click on description or star, so it must be the video link or title...

				$( 'iframe' ).attr( 'src', "https://www.youtube.com/embed/" + videoId + "?rel=0" );
				my.accordion.closePanel(1);
				my.accordion.openPanel(2);	
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