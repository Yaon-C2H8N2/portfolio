import {Route, Routes} from "react-router-dom";
import Layout from "@/components/Router/Layout.tsx";
import Home from "@/components/Home/Home.tsx";
import ArticlesList from "@/components/Articles/ArticlesList.tsx";
import Article from "@/components/Articles/Article.tsx";

function Router() {
    return (
        <Routes>
            <Route
                path={"/"}
                element={
                    <Layout/>
                }
            >
                <Route path={""} element={<Home/>}/>
                <Route path={"articles"} element={<ArticlesList/>}/>
                <Route path={"article/:filename"} element={<Article/>}/>
            </Route>
        </Routes>
    );
}

export default Router;