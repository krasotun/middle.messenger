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
        appContainer.innerHTML = SignInPageTemplate({title: 'Hello world'});
    }

    _throwRenderError() {
        throw new Error('Container with id="app" not found! Please, create it');
    }
}