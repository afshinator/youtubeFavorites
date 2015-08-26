var youtubeFavorites = ( function ($, my) {

	my.favorites = function() {
	

		var $favesPanel = $( '#panel3' ),
			$favesList = $( '#favesList' ),
			deleteFaveIcon = '<span class="oi " data-glyph="x" title="delete favorite" aria-hidden="true"></span>',
			allFaves = [],


		init = function() {
			if ( ! my.storage.empty() ) {
				allFaves = my.storage.data.storedData;
			}
		},


		currentDate = function() {
		    var d = new Date();
		    return d.toLocaleString();
		},


		restoreFavesFromStorage = function( storedData ) {
			var resultsHtml = '<ul class="videoList">';

			for ( var i = 0; i < storedData.length; i++ ) {
				// The delete favorite button
				resultsHtml += '<a class="favButton right">' + deleteFaveIcon + '</a>';

				// The listing itself
				resultsHtml += '<div class="sideBySide ">';
				resultsHtml += '<a class="shadow2 vidLink" data-index="' + i + '" data-videoId="' +  storedData[i].id.videoId + '">';
				resultsHtml += '<img class="listingImage " src="' + storedData[i].snippet.thumbnails.default.url + '">';
				resultsHtml += '</a></div>';

				resultsHtml += '<div class="sideBySide">';
				resultsHtml += '<a  data-index="' + i + '" data-videoId="' +  storedData[i].id.videoId + '">';
				resultsHtml += storedData[i].snippet.title + "</a><br>";

				resultsHtml += '<small>' + storedData[i].snippet.description + '</small>';

				resultsHtml += '<br><i>Date added to favorites: ' + storedData[i].dateAddedToFaves + '</i>';

				resultsHtml += '</div></li>';
				resultsHtml += '<hr>';
			}

			resultsHtml += '</ul>';

			$favesList.append( resultsHtml );
		},


		addFave = function( searchResultsIndex, searchResultsListing ) {
			var listingHtml = searchResultsListing.clone(),		// Copy over the html from the search results listings
				listingData;

			listingHtml.find( '.oi' ).remove();					// Remove the star icon from the html listing
			listingHtml.appendTo( $favesList );					// Add it to favorites listings

			my.uiFramework.showStatusAlertBox();
			my.uiFramework.statusReady( '<span class="oi" data-glyph="star" title="favorites" aria-hidden="true"></span>', 'Favorite added' );

			listingData = my.searchResults.getListingData( searchResultsIndex );
			listingData.dateAddedToFaves = currentDate();

			allFaves.push( listingData );

			my.storage.store( allFaves );
		},


		bindEvents = function() {
			$( '.vidLink' ).on( 'click', function() {
				console.log( $(this).data( 'index' ) );
				$( 'iframe' ).attr( 'src', "https://www.youtube.com/embed/" + $(this).data( 'videoid') + "?rel=0" );

				
				my.accordion.closePanel(1);
				my.accordion.openPanel(2);				
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