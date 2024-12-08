import { createRoot } from "react-dom/client";
import App from "./App.jsx";

const notes = [
    {
        content: "HTML is easy",
        id: 1,
        important: true,
    },
    {
        content: "Browser can execute only JavaScript",
        id: 2,
        important: false,
    },
    {
        content: "GET and POST are the most important methods of HTTP protocol",
        id: 3,
        important: true,
    },
];

createRoot(document.getElementById("root")).render(<App notes={notes} />);
