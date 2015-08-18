var youtubeFavorites = ( function ($, my) {

	// Materializer CSS framework stuff and top level ui elements like nav buttons
	my.uiFramework = function() {
		
		var 

		initNav = function() {
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


		// init() - 
		init = function() {

			// Initialize navigation
			initNav();
			my.accordion.init();

			if ( my.debug_log ) { console.log( 'uiFramework initialized.' ); }
		}();		


		return {
			// init : init 				// auto-executing
		};
	}();


	return my;
}( jQuery, youtubeFavorites || {} ) );