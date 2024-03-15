import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

function ArticlesList() {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetch("/Contents/contentList.json")
            .then((response) => (response.json()))
            .then((json) => setArticles(json))
    }, [articles])

    return (
        <div className={"flex flex-col w-full h-[90vh] justify-center items-center"}>
            {articles.map((article: { title: String, description: String, date: String, filename: String }) => {
                return (
                    <Card className={"hover:cursor-pointer min-w-96 max-w-96"}
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