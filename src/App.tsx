import {BrowserRouter} from "react-router-dom";
import Router from "@/components/Router/Router.tsx";
import {useEffect, useState} from "react";
import {ThemeContext} from "@/components/Context/Theme.tsx";

function App() {
    const [themeSetting, setThemeSetting] = useState<string>(localStorage.getItem("theme") || "auto");
    const [theme, setTheme] = useState<string>("light");

    const toggleThemeHandler = () => {
        if (themeSetting === "light") {
            setThemeSetting("dark");
        } else if (themeSetting === "dark"){
            setThemeSetting("auto");
        } else {
            setThemeSetting("light");
        }
    }

    useEffect(() => {
        if (themeSetting === "dark") {
            setTheme("dark")
            localStorage.setItem("theme", "dark");
            document.body.classList.add("dark");
        } else if (themeSetting === "light") {
            setTheme("light")
            localStorage.setItem("theme", "light");
            document.body.classList.remove("dark");
        } else {
            localStorage.setItem("theme", "auto");
            const isDark = window.matchMedia("(prefers-color-scheme: dark)");
            if (isDark.matches) {
                setTheme("dark");
                document.body.classList.add("dark");
            } else {
                setTheme("light");
                document.body.classList.remove("dark");
            }
        }
    }, [themeSetting]);

    return (
        <ThemeContext.Provider value={{theme, themeSetting, toggleTheme: toggleThemeHandler}}>
            <BrowserRouter>
                <Router/>
            </BrowserRouter>
        </ThemeContext.Provider>
    )
}

export default App
