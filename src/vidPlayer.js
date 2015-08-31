var youtubeFavorites = ( function ($, my) {

	my.vidPlayer = function() {
	
		var $panel = $( '#panel4' ),
			$vidPlayer,
			playerHeight = '315',					// default height of video player
			playerWidth = '100%',					// default width 
			playerHtml = '<iframe width="100%" frameborder="0" allowfullscreen></iframe>',
			defaultVideoId = 'sL_BcaI0i0w',
			currentVideoId = '',


		setVideo = function( videoId, getRatings ) {
			$vidPlayer.attr( 'src', "https://www.youtube.com/embed/" + videoId + "?rel=0" );
			currentVideoId = videoId;

			if ( getRatings ) {
				my.youtubeAPI.getRatings( videoId, function( data ) {
					console.log( 'Got the ratings : ' );
					console.log( data );
				});
			}
		},

		init = function( optionalVideoId ) {
			currentVideoId = optionalVideoId ? optionalVideoId : defaultVideoId;

			$panel.prepend( playerHtml );						// Inject player into page

			$vidPlayer = $panel.find( 'iframe' );				// Cache access to player dom element

			$vidPlayer.attr( 'height', playerHeight + 'px' );	// Set height of player

			setVideo( currentVideoId, true );
		};


		return {
			init : init,
			currentVideoId : currentVideoId,
			setVideo : setVideo
		};
	}();



	return my;
}( jQuery, youtubeFavorites || {} ) );