var youtubeFavorites = ( function ($, my) {

	my.searchBox = function() {
		
		var $searchPanel = $( '#panel1' ),
			$searchPhrase = $( '#searchPhrase' ),
			$locationRadius,
			$currentLocationResults,
			$otherLocation,

			searchFilter = 'none',						// default is not to search by location
			searchRadius = '10',						// default search radius

			firstClickOnCurrentLocation = true,			// 
			firstclickOnOtherLocation = true,


		showOrHideElement = function( elt, show ) {
			if ( show ) {
				elt.slideDown();
			} else {
				elt.slideUp();
			}
		},

		handleNoFilterClick = function() {

		},

		handleHereClick = function() {
			my.geolocation.getLocation( function( longit, latit ) {
				$currentLocationResults.find('input').val( latit + ', ' + longit );
			});

			firstClickOnCurrentLocation = false;
		},

		handleOtherPlaceClick = function() {

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
				showOrHideElement( $otherLocation, searchFilter === 'place' ? true : false );


				if ( searchFilter === 'none' ) 			{ handleNoFilterClick(); }
				else if ( searchFilter === 'here' ) 	{ handleHereClick(); }
				else if ( searchFilter === 'place' ) 	{ handleOtherPlaceClick(); }
			});
		},

		init = function() {
			// Current location - it will display results of geolocation
			$currentLocationResults = $searchPanel.find( '#currentLocationResults' );
			$currentLocationResults.removeClass( 'hidden' ).hide();		// remove 'hidden' class so we can show()/hide()

			// Location radius - input will ask for radius from chosen location to filter search by
			$locationRadius = $searchPanel.find( '#locationRadius' );			
			$locationRadius.removeClass( 'hidden' ).hide();
			$locationRadius.val( searchRadius );						// inject the default

			// Choosing another location based on latitude/longitude
			$otherLocation = $searchPanel.find( '#otherLocation' );
			$otherLocation.removeClass( 'hidden' ).hide();

			bindEvents();

			if ( my.debug_log ) { console.log( 'Search Box initialized.' ); }
		};		



		return {
			init : init
		};
	}();


	return my;
}( jQuery, youtubeFavorites || {} ) );