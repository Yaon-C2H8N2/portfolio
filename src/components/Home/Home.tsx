import {Button} from "@/components/ui/button.tsx";
import {Github, Linkedin, Mail} from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";
import ProjetCard, {Projet} from "@/components/Home/ProjetCard.tsx";

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
            tags: ["Java", "React", "PostgreSQL"],
            description: "Développement d'applications web et mobiles au sein de l'équipe Agri-Agro. Contrat d'alternance pendant ma formation en Master BDIA à l'université de Bourgogne."
        }
    ];

    const formations: Formation[] = [
        {
            etablissement: "Université de Bourgogne - Dijon",
            diplome: "Master Informatique option Bases de Données et Intelligence Artificielle",
            periode: "2023 - En cours",
        },
        {
            etablissement: "Université de Bourgogne - Dijon",
            diplome: "Licence Informatique",
            periode: "2019 - 2023",
        },
        {
            etablissement: "Lycée Christophe Colomb - Sucy-en-Brie",
            diplome: "Baccalauréat STI2D option SIN",
            periode: "2016 - 2019",
        }
    ];

    const competences: string[] = [
        "Java (Spring Boot/JAX-RS)", "C++ (Qt)", "React/React Native", "PHP", "PostgreSQL", "JasperReports", "Calculs distribués",
        "Bases de données réparties", "Docker", "Git"
    ];

    const projets: Projet[] = [
        {
            nom: "go-glusterfs",
            periode: "05/2024 - 06/2024",
            tags: ["Go", "GlusterFS", "Wrapper", "CI/CD", "Docker"],
            description: "Wrapper en Go pour GlusterFS. Tests unitaires et CI/CD avec Docker pour simuler un cluster de test. Réalisé en lien avec glusterfs-webui.",
            lien: "https://github.com/Yaon-C2H8N2/go-glusterfs"
        },
        {
            nom: "Snoopy",
            periode: "12/2023 - 03/2024",
            tags: ["Java", "Spring Boot", "React", "PostgreSQL", "Apache POI", "Docker", "CI/CD"],
            description: "Application web en React avec un backend en Spring-Boot pour envoyer des factures pdf à des clients. Déployé avec Docker.",
            lien: "https://github.com/Yaon-C2H8N2/Snoopy"
        },
        {
            nom: "N-Body Simulation",
            periode: "10/2023 - 12/2023",
            tags: ["Calcul distribué", "C++", "MPI", "OpenMPI", "OpenGL", "NBody-Simulation"],
            description: "Simulation à N-Corps développée en C++/MPI. Capable de gérer plus de 100k corps sur une douzaine de nœuds.",
            lien: "https://github.com/Yaon-C2H8N2/Projet-Systemes-Distribues"
        },
        {
            nom: "Cadmium",
            periode: "10/2023 - 12/2023",
            tags: ["TypeScript", "Angular", "TailwindCSS", "GitHub Actions", "CI/CD"],
            description: "Todo list en Angular sans librairies de composants ni Backend. Tests Lint et CI/CD avec GitHub Actions.",
            lien: "https://github.com/Yaon-C2H8N2/Projet-CWA"
        },
        {
            nom: "Lichess Data Analysis",
            periode: "03/2022 - 04/2022",
            tags: ["Java", "Concurrency", "Threads", "Sockets"],
            description: "Projet universitaire de programmation concurrente. Analyse de données de parties d'échecs en Java. 10+To de données.",
            lien: "https://github.com/Yaon-C2H8N2/info4b_project"
        }
    ];

    return (
        <div className={"flex w-full justify-center"}>
            <div className={"flex flex-col max-w-[60%] min-w-[45vh] space-y-5"}>
                <div className={"flex flex-col gap-0.5"}>
                    <h1 className={"text-4xl font-bold mb-2"}>Yoan Dusoleil</h1>
                    <div>Développeur Full Stack</div>
                    <div>Dijon, France</div>
                    <div className={"inline-flex gap-1"}>
                        <a href={"mailto:y.dusoleil@outlook.com"}>
                            <Button variant={"outline"} size={"icon"}>
                                <Mail className={"w-6 h-6"}/>
                            </Button>
                        </a>
                        <a href={"https://github.com/Yaon-C2H8N2"} target={"_blank"}>
                            <Button variant={"outline"} size={"icon"}>
                                <Github className={"w-6 h-6"}/>
                            </Button>
                        </a>
                        <a href={"https://www.linkedin.com/in/yaon/"} target={"_blank"}>
                            <Button variant={"outline"} size={"icon"}>
                                <Linkedin className={"w-6 h-6"}/>
                            </Button>
                        </a>
                    </div>
                </div>
                <div>
                    <h2 className={"text-3xl font-bold mb-2"}>À propos</h2>
                    <div className={"text-justify"}>
                        Etudiant de 24 ans, j'entame ma 2nde année de Master informatique option Bases de données et IA
                        à l'université de Bourgogne. Passionné par l'informatique depuis plus d'une dizaine d'année et
                        plus particulièrement par le développement Backend, j'exerce maintenant dans l'équipe Agri-Agro
                        au sein d'Atol CD en tant que développeur Full-Stack sur les projets MesParcelles,
                        MesCertifications et MonSimulateurPac. Vous trouverez ci-dessous mon CV et mes projets plus en
                        détails. Vous pourrez également trouver des article plus détaillés dans l'onglet "Articles".
                    </div>
                </div>
                <div>
                    <h2 className={"text-3xl font-bold mb-2"}>Expériences</h2>
                    <div className={"flex flex-col gap-1"}>
                        {experiences.map((experience: Experience) => {
                            return (
                                <div key={experience.entreprise}>
                                    <div className={"flex justify-between"}>
                                        <div className={"flex flex-wrap gap-1 items-center"}>
                                            <h3 className={"text-xl font-bold"}>{experience.entreprise}</h3>
                                            {experience.tags.map((tag: string) => {
                                                return (
                                                    <Badge key={"experience-" + tag} className={"h-5"}
                                                           variant={"secondary"}>{tag}</Badge>
                                                )
                                            })}
                                        </div>
                                        <div className={"min-w-[23vh] text-right"}>{experience.periode}</div>
                                    </div>
                                    <div>{experience.poste}</div>
                                    <div className={"text-justify"}>{experience.description}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <h2 className={"text-3xl font-bold mb-2"}>Formations</h2>
                    <div className={"flex flex-col gap-1"}>
                        {formations.map((formation: Formation) => {
                            return (
                                <div key={formation.diplome}>
                                    <div className={"flex justify-between"}>
                                        <h3 className={"text-xl font-bold"}>{formation.etablissement}</h3>
                                        <div className={"min-w-[23vh] text-right"}>{formation.periode}</div>
                                    </div>
                                    <div>{formation.diplome}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <h2 className={"text-3xl font-bold mb-2"}>Compétences</h2>
                    <div className={"flex flex-wrap gap-1"}>
                        {competences.map((competence: string) => {
                            return (
                                <Badge key={"competence-" + competence} className={"h-5"}>{competence}</Badge>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <h2 className={"text-3xl font-bold mb-2"}>Projets</h2>
                    <div className={"flex flex-wrap gap-2 justify-center"}>
                        {projets.map((projet: Projet) => {
                            return (
                                <div key={projet.nom} className={"max-w-[32%] min-w-[21vh] min-h-[30vh]"}>
                                    <ProjetCard projet={projet}/>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
