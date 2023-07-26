import "./App.css";
import AceEditor from "react-ace";
import NavBar from "./components/Navbar";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/keybinding-vscode";
import {
    Card,
    Loading,
    createTheme,
    Grid,
    NextUIProvider,
    Text,
} from "@nextui-org/react";
import { useState } from "react";

function App() {
    const theme = createTheme({
        type: "dark",
        theme: {
            colors: {
                background: "#21232B",
            },
        },
    });

    const state = {};
    const [code, setCode] = useState("# Start playing with python\n\n");
    const [output, setOutput] = useState();
    const [runBtn, setRunBtn] = useState("Run");

    const onCodeChange = (value, event) => {
        setCode(value);
    };

    const onPrint = (message) => {
        state.output += message;
    };
    const sk = eval("Sk");

    const onRun = () => {
        state.output = "";
        setOutput("");
        setRunBtn(
            <Loading type="points-opacity" color="currentColor" size="sm" />
        );
        sk.configure({ output: onPrint });
        var myPromise = sk.misceval.asyncToPromise(function () {
            return sk.importMainWithBody("<stdin>", false, code, true);
        });
        myPromise.then(
            function (mod) {
                setOutput(state.output);
                setRunBtn("Run");
            },
            function (err) {
                setOutput(err.toString());
            }
        );
    };

    const onSave = () => {
        const element = document.createElement("a");
        const file = new Blob([code], { type: "text/python" });
        element.href = URL.createObjectURL(file);
        element.download = "pyplay-code.py";
        document.body.appendChild(element);
        element.click();
    };

    const onCopy = () => {
        navigator.clipboard.writeText(code);
    };

    return (
        <NextUIProvider theme={theme}>
            <NavBar
                runText={runBtn}
                onRun={onRun}
                onCopy={onCopy}
                onSave={onSave}
            ></NavBar>
            <Grid.Container
                justify="center"
                style={{ height: "calc(100vh - 54px)" }}
            >
                <Grid xs={8}>
                    <AceEditor
                        mode="python"
                        theme="dracula"
                        value={code}
                        fontSize={16}
                        showPrintMargin={false}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true,
                        }}
                        height={"100%"}
                        width={"100%"}
                        focus
                        keyboardHandler="vscode"
                        onChange={onCodeChange}
                    />
                </Grid>
                <Grid xs={4} style={{ borderLeft: "8px #21232B solid" }}>
                    <Card
                        className="mains"
                        variant="flat"
                        css={{
                            borderRadius: 0,
                            backgroundColor: "#282a36",
                            height: "calc(100vh - 54px)",
                        }}
                    >
                        <Text
                            size={"$sm"}
                            css={{
                                letterSpacing: 0.3,
                                margin: "8px",
                                whiteSpace: "pre",
                                overflow: "scroll",
                                font: "16.4px Inconsolata, monospace",
                            }}
                        >
                            {output}
                        </Text>
                    </Card>
                </Grid>
            </Grid.Container>
        </NextUIProvider>
    );
}

export default App;
