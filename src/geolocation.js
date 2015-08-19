var youtubeFavorites = ( function ($, my) {

	my.geolocation = function() {
		
		var longitude,
			latitude,
			errResult = '',
			successCallback,
			gotMap = false,
			map_img_url,

		getMap = function() {
			var latlon = latitude + "," + longitude;

			map_img_url = "http://maps.googleapis.com/maps/api/staticmap?center=" 
				+ latlon 
				+ "&zoom=14&size=250x250&sensor=false";

			gotMap = true;
		},

		processError = function( error ) {
		    switch(error.code) {
		        case error.PERMISSION_DENIED:
		            errResult = "User denied the request for Geolocation."
		            break;
		        case error.POSITION_UNAVAILABLE:
		            errResult = "Location information is unavailable."
		            break;
		        case error.TIMEOUT:
		            errResult = "The request to get user location timed out."
		            break;
		        case error.UNKNOWN_ERROR:
		            errResult = "An unknown error occurred."
		            break;
		    }

			if ( my.debug_log ) { console.error( 'geolocation:' + errResult ); }

		    return errResult;
		},


		processSuccess = function( position ) {
		    latitude = position.coords.latitude;
		    longitude = position.coords.longitude;
			if ( my.debug_log ) { console.info( 'longitude:' + longitude + ' -- latitude:' + latitude ); }		    
		    successCallback( longitude, latitude );
		},


		getLocation = function( callbackFunction ) {
			successCallback = callbackFunction;

		    if (navigator.geolocation) {
		        navigator.geolocation.getCurrentPosition( processSuccess, processError );
		    } else { 
		        errResult = "Geolocation is not supported by this browser.";
				if ( my.debug_log ) { console.error( 'geolocation:' + errResult ); }		        
		    }
		};


		return {
			getLocation : getLocation,
			gotMap : gotMap,
			map_img_url : map_img_url
		};
	}();


	return my;
}( jQuery, youtubeFavorites || {} ) );