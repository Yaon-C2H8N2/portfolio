import {createContext} from "react";

const themeSetting = localStorage.getItem("theme") || "auto";
const theme = themeSetting === "auto" ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : themeSetting;

export const ThemeContext = createContext({theme, themeSetting, toggleTheme: () => {}});