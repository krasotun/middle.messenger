import {defineConfig} from "vite";
import handlebarsPlugin from "@yoichiro/vite-plugin-handlebars";

export default defineConfig({
    server: {
        port: 3000,
    },
    preview: {
        port: 3000,
    },
    plugins: [
        handlebarsPlugin(),
    ],
});
