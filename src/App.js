import {MainPageTemplate} from "./pages/main-page/index.js";
import Handlebars from 'handlebars';

export class App {
    init() {
        const appContainer = document.getElementById('app');
        const template = Handlebars.compile(MainPageTemplate);

        appContainer.innerHTML = template({title: 'Hello World'});
    }
}