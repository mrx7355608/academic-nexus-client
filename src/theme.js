import { extendTheme } from "@chakra-ui/react";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900.css";

const theme = extendTheme({
    config: {
        initialColorMode: "light",
    },
    fonts: {
        heading: "Poppins",
        body: "Poppins",
    },
});

export default theme;
