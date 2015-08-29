var youtubeFavorites = ( function ($, my) {

	my.searchResults = function() {
		
		var $resultsPanel = $( '#panel2' ),
			$resultsSummary = $( '#resultsSummary'),
			$resultsList = $( '#resultsList' ),
			$resultsTitle = $( '#resultsTitle' ),
			rawData,
			paginationLinks,
			favoriteStar = '<span class="oi " data-glyph="star" title="favorite Video" aria-hidden="true"></span>',


		// After the search is done, show some information about the search results at the top before the actual results
		setResultsSummary = function() {
			var searchPhrase = rawData.searchPhrase.length > 50 ? (rawData.searchPhrase.substring(0, 50) + '...') : rawData.searchPhrase,
				resultsSummary = '',
				prev = '<span class="oi " data-glyph="arrow-circle-left" title="previous page" aria-hidden="true"></span>',
				next = '<span class="oi " data-glyph="arrow-circle-right" title="next page" aria-hidden="true"></span>';

			paginationLinks = '';

			// Add the search term to the title of the Search Results accordion panel
			$resultsTitle.html( 'Search Results <small>for: "' + searchPhrase + '"</small>' );

			resultsSummary += '<p>Showing ' + rawData.pageInfo.resultsPerPage + ' of ' + rawData.pageInfo.totalResults + ' results.  ';
			
			// For pagination
			if ( rawData.prevPageToken ) { paginationLinks += '<small><a class="nextOrPrevLinks" data-to="prev">' + prev + ' previous page</a></small>  '; }
			if ( rawData.nextPageToken ) { paginationLinks += '<small><a class="nextOrPrevLinks" data-to="next">' + next + ' next page</a></small> '; }

			resultsSummary += paginationLinks;
			resultsSummary += '</p>';

			$resultsSummary.empty().append( resultsSummary );
		},


		setResultsListings = function() {
			var resultsHtml = '<ul id="resultsListings" class="videoList">',
				kind = '';

			for ( var i = 0; i < rawData.items.length; i++ ) {
				resultsHtml += '<li data-index="' + i + '" data-videoId="' +  rawData.items[i].id.videoId + '" >';

				resultsHtml += '<div class="sideBySide" >';
					resultsHtml += '<a class="shadow2 vidLink" >';
					resultsHtml += '<img class="listingImage " src="' + rawData.items[i].snippet.thumbnails.default.url + '">';
					resultsHtml += '</a>';
				resultsHtml += '</div>';

				resultsHtml += '<div class="sideBySide" >';
					resultsHtml += '<a>';

kind = rawData.items[i].id.kind;
kind = kind.substr( kind.indexOf( '#' ) + 1 );
if ( kind === 'video' ) {
	resultsHtml += '<span class="oi resultType" data-glyph="video" title="video" aria-hidden="true"></span> ';
} else 
if ( kind === 'playlist' ) {
	resultsHtml += '<span class="oi resultType" data-glyph="list" title="playlist" aria-hidden="true"></span> ';
} else
if ( kind === 'channel' ) {
	resultsHtml += '<span class="oi resultType" data-glyph="dial" title="channel" aria-hidden="true"></span> ';	
}

					resultsHtml += rawData.items[i].snippet.title + "</a><br>";
					resultsHtml += '<small>' + rawData.items[i].snippet.description + '</small>';
				resultsHtml += '</div>';

				resultsHtml += '<a class="favButton right">' + favoriteStar + '</a>';

				resultsHtml += '</li>';

				resultsHtml += '<hr class="style-two">';
			}

			resultsHtml += '</ul>';

			$resultsList
				.empty()								// get rid of previous search results, if any
				.append( resultsHtml );					// inject new results
		},


		setResultsFooter = function() {


		},


		// Called by searchBox to handle successful search
		setNewSearchResults = function( searchParams, rawSearchResults ) {
			// add search params to obj so we have history of what the search was
			rawData = $.extend( true, searchParams, rawSearchResults );
			
			if ( my.debug_log > 1 ) { console.log( rawData ); }

			unbindEvents();		// unbind previous listing handlers, if any

			setResultsSummary();
			setResultsListings();
			setResultsFooter();

			bindEvents();
		},


		unbindEvents = function() {
			$( '#resultsListings' ).off();
			$( '.nextOrPrevLinks' ).off();
		};

		bindEvents = function() {

			// Handle click on a search results entry
			//
			$( '#resultsListings' ).on( 'click', function( e ) {
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

				// CLose both the Search Results and the Favorites panel so the video is viewable
				my.accordion.closePanel(1);
				my.accordion.closePanel(2);	
			});


			// Handler for previous or next page of search results
			$( '.nextOrPrevLinks' ).on( 'click', function(e) {
				var params = { searchOrder: rawData.searchOrder, searchPhrase : rawData.searchPhrase };
				// console.log( $(this).data( 'to' ) );

				if ( $(this).data( 'to' ) === 'prev' ) {
					params.pageToken = rawData.prevPageToken;
				} else {
					params.pageToken = rawData.nextPageToken;
				}


				// if it wasn't a location based search,
				if ( ! rawData.hasOwnProperty( 'latitude' ) ) {
					my.youtubeAPI.simpleNoLocationSearch( params, function( rawSearchResults ) {
						my.statusAlert.statusReady();
						setNewSearchResults( params, rawSearchResults );
					});
				}
				else {
					// TODO: location based search
				}


				console.log( rawData );
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