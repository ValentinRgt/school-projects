import {app, DOM} from './app.js';

import About from '../src/controllers/About.js';
import Home from '../src/controllers/Home.js';
import Search from '../src/controllers/Search.js';
import Login from '../src/controllers/Login.js';

function initializeRouter() {
    // Instanciation du Vanilla Router, en mode hash dans l'URL : /#/<route>
    app.mvc.router = new Router({
        mode: 'hash',
        root: '/index.html',
    });

    // Définition des différentes routes disponibles
    app.mvc.router
        .add('/', () => app.mvc.dispatchRoute(new Home()))
        .add('/search', () => app.mvc.dispatchRoute(new Search()))
        .add('/about', () => app.mvc.dispatchRoute(new About()))
        .add('/login', () => app.mvc.dispatchRoute(new Login()));

    // Synchronisation puis activation du routeur (c.f. https://www.npmjs.com/package/vanilla-router#addurilistener)
    app.mvc.router.check().addUriListener();
}

DOM.addEventListener('DOMContentLoaded', function () {
    initializeRouter();
});