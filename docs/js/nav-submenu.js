/*
 * Nested navbar submenu fix for the "united" theme (MkDocs + Bootstrap 5).
 *
 * The theme renders level-2 groups as <li class="dropdown-submenu"><a href="#">,
 * and only js/base.js attaches click handlers for them. Bootstrap 5 registers a
 * delegated click handler on document (click.bs.dropdown.data-api) that closes
 * the open dropdown, and its `hide.bs.dropdown` handling wipes the nested
 * `.show`/`.open` state again, so the nested list never stays expanded.
 *
 * This script intercepts the toggle in the capture phase, which runs before any
 * handler bound by Bootstrap or the theme, and keeps the parent dropdown open.
 */
(function () {
    'use strict';

    function closeAll(scope) {
        if (!scope || !scope.querySelectorAll) {
            return;
        }
        var menus = scope.querySelectorAll('.dropdown-submenu > .dropdown-menu.show');
        var i;
        for (i = 0; i < menus.length; i++) {
            menus[i].classList.remove('show');
        }
        var links = scope.querySelectorAll('.dropdown-submenu > a.open');
        for (i = 0; i < links.length; i++) {
            links[i].classList.remove('open');
            links[i].setAttribute('aria-expanded', 'false');
        }
    }

    document.addEventListener('click', function (event) {
        var target = event.target;
        if (!target || !target.closest) {
            return;
        }
        var link = target.closest('.dropdown-submenu > a');
        if (!link) {
            return;
        }

        event.preventDefault();
        event.stopImmediatePropagation();

        var menu = link.nextElementSibling;
        var wasOpen = link.classList.contains('open');
        closeAll(link.parentElement.parentElement);

        if (!wasOpen && menu && menu.classList.contains('dropdown-menu')) {
            menu.classList.add('show');
            link.classList.add('open');
            link.setAttribute('aria-expanded', 'true');
        }
    }, true);

    document.addEventListener('hide.bs.dropdown', function () {
        closeAll(document);
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeAll(document);
        }
    });
})();
