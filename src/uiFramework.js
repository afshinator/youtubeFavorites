var youtubeFavorites = ( function ($, my) {

	// Materializer CSS framework stuff and top level ui elements like nav buttons
	my.uiFramework = function() {
		
		var $navMenuItem = $( 'nav .pure-menu-item' ),
			$statusAlertBox = $( '#statusAlertBox' ),
			$statusText = $( '#statusText' ),

		/*
		 * Status Alert Box functions --
		 */

		showStatusAlertBox = function() {
			$statusAlertBox.show();
		},

		hideStatusAlertBox = function( duration ) {
			$statusAlertBox.fadeOut( duration );
		},

		updateAlertBoxStatusColor = function( newColor ) {
			$statusAlertBox.css( 'background', newColor ); 
		},

		// Update the text in the alert box with a different short phrase
		updateStatusAlertText = function( shortPhrase ) {
			$statusText.text( shortPhrase );
		},

		// Update the image in the status box with a new image or font-icon image
		// Missing parameter will make it just remove the image		
		updateStatusAlertImage = function( htmlSnippet ) {
			$statusAlertBox.find( '.statusImage' ).remove();

			if ( htmlSnippet ) {
				$statusAlertBox.prepend( htmlSnippet ).addClass( 'statusImage' );
			}
		},

		// without parameters it'll do a default
		statusReady = function( img, txt ) {
			updateStatusAlertImage( img );				
			updateStatusAlertText( txt ? txt : 'Ready!' );
			updateAlertBoxStatusColor( 'green' );
			hideStatusAlertBox( 1000 );
		},


		/*
		 * Top Navigation menu functions --
		 */

		// Setup nav bar so that it can collapse to vertical
		initNavMenu = function() {
			var menu = document.getElementById('menu'),
			    WINDOW_CHANGE_EVENT = ('onorientationchange' in window) ? 'orientationchange':'resize';

			function toggleHorizontal() {
			    [].forEach.call(
			        document.getElementById('menu').querySelectorAll('.custom-can-transform'),
			        function(el){
			            el.classList.toggle('pure-menu-horizontal');
			        }
			    );
			};

			function toggleMenu() {
			    // set timeout so that the panel has a chance to roll up
			    // before the menu switches states
			    if (menu.classList.contains('open')) {
			        setTimeout(toggleHorizontal, 500);
			    }
			    else {
			        toggleHorizontal();
			    }
			    menu.classList.toggle('open');
			    document.getElementById('toggle').classList.toggle('x');
			};

			function closeMenu() {
			    if (menu.classList.contains('open')) {
			        toggleMenu();
			    }
			}

			document.getElementById('toggle').addEventListener('click', function (e) {
			    toggleMenu();
			});

			window.addEventListener(WINDOW_CHANGE_EVENT, closeMenu);
		},

		initNavButtons = function() {
			// $navMenuItem.on( 'mouseover', function(e) {
			// 	var targetText= $( e.target )[0].innerText;

			// 	if ( targetText  === 'Search' ) {
			// 		$(this).css( 'border-bottom', '2px solid ' + my.constants.colorMustard );
			// 	} 
			// 	else if ( targetText === 'Search Results' ) {
			// 		$(this).css( 'border-bottom', '2px solid ' + my.constants.colorDkGrey );
			// 	}
			// 	else if ( targetText === 'Favorites') {
			// 		$(this).css( 'border-bottom', '2px solid ' + my.constants.colorRust );
			// 	}
			// });
			
			// Put a function on JQuery that will scroll to a given element
			$.fn.goTo = function() {
				$('html, body').animate({
					scrollTop: $(this).offset().top + 'px'
				}, 'fast');

				return this;
			};

			// Scroll to DOM element based on which nav menu item was clicked,
			// tell that accordion to open
			$navMenuItem.on( 'click', function(e) {
				var targetText = $( e.target )[0].innerText,
					panelIndex = null;  

				if ( targetText === 'Search' ) { panelIndex = 0; }		// Index of 'Search'

				// Compensate for 'Search Results' because it has two words; assumes DOM element id is 'resultsTitle'
				if ( targetText.split( ' ' ).length > 1 ) {
					targetText = targetText.split( ' ' )[1];
					panelIndex = 1;										// Index of 'Search Results'
				}

				// Scroll to that accordion element
				$( '#' + targetText.toLowerCase() + 'Title' ).goTo();

				// Tell accordion to open appropriate panel
				if ( panelIndex === null ) { panelIndex = 2; }   		// Index of 'Favorites'

				my.accordion.openPanel( panelIndex );
			});

		},

		init = function() {
			initNavMenu();				// Initialize navigation menu
			my.accordion.init();		// Initialize accordion
			initNavButtons();			// Initialize navigation buttons			

			if ( my.debug_log ) { console.log( 'uiFramework initialized.' ); }
		}();		


		return {
			// init : init 								// auto-executing, no need to call it
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