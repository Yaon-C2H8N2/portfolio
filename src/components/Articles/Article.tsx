import Markdown from "react-markdown";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

function Article() {
    const [content, setContent] = useState("");
    const {state} = useLocation();

    useEffect(() => {
        fetch("/Contents/" + state.filename)
            .then((response) => (response.text()))
            .then((text) => setContent(text))
    }, [state.filename])

    return (
        <div className={"flex min-w-full justify-center items-center min-h-[90vh]"}>
            <div className={"flex flex-col max-w-[60%] min-w-[60%] space-y-2.5"}>
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
                        code(props) {
                            return <code className={"bg-gray-200"}>{props.children}</code>
                        },
                        ul(props) {
                            return <ul className={"list-disc ml-8"}>{props.children}</ul>
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