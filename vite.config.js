import {defineConfig} from "vite";
import {resolve} from "path";
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
    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, "index.html"),
                signUp: resolve(__dirname, "sign-up.html"),
                main: resolve(__dirname, "main.html"),
                editProfile: resolve(__dirname, "edit-profile.html"),
                notFound: resolve(__dirname, "404.html"),
                serverError: resolve(__dirname, "500.html"),
            },
        },
    },
});
