var youtubeFavorites = ( function ($, my) {

	my.favorites = function() {
	

		var $favesPanel = $( '#panel3' ),
			$favesList,
			allFaves = [],


		init = function() {
			$favesList = $favesPanel.find( '#favesList' );

			if ( ! my.storage.empty() ) {
				allFaves = my.storage.data.storedData;
			}
		},


		currentDate = function() {
		    var d = new Date();
		    return d.toLocaleString();
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
		};


		return {
			init : init,
			addFave : addFave
		};
	}();



	return my;
}( jQuery, youtubeFavorites || {} ) );