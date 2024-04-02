import Markdown from "react-markdown";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Light as SyntaxHighlighter} from "react-syntax-highlighter";
import {githubGist} from "react-syntax-highlighter/dist/esm/styles/hljs";
import c from "react-syntax-highlighter/dist/esm/languages/hljs/c";
import javascript from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import java from "react-syntax-highlighter/dist/esm/languages/hljs/java";
import typescript from "react-syntax-highlighter/dist/esm/languages/hljs/typescript";
import sql from "react-syntax-highlighter/dist/esm/languages/hljs/sql";

function Article() {
    const [content, setContent] = useState("");
    const {filename} = useParams();

    useEffect(() => {
        fetch("/Contents/" + filename + ".md")
            .then((response) => (response.text()))
            .then((text) => setContent(text))
            .then(() => window.scrollTo(0, 0));
        SyntaxHighlighter.registerLanguage('C', c);
        SyntaxHighlighter.registerLanguage('JavaScript', javascript);
        SyntaxHighlighter.registerLanguage('Java', java);
        SyntaxHighlighter.registerLanguage('TypeScript', typescript);
        SyntaxHighlighter.registerLanguage('SQL', sql);
    }, [filename])

    return (
        <div className={"flex min-w-full justify-center items-center min-h-[90vh]"}>
            <div className={"flex flex-col max-w-[60%] min-w-[45vh] space-y-2.5"}>
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
                            // @ts-expect-error je vais me coller une balle jpp
                            const match = /language-(\w+)/.exec(props.children.props.className || '')

                            // return (
                            //     <div className={"overflow-y-auto"}>
                            //         <pre
                            //             className={"border-gray-200 border-4 pl-3 rounded-lg bg-gray-200 min-w-fit"}>{props.children}</pre>
                            //     </div>
                            // )
                            return (
                                <div className={"overflow-y-auto border-gray-200 border-4 pl-3 rounded-lg bg-gray-200"}>
                                    <SyntaxHighlighter customStyle={{backgroundColor: "rgb(229 231 235)"}} language={match ? match[1] : 'text'} style={githubGist}>
                                        {// @ts-expect-error je vais me coller une balle jpp
                                            (props.children).props.children as string}
                                    </SyntaxHighlighter>
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