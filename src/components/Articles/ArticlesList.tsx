import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useNavigate} from "react-router-dom";

function ArticlesList() {
    const navigate = useNavigate();
    const articles = [
        {
            title: "Test article",
            description: "This is a test article",
            date: "2021-10-10",
            filename: "testArticle.md"
        },
        {
            title: "Test article 2",
            description: "This is a test article 2",
            date: "2021-10-11",
            filename: "testArticle2.md"
        }
    ]

    return (
        <div className={"flex flex-col w-full h-[90vh] justify-center items-center"}>
            <div>Test liste articles</div>
            {articles.map((article) => {
                return (
                    <Card className={"hover:cursor-pointer"}
                          onClick={() => (navigate('/article', {state: {filename: article.filename}}))}
                    >
                        <CardHeader>
                            <CardTitle>{article.title}</CardTitle>
                            <CardDescription>{article.description}</CardDescription>
                        </CardHeader>
                    </Card>
                )
            })}
        </div>
    );
}

export default ArticlesList;