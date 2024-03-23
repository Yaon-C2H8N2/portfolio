import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

type Article = {
    title: string,
    description: string,
    date: string,
    filename: string
}

function ArticlesList() {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetch("/Contents/contentList.json")
            .then((response) => (response.json()))
            .then((json) => setArticles(json))
    }, [])

    articles.sort((a: Article, b: Article) => {
        return Date.parse(b.date) - Date.parse(a.date)
    })

    return (
        <div className={"flex min-h-[90vh] justify-center items-center"}>
            <div className={"flex flex-wrap w-full max-w-[95vh] justify-center items-center gap-5"}>
                {articles.map((article: Article) => {
                    return (
                        <Card
                            className={"hover:cursor-pointer hover:shadow-primary w-[45vh] h-[18vh] flex flex-col justify-center"}
                            onClick={() => (navigate('/article/' + article.filename.replace(".md", "")))}
                            key={article.filename}
                        >
                            <CardHeader>
                                <CardTitle>{article.title}</CardTitle>
                                <CardDescription className={"max-h-[9vh]"}>{article.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    )
                })}
            </div>
        </div>
    );
}

export default ArticlesList;