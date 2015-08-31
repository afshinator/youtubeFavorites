var youtubeFavorites = ( function ($, my) {

	my.searchResults = function() {
		
		var $resultsPanel = $( '#panel2' ),
			$resultsSummary = $( '#resultsSummary'),
			$resultsList = $( '#resultsList' ),
			$resultsTitle = $( '#resultsTitle' ),
			rawData,
			paginationLinks,
			pageNumber = 1,							// will be updated by prev/next page click handler
			favoriteStar = '<span class="oi " data-glyph="star" title="favorite Video" aria-hidden="true"></span>',


		// Summary info at the top of search results panel, before the actual results
		setResultsSummary = function() {
			var searchPhrase = rawData.searchPhrase.length > 50 ? (rawData.searchPhrase.substring(0, 50) + '...') : rawData.searchPhrase,
				resultsSummary = '',
				prev = '<span class="oi " data-glyph="arrow-circle-left" title="previous page" aria-hidden="true"></span>',
				next = '<span class="oi " data-glyph="arrow-circle-right" title="next page" aria-hidden="true"></span>';

			paginationLinks = '';

			// Add the search term to the title of the Search Results accordion panel
			$resultsTitle.html( 'Search Results <small>for: "' + searchPhrase + '"</small>' );

			if ( rawData.pageInfo.totalResults - rawData.pageInfo.resultsPerPage < 0 ) {
				resultsSummary += '<p>Showing all ' + rawData.pageInfo.totalResults  + ' results.';
			} else {
				// | 0 will turn a float into an int
				resultsSummary += '<p>Showing page ' + pageNumber + ' of ' + 
				( ( rawData.pageInfo.totalResults / rawData.pageInfo.resultsPerPage ) | 0 ) + ' pages.';
			}


			// For pagination
			if ( rawData.prevPageToken && rawData.prevPageToken !== rawData.pageToken) { 
				paginationLinks += '<small><a class="nextOrPrevLinks" data-to="prev">' + prev + ' Previous page</a></small>  '; 
			}
			if ( rawData.nextPageToken ) { paginationLinks += '<small><a class="nextOrPrevLinks" data-to="next">' + next + ' Next page</a></small> '; }

			resultsSummary += paginationLinks;
			resultsSummary += '</p>';

			$resultsSummary.empty().append( resultsSummary );
		},


		// The actual search results
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
		// third parameter set to true when called because of page change (with same search term)
		setNewSearchResults = function( searchParams, rawSearchResults, skipPageNumberReset ) {
			rawData = null;

			// add search params to obj so we have history of what the search was
			rawData = $.extend( true, searchParams, rawSearchResults );
			
			if ( my.debug_log > 1 ) { console.log( rawData ); }

			// when skipPageNumberReset is true, it was called when we're going to next or prev page
			// so we need to preserve the pageNumber change.
			if ( ! skipPageNumberReset ) { pageNumber = 1; }

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

				// They didnt click on description or star, so it must be the video link or title to view...
				my.vidPlayer.setVideo( videoId );

				// CLose the Search Results and the Favorites panel, open video player panel
				my.accordion.closePanel(1);
				my.accordion.closePanel(2);
				my.accordion.openPanel(3);
			});


			// Handler for previous or next page of search results
			$( '.nextOrPrevLinks' ).on( 'click', function(e) {
				var params = { searchOrder: rawData.searchOrder, searchPhrase : rawData.searchPhrase };
				// console.log( $(this).data( 'to' ) );

				if ( $(this).data( 'to' ) === 'prev' ) {
					params.pageToken = rawData.prevPageToken;
					pageNumber--; 		// private var used to show what page number of results currently showing
				} else {
					params.pageToken = rawData.nextPageToken;
					pageNumber++;
				}


				// if it wasn't a location based search,
				if ( ! rawData.hasOwnProperty( 'latitude' ) ) {
					my.youtubeAPI.simpleNoLocationSearch( params, function( rawSearchResults ) {
						my.statusAlert.statusReady();
						setNewSearchResults( params, rawSearchResults, true );
					});
				}
				else {
					// TODO: location based search
				}

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