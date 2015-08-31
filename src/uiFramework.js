var youtubeFavorites = ( function ($, my) {

	// Materializer CSS framework stuff and top level ui elements like nav buttons
	my.uiFramework = function() {
		
		var $navMenuItem = $( 'nav .pure-menu-item' ),


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
			// Put a function on JQuery that will scroll to a given element
			$.fn.goTo = function() {
				$('html, body').animate({
					scrollTop: $(this).offset().top + 'px'
				}, 'fast');

				return this;
			};

			// Scroll to DOM element based on which nav menu item was clicked,
			// tell that accordion to open
			$navMenuItem.add( '.footerNav' ).on( 'click', function(e) {
				var targetText = $( e.target )[0].innerText,
					panelIndex = null;

				switch ( targetText ) {
					case 'Search':
						panelIndex = 0;
						break;

					case 'Favorites':
						panelIndex = 2;
						break;

					case 'Video Player':
						targetText = 'player';
						panelIndex = 3;
						break;

					default: 							// Search Results
						targetText = 'results';
						panelIndex = 1;
				}

				// Scroll to that accordion element
				$( '#' + targetText.toLowerCase() + 'Title' ).goTo();				

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
		};
		
	}();


	return my;
}( jQuery, youtubeFavorites || {} ) );