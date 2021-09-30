import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
    const theme = {
        styles: {
            global: {
                "*": {
                    margin: 0,
                    padding: 0,
                    boxSizing: "border-box"
                },
            },
        },
    };
    return (
        <ChakraProvider theme={extendTheme(theme)}>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}
export default MyApp;
