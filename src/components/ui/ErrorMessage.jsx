import { Text } from "@chakra-ui/react";

export default function ErrorMessage({ err }) {
    return <Text color="red.500">{err}</Text>;
}
