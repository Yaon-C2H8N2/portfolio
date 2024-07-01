import {
    NavigationMenu, NavigationMenuContent, NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList, NavigationMenuTrigger,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu.tsx";
import {Laptop, MoonIcon, SunIcon} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useContext} from "react";
import {ThemeContext} from "@/components/Context/Theme.tsx";

function MenuBar(){
    const {themeSetting, toggleTheme} = useContext(ThemeContext);

    return (
        <div className={"flex w-full mb-[3vh]"}>
            <div className={"flex w-full justify-center"}>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuLink href={"/"} className={navigationMenuTriggerStyle()}>
                            Curriculum Vitae
                        </NavigationMenuLink>
                        <NavigationMenuLink href={"/articles"} className={navigationMenuTriggerStyle()}>
                            Articles
                        </NavigationMenuLink>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Liens</NavigationMenuTrigger>
                            <NavigationMenuContent className={"min-w-60"}>
                                <ul className={"flex flex-col"}>
                                    <NavigationMenuLink href={"https://github.com/Yaon-C2H8N2"} target={"_blank"} className={navigationMenuTriggerStyle() + " min-w-[100%]"}>
                                        Github
                                    </NavigationMenuLink>
                                    <NavigationMenuLink href={"https://www.linkedin.com/in/yaon/"} target={"_blank"} className={navigationMenuTriggerStyle() + " min-w-[100%]"}>
                                        LinkedIn
                                    </NavigationMenuLink>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div className={"absolute right-0 top-0"}>
                <Button variant={"ghost"} size={"icon"} onClick={()=>(toggleTheme())}>
                    {themeSetting === "dark" ?
                        (<Laptop className={"w-6 h-6"}/>)
                    : themeSetting === "light" ?
                        (<MoonIcon className={"w-6 h-6"}/>)
                    : (<SunIcon className={"w-6 h-6"}/>)}
                </Button>
            </div>
        </div>
    );
}

export default MenuBar;