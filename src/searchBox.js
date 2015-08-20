var youtubeFavorites = ( function ($, my) {

	my.searchBox = function() {
		
		var $searchPanel = $( '#panel1' ),
			$searchPhrase = $( '#searchPhrase' ),
			$submitButton,
			$locationRadius,
			$currentLocationResults,
			$otherLocation,

			searchFilter = 'none',						// default is not to search by location
			searchRadius = '10',						// default search radius

			firstClickOnCurrentLocation = true,			// 
			firstclickOnOtherLocation = true,

			latitude = 0,								// entered by user or from geolocation
			longitude = 0,


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
			// Ask browser for geolocation, send that module a function to call
			// when browser responds with success.
			// On error condition, geolocation module calls this modules handleGeolocationError()
			my.geolocation.getLocation( function( longit, latit ) {
				$currentLocationResults.find('input').val( latit + ', ' + longit );
			});

			firstClickOnCurrentLocation = false;
		},

		handleOtherPlaceClick = function() {

		},


		bindEvents = function() {
			// Get radio button choice for search by location filter, 
			// show radius input based on that selection, and call apropriate handler.
			$searchPanel.find( 'input[name=searchRadio1]' ).on( 'change', function(e) {
				console.log('Search filter radio button was clicked: ' + $(this).val() );
				searchFilter = $(this).val();

				// Take care of hiding / showing options based on radio button clicks
				showOrHideElement( $currentLocationResults, searchFilter === 'here' ? true : false );
				showOrHideElement( $locationRadius, searchFilter !== 'none' ? true : false );				
				showOrHideElement( $otherLocation, searchFilter === 'place' ? true : false );


				if ( searchFilter === 'none' ) 		{ handleNoFilterClick(); }
				else if ( searchFilter === 'here' ) { handleHereClick(); }
				else if ( searchFilter === 'place' ) { handleOtherPlaceClick(); }
			});

			// Prevent submit button from refreshing page, ...
			$submitButton.on( 'click', function( e ) {
				e.preventDefault();

				// Get long/lat and filter radius information out of input boxes
				// for Current location, geolocation call should've already put long/lat in this modules variables
				if ( searchFilter !== 'none' ) {
					searchRadius = $locationRadius.find( 'input' ).val();
					latitude = $otherLocation.find( '#latitude' ).val();
					longitude = $otherLocation.find( '#longitude' ).val();
					if ( my.debug_log ) {
						console.log( 'searchRadius:' + searchRadius + ', lat:' + latitude + ', long:' + longitude );
					}
				}
			});

		},

		init = function() {
			// Search submit button
			$submitButton = $searchPanel.find( 'button[type="submit"]' );

			// Current location - it will display results of geolocation
			$currentLocationResults = $searchPanel.find( '#currentLocationResults' );
			$currentLocationResults.removeClass( 'hidden' ).hide();		// remove 'hidden' class so we can show()/hide()

			// Location radius - input will ask for radius from chosen location to filter search by
			$locationRadius = $searchPanel.find( '#locationRadius' );			
			$locationRadius.removeClass( 'hidden' ).hide();
			$locationRadius.find('input').val( searchRadius );						// inject the default

			// Choosing another location based on latitude/longitude
			$otherLocation = $searchPanel.find( '#otherLocation' );
			$otherLocation.removeClass( 'hidden' ).hide();

			bindEvents();

			if ( my.debug_log ) { console.log( 'Search Box initialized.' ); }
		},

		handleGeolocationError = function( errStr ) {
			$currentLocationResults.find('input').val( errStr );
		};



		return {
			init : init,
			handleGeolocationError : handleGeolocationError
		};
	}();


	return my;
}( jQuery, youtubeFavorites || {} ) );