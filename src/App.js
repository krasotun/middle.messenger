import MainPageTemplate from "./pages/main-page/index.js";


export class App {
    init() {
        const appContainer = document.getElementById('app');

        appContainer.innerHTML = MainPageTemplate({title: 'Hello world'})
    }
}