var youtubeFavorites = ( function ($, my) {

	my.accordion = function() {
		
		// Constants
		var numberOfPanes = 3;

		// Private vars
		var panelStatus = [],
			$accordion = $( '#accordion' ),


		togglePanel = function( panelIndex ) {
			if ( panelStatus[ panelIndex ] ) {		// if open, then close it
				$accordion.find( '#panel' + (panelIndex + 1) ).slideUp();	// hide the panel in the dom
				panelStatus[ panelIndex ] = 0;
			}
			else {		// it was closed, so open it
				$accordion.find( '#panel' + (panelIndex + 1) ).slideDown();	// show the panel
				panelStatus[ panelIndex ] = 1;				
			}
		},

		openPanel = function( panelIndex ) {
			if ( panelStatus[ panelIndex] ) {	// if its open, we dont need to do anything
				return;
			} 
			else {
				togglePanel( panelIndex );
			}
		},


		bindEvents = function() {
			$accordion.find( '.accordion-title' ).on( 'click', function() {
				var hrefOfClickedTitle = $(this).attr('href'),
					thisPanel$ = $(this).find( '.accordion-panel' ),
					whichPanel;

				whichPanel = hrefOfClickedTitle[ hrefOfClickedTitle.length - 1 ];
				togglePanel( whichPanel - 1 );
			});
		},

		init = function() {

			// panelStatus array will hold the open/closed status of each panel pane
			// 0 == closed, 1 == open
			for ( var i=0; i < numberOfPanes; i++ ) {
				panelStatus[ i ] = 0;							// default status is closed
				$accordion.find( '#panel' + (i + 1) ).hide();	// hide the panel in the dom
			}

			bindEvents();

			if ( my.debug_log ) { console.log( 'accordion initialized.' ); }
		};		



		return {
			init : init,
			openPanel : openPanel,
			togglePanel : togglePanel
		};
	}();


	return my;
}( jQuery, youtubeFavorites || {} ) );