import Markdown from "react-markdown";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

function Article() {
    const [content, setContent] = useState("");
    const {filename} = useParams();

    useEffect(() => {
        fetch("/Contents/" + filename + ".md")
            .then((response) => (response.text()))
            .then((text) => setContent(text))
            .then(() => window.scrollTo(0, 0))
    }, [filename])

    return (
        <div className={"flex min-w-full justify-center items-center min-h-[90vh]"}>
            <div className={"flex flex-col max-w-[60%] min-w-[50vh] space-y-2.5"}>
                <Markdown
                    components={{
                        h1(props) {
                            return <h1 className={"text-4xl font-bold"}>{props.children}</h1>
                        },
                        h2(props) {
                            return <h2 className={"text-3xl font-bold"}>{props.children}</h2>
                        },
                        h3(props) {
                            return <h3 className={"text-2xl font-bold"}>{props.children}</h3>
                        },
                        h4(props) {
                            return <h4 className={"text-xl font-bold"}>{props.children}</h4>
                        },
                        pre(props) {
                            return (
                                <div className={"overflow-y-auto"}>
                                    <pre
                                        className={"border-gray-200 border-4 pl-3 rounded-lg bg-gray-200 min-w-fit"}>{props.children}</pre>
                                </div>
                            )
                        },
                        code(props) {
                            return <code className={"bg-gray-200 border-4 rounded-lg"}>{props.children}</code>
                        },
                        ul(props) {
                            return <ul className={"list-disc ml-8"}>{props.children}</ul>
                        },
                        p(props) {
                            return <p className={"text-justify"}>{props.children}</p>
                        },
                        a(props) {
                            return <a href={props.href} target={"_blank"}
                                      className={"text-blue-500"}>{props.children}</a>
                        },
                        blockquote(props) {
                            return <blockquote
                                className={"border-l-4 border-gray-200 pl-4"}>{props.children}</blockquote>
                        }
                    }}
                >
                    {content}
                </Markdown>
            </div>
        </div>
    );
}

export default Article