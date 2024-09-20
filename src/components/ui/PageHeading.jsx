import { Flex, Heading, Divider } from "@chakra-ui/react";

export default function PageHeading({ title, colorMode }) {
    return (
        <Flex alignItems="center" gap="5" mb={12}>
            <Heading fontWeight={700} fontSize={"4xl"}>
                {title}
            </Heading>
            <Divider
                w="full"
                bg={colorMode === "light" ? "gray" : "gray.800"}
                rounded="full"
                h="2px"
                flex={1}
            />
        </Flex>
    );
}
