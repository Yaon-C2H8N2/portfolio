import {
    NavigationMenu, NavigationMenuContent, NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList, NavigationMenuTrigger,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu.tsx";

function MenuBar(){
    return (
        <div className={"flex w-full justify-center mb-[3vh]"}>
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
    );
}

export default MenuBar;