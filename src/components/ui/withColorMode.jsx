import { useColorMode } from "@chakra-ui/react";

export default function withColorMode(Component) {
    return function WrappedComponent(props) {
        const { colorMode } = useColorMode();
        return <Component {...props} colorMode={colorMode} />;
    };
}
