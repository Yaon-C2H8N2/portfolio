import {Card} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";

type Projet = {
    nom: string,
    tags: string[],
    periode: string,
    description: string
    lien: string
}

interface ProjetCardProps {
    projet: Projet
}

function ProjetCard(props: ProjetCardProps) {
    return (
        <>
            <Card
                className={"flex flex-col justify-between gap-2 w-full h-full p-3 hover:cursor-pointer hover:shadow-primary"}
                onClick={() => {
                    const anchor = document.createElement("a");
                    anchor.href = props.projet.lien;
                    anchor.target = "_blank";
                    anchor.click();
                }}
            >
                <div className={"flex flex-col gap-1"}>
                    <h4 className={"text-xl font-bold"}>{props.projet.nom}</h4>
                    <div className={"text-sm text-justify"}>{props.projet.description}</div>
                    <div className={"flex flex-wrap gap-1"}>
                        {props.projet.tags.map((tag: string) => {
                            return (
                                <Badge key={tag + "-tag-" + props.projet.nom} className={"h-5 overflow-hidden"}>{tag}</Badge>
                            )
                        })}
                    </div>
                </div>
                <div className={"flex flex-inline justify-center"}>
                    <div className={"text-xs min-w-[15vh] text-center"}>{props.projet.periode}</div>
                </div>
            </Card>
        </>
    )
}

export type {Projet};
export default ProjetCard;