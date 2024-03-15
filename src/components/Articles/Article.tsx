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
        <div>
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
                    }
                }}
            >
                {content}
            </Markdown>
        </div>
    );
}

export default Article