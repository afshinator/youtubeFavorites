var youtubeFavorites = ( function ($, my) {

	my.statusAlert = function() {
		
		var $statusAlertBox = $( '#statusAlertBox' ),
			$statusText = $( '#statusText' ),

		showStatusAlertBox = function( doneFx ) {
			$statusAlertBox.show( doneFx );
		},

		hideStatusAlertBox = function( duration ) {
			$statusAlertBox.fadeOut( duration );
		},

		updateAlertBoxStatusColor = function( newColor ) {
			$statusAlertBox.css( 'background', newColor ); 
		},

		// Update the text in the alert box with a different short phrase
		updateStatusAlertText = function( shortPhrase ) {
			$statusText.html( shortPhrase );
		},

		// Update the image in the status box with a new image or font-icon image
		// Missing parameter will make it just remove the image		
		updateStatusAlertImage = function( htmlSnippet ) {
			$statusAlertBox.find( '.statusImage' ).remove();

			if ( htmlSnippet ) {
				$statusAlertBox.prepend( htmlSnippet ).addClass( 'statusImage' );  // class adds padding and font-size
			}
		},

		// without parameters it'll do a default
		statusReady = function( img, txt ) {
			updateStatusAlertImage( img );				
			updateStatusAlertText( txt ? txt : '<strong>Ready!</strong>' );
			updateAlertBoxStatusColor( 'green' );
			hideStatusAlertBox( 1000 );
		},


		init = function() {
			if ( my.debug_log ) { console.log( 'statusAlert initialized.' ); }

			updateStatusAlertText( 'Initializing' );
			updateAlertBoxStatusColor( 'yellow' );
		};		


		return {
			init : init,
			hideStatusAlertBox : hideStatusAlertBox,
			showStatusAlertBox : showStatusAlertBox,
			updateStatusAlertText : updateStatusAlertText,
			updateStatusAlertImage : updateStatusAlertImage,
			updateAlertBoxStatusColor : updateAlertBoxStatusColor,
			statusReady : statusReady
		};
	}();


	return my;
}( jQuery, youtubeFavorites || {} ) );