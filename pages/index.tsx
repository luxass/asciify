import { useEffect, useCallback } from "react";
import {
    Flex,
    Button,
    Text,
    Container,
    VStack,
    Center,
} from "@chakra-ui/react";
import { AiOutlineUpload } from "react-icons/ai";
import { useDropzone } from "react-dropzone";

export default function Home() {
    const onDrop = useCallback(async (acceptedFiles) => {
        const formData = new FormData();
        formData.append("file", acceptedFiles[0]);
        const response = await fetch("/api/convert", {
            method: "POST",
            body: formData,
        });
        const js = await response.json();
    }, []);

    const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
        noClick: true,
        noKeyboard: true,
        accept: "image/jpeg, image/png",
        multiple: false,
        onDrop,
    });

    const files = acceptedFiles.map((file: File, index: number) => (
        <li key={index}>
            {file.name} - {file.size} bytes
        </li>
    ));

    return (
        <Flex
            h="100vh"
            justifyContent="center"
            alignItems="center"
            bg="#3772FF"
        >
            <Container h="500px" bg="white" borderRadius="25px" p="0">
                <Center
                    h="100%"
                    w="100%"
                    borderRadius="25px 0 0 25px"
                    {...getRootProps({ className: "dropzone" })}
                >
                    <input {...getInputProps()} />
                    <VStack w="60%">
                        <AiOutlineUpload color="#3772FF" size="100px" />
                        <Text fontSize="25px">Drag and Drop file</Text>
                        <Text fontSize="25px">or</Text>
                        <Button
                            bg="#3772FF"
                            color="white"
                            w="70%"
                            onClick={open}
                            mt="25px"
                        >
                            Browse
                        </Button>
                    </VStack>
                </Center>
            </Container>
        </Flex>
    );
}
