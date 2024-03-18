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

    console.log("Before sorting: ", articles)
    articles.sort((a: Article, b: Article) => {
        console.log(Date.parse(b.date) - Date.parse(a.date))
        return Date.parse(b.date) - Date.parse(a.date)
    })
    console.log("After sorting: ", articles)

    return (
        <div className={"flex flex-col w-full h-[90vh] justify-center items-center space-y-5"}>
            {articles.map((article: Article) => {
                return (
                    <Card className={"hover:cursor-pointer hover:shadow-primary min-w-96 max-w-96"}
                          onClick={() => (navigate('/article', {state: {filename: article.filename}}))}
                          key={article.filename}
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