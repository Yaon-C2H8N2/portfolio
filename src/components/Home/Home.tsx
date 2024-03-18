import {Button} from "@/components/ui/button.tsx";
import {Github, Linkedin, Mail} from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";

type Experience = {
    entreprise: string,
    poste: string,
    periode: string,
    description: string
    tags: string[]
};

type Formation = {
    etablissement: string,
    diplome: string,
    periode: string,
};

function Home() {

    const experiences: Experience[] = [
        {
            entreprise: "Atol Conseils et Développements",
            poste: "Développeur Full Stack",
            periode: "2023 - En cours",
            tags: ["Java", "React", "PostgreSQL", "JasperReports", "Docker", "PHP"],
            description: "Développement d'applications web et mobiles pour des clients dans le secteur agricole. En parallèle, je réalise ma formation en alternance."
        }
    ];

    const formations: Formation[] = [
        {
            etablissement: "Université de Bourgogne",
            diplome: "Master Bases de Données et Intelligence Artificielle",
            periode: "2023 - En cours",
        },
        {
            etablissement: "Université de Bourgogne",
            diplome: "Licence Informatique",
            periode: "2019 - 2023",
        }
    ];

    return (
        <div className={"flex w-full h-[90vh] overflow-y-auto justify-center items-center"}>
            <div className={"flex flex-col max-w-[60%] min-w-[60%] space-y-5"}>
                <div>
                    <h1 className={"text-4xl font-bold"}>Yoan Dusoleil</h1>
                    <div>Développeur Full Stack</div>
                    <div>Dijon, France</div>
                    <div>
                        <Button variant={"outline"} size={"icon"}>
                            <Mail className={"w-6 h-6"}/>
                        </Button>
                        <Button variant={"outline"} size={"icon"}>
                            <Github className={"w-6 h-6"}/>
                        </Button>
                        <Button variant={"outline"} size={"icon"}>
                            <Linkedin className={"w-6 h-6"}/>
                        </Button>
                    </div>
                </div>
                <div>
                    <h2 className={"text-3xl font-bold"}>À propos</h2>
                    <div>
                        Passionné par le développement informatique depuis mon plus jeune âge, j'ai maintenant la chance
                        de
                        pouvoir en vivre. Je suis actuellement en fin de formation en Master Bases de Données et
                        Intelligence Artificielle à l'Université de Bourgogne.
                    </div>
                </div>
                <div>
                    <h2 className={"text-3xl font-bold"}>Expériences</h2>
                    {experiences.map((experience: Experience) => {
                        return (
                            <div key={experience.entreprise}>
                                <div className={"flex justify-between"}>
                                    <div className={"flex flex-wrap space-x-1"}>
                                        <h3 className={"text-xl font-bold"}>{experience.entreprise}</h3>
                                        {experience.tags.map((tag: string) => {
                                            return (
                                                <Badge color={"secondary"}>{tag}</Badge>
                                            )
                                        })}
                                    </div>
                                    <div>{experience.periode}</div>
                                </div>
                                <div>{experience.poste}</div>
                                <div>{experience.description}</div>
                            </div>
                        )
                    })}
                </div>
                <div>
                    <h2 className={"text-3xl font-bold"}>Formation</h2>
                    {formations.map((formation: Formation) => {
                        return (
                            <div key={formation.diplome}>
                                <div className={"flex justify-between"}>
                                    <div className={"flex flex-wrap space-x-1"}>
                                        <h3 className={"text-xl font-bold"}>{formation.etablissement}</h3>
                                    </div>
                                    <div>{formation.periode}</div>
                                </div>
                                <div>{formation.diplome}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Home
