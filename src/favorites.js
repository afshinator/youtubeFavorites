var youtubeFavorites = ( function ($, my) {

	my.favorites = function() {
	
		var $favesPanel = $( '#panel3' ),
			$favesList = $( '#favesListings' ),
			deleteFaveIcon = '<span class="oi " data-glyph="x" title="delete favorite" aria-hidden="true"></span>',
			allFaves = [],


		init = function() {
			if ( ! my.storage.empty() ) {
				allFaves = my.storage.data.storedData;
			}
		},

		// Return the current date minus the seconds
		currentDate = function() {
		    var d = new Date().toLocaleString(),
		    	ampm = d.substr( d.length - 2 ),
		    	partToKeep = d.substring( 0, d.lastIndexOf( ':' ) );

		    if ( my.debug_log > 1 ) { console.log( 'date ' + partToKeep + ' ' + ampm ); }
		 
		    return partToKeep + ' ' + ampm;
		},


		restoreFavesFromStorage = function( storedData ) {
			var resultsHtml =  '',
				kind = '';

			for ( var i = 0; i < storedData.length; i++ ) {
				resultsHtml += '<li data-index="' + i + '" data-videoId="' +  storedData[i].id.videoId + '" >';

				// The delete favorite button
				resultsHtml += '<a class="right">' + deleteFaveIcon + '</a>';

				// The listing itself
				resultsHtml += '<div class="sideBySide ">';
					resultsHtml += '<a class="shadow2 vidLink" >';
					resultsHtml += '<img class="listingImage" src="' + storedData[i].snippet.thumbnails.default.url + '">';
					resultsHtml += '</a>';
				resultsHtml += '</div>';

				resultsHtml += '<div class="sideBySide">';
					resultsHtml += '<a>';
kind = storedData[i].id.kind;
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
					resultsHtml += storedData[i].snippet.title + "</a><br>";
					resultsHtml += '<small>' + storedData[i].snippet.description;
					resultsHtml += '<br><i>Date added to favorites: ' + storedData[i].dateAddedToFaves + '</i></small>';
				resultsHtml += '</div>';

				resultsHtml += '</li>';

				resultsHtml += '<hr class="style-two">';
			}

			// resultsHtml += '</ul>';

			$favesList.append( resultsHtml );

			bindEvents();
		},


		addFave = function( searchResultsIndex, searchResultsListing ) {
			var listingHtml = searchResultsListing.clone(),		// Copy over the html from the search results listings
				listingData;

			listingData = my.searchResults.getListingData( searchResultsIndex );
			listingData.dateAddedToFaves = currentDate();
			listingData.etag.delete;							// get rid of useless info

			listingHtml.find( '.oi' ).remove();					// Remove the star icon from the html listing
			listingHtml.prepend( '<a class="right">' + deleteFaveIcon + '</a>' ); 	// Add the delete button
			
			// add the date so it shows immediately in the listings
			listingHtml.find( 'small' ).append( '<br><i>Date added to favorites: ' + listingData.dateAddedToFaves + '</i></small>' );
			listingHtml.append( '<hr class="style-two">' );
			listingHtml.appendTo( $favesList );					// Add it to favorites listings

			my.statusAlert.showStatusAlertBox();
			my.statusAlert.statusReady( '<span class="oi" data-glyph="star" title="favorites" aria-hidden="true"></span>', 'Favorite added' );


			allFaves.push( listingData );

			my.storage.store( allFaves );
		},


		bindEvents = function() {
			$( '#favesListings' ).on( 'click', function( e ) {
				// delegated event caught, so grab who in particular was clicked on and find its parent <li> where data resides
				var eltClickedOn = $( e.target ),
					listEntryClicked$,
					index,
					videoId,
					newAllFaves = [];

				listEntryClicked$ = eltClickedOn.closest( 'li' );


				// Clicked on the description?  Dont do anything
				if ( eltClickedOn.is( 'small' ) ) return;


				index = listEntryClicked$.data( 'index' );
				videoId = listEntryClicked$.data( 'videoid' );

				// Clicked on delete button for favorite?
				if ( eltClickedOn.is( 'span' ) ) {
					console.log('clicked on delete favorite button for : ' + index );

					// Copy contents of favorties to new array, skip the element we're deleting
					for ( var i = 0; i < index; i++ ){
						newAllFaves.push( allFaves[i] );
					}

					for ( i = index + 1; i < allFaves.length; i++ ) {
						newAllFaves.push( allFaves[i] );
					}

					listEntryClicked$.next( 'hr' ).remove();
					listEntryClicked$.fadeOut( "slow", function() { $(this).remove(); });

					allFaves = newAllFaves;

					my.storage.store( allFaves );					

					return;
				}

				// They didnt click on description or delete, so it must be the video link or title...
				my.vidPlayer.setVideo( videoId );

				// CLose both the Search Results and the Favorites panel so the video is viewable
				my.accordion.closePanel(1);
				my.accordion.closePanel(2);	
				my.accordion.openPanel(3);
			});
		};		


		return {
			init : init,
			addFave : addFave,
			restoreFavesFromStorage : restoreFavesFromStorage
		};
	}();



	return my;
}( jQuery, youtubeFavorites || {} ) );