var youtubeFavorites = ( function ($, my) {

	my.searchBox = function() {
		
		var $searchPanel = $( '#panel1' ),
			$searchPhrase = $( '#searchPhrase' ),
			$locationRadius,
			$currentLocationResults,

			searchFilter = 'none',						// default is not to search by location
			searchRadius = '10',						// default search radius


		showOrHideElement = function( elt, show ) {
			if ( show ) {
				elt.slideDown();
			} else {
				elt.slideUp();
			}
		},

		bindEvents = function() {
			// Get radio button choice for search by location filter, 
			// show radius input based on that selection,
			// 
			$searchPanel.find( 'input[name=searchRadio1]' ).on( 'change', function(e) {
				console.log('Search filter radio button was clicked: ' + $(this).val() );
				searchFilter = $(this).val();

				showOrHideElement( $currentLocationResults, searchFilter === 'here' ? true : false );
				showOrHideElement( $locationRadius, searchFilter !== 'none' ? true : false );
			});
		},

		init = function() {
			$currentLocationResults = $searchPanel.find( '#currentLocationResults' );
			$currentLocationResults.removeClass( 'hidden' ).hide();
			
			$locationRadius = $searchPanel.find( '#locationRadius' );			// cache access to element
			$locationRadius.removeClass( 'hidden' ).hide();
			$locationRadius.val( searchRadius );

			bindEvents();

			if ( my.debug_log ) { console.log( 'Search Box initialized.' ); }
		};		



		return {
			init : init
		};
	}();


	return my;
}( jQuery, youtubeFavorites || {} ) );