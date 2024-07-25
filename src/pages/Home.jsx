import { useEffect, useState } from "react";
import { Box, Flex, Heading, Divider, useColorMode } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import FilterModal from "../components/Modals/FilterModal";
import SortMenu from "../components/SortMenu";
import HomeSearchbar from "../components/HomeSearchbar";
import AssessmentsContainer from "../components/AssessmentsContainer";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";

export default function Home() {
    const { colorMode } = useColorMode();
    const [sp, setSp] = useSearchParams();

    return (
        <>
            <Flex alignItems="center" gap="5" mb={12}>
                <Heading fontWeight={700} fontSize={"4xl"}>
                    Home
                </Heading>
                <Divider
                    w="full"
                    bg={colorMode === "light" ? "gray" : "gray.800"}
                    rounded="full"
                    h="2px"
                />
                <Flex alignItems="center" gap={1}>
                    <SortMenu />
                    <FilterModal />
                    <HomeSearchbar />
                </Flex>
            </Flex>

            <AssessmentsContainer
                endpoint={`/api/assessments?${sp.toString()}`}
            />
        </>
    );
}
