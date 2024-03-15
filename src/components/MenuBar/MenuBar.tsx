import {
    NavigationMenu,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu.tsx";

function MenuBar(){
    return (
        <div className={"flex w-full justify-center"}>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuLink href={"/"} className={navigationMenuTriggerStyle()}>
                        Curriculum Vitae
                    </NavigationMenuLink>
                    <NavigationMenuLink href={"/articles"} className={navigationMenuTriggerStyle()}>
                        Articles
                    </NavigationMenuLink>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}

export default MenuBar;