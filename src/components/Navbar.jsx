import { Navbar, Button, Text, Image } from "@nextui-org/react";
import { useState } from "react";
import { BsFillCaretRightFill } from "react-icons/bs";
import { IoSave, IoCopy } from "react-icons/io5";
import { useMediaQuery } from "../utils/useMediaQuery";

function NavBar(props) {
    const isMd = useMediaQuery(650);
    const [copyBtn, setCopyBtn] = useState("Copy");

    const onCopy = (e) => {
        props.onCopy();
        setCopyBtn("Copied");
        setTimeout(() => setCopyBtn("Copy"), 2000);
    };

    return (
        <Navbar variant="static" isCompact isBordered disableBlur>
            <Navbar.Brand>
                <Image
          src={`${process.env.PUBLIC_URL}logo512.png`}
          alt="Default Image"
          width={"2.2rem"}
        />
                <Text h2 color="inherit">
                    PyPlay
                </Text>
            </Navbar.Brand>
            <Navbar.Content gap={8}>
                <Navbar.Item>
                    <Button
                        auto
                        color="success"
                        size="sm"
                        icon={<IoSave />}
                        onPress={props.onSave}
                    >
                        {!isMd && "Save"}
                    </Button>
                </Navbar.Item>
                <Navbar.Item>
                    <Button
                        auto
                        color="secondary"
                        size="sm"
                        icon={<IoCopy />}
                        onPress={onCopy}
                    >
                        {!isMd && copyBtn}
                    </Button>
                </Navbar.Item>
                <Navbar.Item>
                    <Button
                        auto
                        color="primary"
                        size="sm"
                        icon={<BsFillCaretRightFill />}
                        onPress={props.onRun}
                    >
                        {!isMd && props.runText}
                    </Button>
                </Navbar.Item>
            </Navbar.Content>
        </Navbar>
    );
}

export default NavBar;
