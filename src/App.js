import {renderTempNav} from './components/temp-nav/temp-nav.js';
import SignInPageTemplate from "./pages/sign-in-page/index.js";


export class App {
    init() {
        const appContainer = document.getElementById('app');

        if (appContainer) {
            this._renderApp(appContainer);
        } else {
            this._throwRenderError();
        }
    }

    _renderApp(appContainer) {
        // Temporary navigation: remove after routing is added.
        appContainer.innerHTML = renderTempNav() + SignInPageTemplate({title: 'Hello world'});
    }

    _throwRenderError() {
        throw new Error('Container with id="app" not found! Please, create it');
    }
}
