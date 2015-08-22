var youtubeFavorites = ( function ($, my) {

	my.searchBox = function() {
		
		var $searchPanel = $( '#panel1' ),
			$searchPhrase = $( '#searchPhrase' ),
			$submitButton,
			$locationRadius,
			$currentLocationResults,
			$otherLocation,
			$orderOptions,

			searchFilter = 'none',						// default is not to search by location
			searchRadius = '100m',						// default search radius

			firstClickOnCurrentLocation = true,			// 
			firstclickOnOtherLocation = true,

			latitude = 0,								// entered by user or from geolocation
			longitude = 0,
			searchOrder = '',
			searchPhrase = '',


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
				latitude = latit;
				longitude = longit;
				$currentLocationResults.find('input').val( latit + ', ' + longit );
				if ( my.debug_log ) {
					console.log( 'Got callback from geoloc. :' + 'lat:' + latitude + ', long:' + longitude );
				}				
			});

			firstClickOnCurrentLocation = false;
		},

		handleOtherPlaceClick = function() {

		},


		onSearchButtonClick = function( e ) {
			var handleSearchSuccess = function( rawSearchResults ) {
				console.log( 'Search results: ' );
				console.log( rawSearchResults );
			};

			e.preventDefault();			// prevent search button click from refreshing page, ...


			my.uiFramework.updateAlertBoxStatusColor( 'red' );
			my.uiFramework.updateStatusAlertImage( '<span class="oi statusImage" data-glyph="magnifying-glass" title="icon name" aria-hidden="true"></span>' );			
			my.uiFramework.updateStatusAlertText( 'Searching...' );
			my.uiFramework.showStatusAlertBox();



			// Get the ordering options from the checkboxes
			searchOrder = $orderOptions.find( 'input:checked' ).val();

			// Get the actual search phrase
			searchPhrase = $searchPhrase.val();


			// Get long/lat and filter radius information out of input boxes
			// for current location option, geolocation call should've already put long/lat in this modules variables
			if ( searchFilter !== 'none' ) {
				searchRadius = $locationRadius.find( 'input' ).val();

				if ( searchFilter === 'place' ) {
					latitude = $otherLocation.find( '#latitude' ).val();
					longitude = $otherLocation.find( '#longitude' ).val();
				} // else these values already set by geolocation


				if ( my.debug_log ) {
					console.log( 'searchRadius:' + searchRadius + ', lat:' + latitude + ', long:' + longitude );
				}

				// Submit search request with location filter
				my.youtubeAPI.simpleLocationBasedSearch( 
					latitude, 
					longitude, 
					searchRadius, 
					searchOrder,
					searchPhrase,
					handleSearchSuccess
				);
			}
			else {
				// Submit search request without location filter
				my.youtubeAPI.simpleNoLocationSearch( searchOrder, searchPhrase, handleSearchSuccess );
			}

			return false;
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


			// Prevent submit button from refreshing page, get all options out of input/check boxes, submit search
			$submitButton.on( 'click', onSearchButtonClick );
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

			$orderOptions = $searchPanel.find( '#orderOptions'); // Search results ordering options checkboxes

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