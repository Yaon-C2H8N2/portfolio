import {Github} from "lucide-react";

function Footer(){
    return (
        <div className={"flex w-full justify-center"}>
            <div className={"flex flex-col max-w-[60%] min-w-[45vh] gap-2 items-center mt-[3vh] mb-[3vh] text-gray-400 text-center"}>
                <div>Le code de ce site est open source et disponible sur Github (Tout retour est le bienvenu)</div>
                <a href={"https://github.com/Yaon-C2H8N2/portfolio"} target={"_blank"}>
                    <Github size={24}/>
                </a>
            </div>
        </div>
    );
}

export default Footer;