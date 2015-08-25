var youtubeFavorites = ( function ($, my) {

	my.favorites = function() {
	

		var $favesPanel = $( '#panel3' ),
			$favesList,


		init = function() {
			$favesList = $favesPanel.find( '#favesList' );
		},

		addFave = function( searchResultsIndex, searchResultsListing ) {
			var listing = searchResultsListing.clone();

			listing.find( '.oi' ).remove();

			listing.appendTo( $favesList );

			// console.log( searchResultsListing.clone().appendTo( $favesList ) );

			my.uiFramework.showStatusAlertBox();
			my.uiFramework.statusReady( '<span class="oi" data-glyph="star" title="favorites" aria-hidden="true"></span>', 'Favorite added' );
		};


		return {
			init : init,
			addFave : addFave
		};
	}();



	return my;
}( jQuery, youtubeFavorites || {} ) );