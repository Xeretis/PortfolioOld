import {
    ActionIcon,
    Box,
    Button,
    Center,
    CopyButton,
    Group,
    Image,
    Kbd,
    List,
    MediaQuery,
    SimpleGrid,
    Text,
    Title,
    Tooltip,
    createStyles,
} from "@mantine/core";
import { Suspense, lazy, useEffect, useMemo, useRef } from "react";
import { useScrollIntoView, useViewportSize } from "@mantine/hooks";

import { FullScreenLoading } from "./components/fullScreenLoading";
import dayguesser from "./assets/dayguesser.png";
import docsharing from "./assets/docsharing.png";
import llgapp from "./assets/llgapp.png";
import next from "./assets/next.png";

const useStyles = createStyles((theme, { height }: { height: number }) => ({
    header: {
        position: "relative",
        width: "100%",
        height: height,
    },
    headerContent: {
        top: "50%",
        left: "50%",
        transform: "translate(20%, -50%)",
        position: "absolute",
        zIndex: 100,
        width: "40vw",

        [`@media (max-width: ${theme.breakpoints.lg + 60}px)`]: {
            transform: "translate(-50%, 0%)",
            width: "60vw",
        },
    },
    headerTitle: {
        fontSize: 76,

        [`@media (max-width: ${theme.breakpoints.lg + 60}px)`]: {
            fontSize: 48,
            textAlign: "center",
        },
        [`@media (max-width: ${theme.breakpoints.xs + 60}px)`]: {
            fontSize: 32,
        },
    },
    headerDescription: {
        fontSize: theme.fontSizes.md,
        [`@media (max-width: ${theme.breakpoints.lg + 60}px)`]: {
            textAlign: "center",
        },
        [`@media (max-width: ${theme.breakpoints.xs + 60}px)`]: {
            fontSize: theme.fontSizes.sm,
        },
    },
    content: {
        position: "relative",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        padding: theme.spacing.xl * 2,

        minHeight: height,
        width: "100%",

        [`@media (max-width: ${theme.breakpoints.xs + 60}px)`]: {
            padding: theme.spacing.sm,
        },

        paddingBottom: theme.spacing.xl * 4,
    },
    dottedBg: {
        position: "absolute",
        right: 50,
        bottom: 150,
        zIndex: -1,
        width: "60vw",
        height: "30vw",

        backgroundImage: `radial-gradient(${theme.colors.gray[8]} 3px, transparent 0)`,
        backgroundSize: "50px 50px",

        [`@media (max-width: ${theme.breakpoints.lg + 60}px)`]: {
            bottom: 100,
            width: "60vw",
            height: "52vw",
        },
        [`@media (max-width: ${theme.breakpoints.xs + 60}px)`]: {
            display: "none",
        },
    },
    contentCard: {
        width: "70%",

        [`@media (max-width: ${theme.breakpoints.lg + 60}px)`]: {
            width: "80%",
        },
        [`@media (max-width: ${theme.breakpoints.xs + 60}px)`]: {
            width: "90%",
        },
    },

    projectCard: {
        width: "80%",

        [`@media (max-width: ${theme.breakpoints.lg + 60}px)`]: {
            width: "85%",
        },
        [`@media (max-width: ${theme.breakpoints.xs + 60}px)`]: {
            width: "90%",
        },
    },
    projectContainer: {
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        padding: theme.spacing.md,
    },
    footer: {
        width: "80%",

        [`@media (max-width: ${theme.breakpoints.lg + 60}px)`]: {
            width: "85%",
        },
        [`@media (max-width: ${theme.breakpoints.xs + 60}px)`]: {
            width: "90%",
        },
    },
}));

const multiLazy = (moduleLoaderArray: any) => {
    const promises = Promise.all(moduleLoaderArray.map((loader: any) => loader()));
    return moduleLoaderArray.map((m: any, index: any) =>
        lazy(() => promises.then((results) => results[index]))
    );
};

const [LandingCanvas, ProjectLinks, ScrollAction] = multiLazy([
    () => import("./components/landingCanvas"),
    () => import("./components/projectLinks"),
    () => import("./components/scrollAction"),
]);

const App = () => {
    const { height, width } = useViewportSize();

    const { classes } = useStyles({ height });

    const { scrollIntoView: scrollToFirstSection, targetRef: firstSectionRef } = useScrollIntoView({
        duration: 500,
    });

    const {
        scrollIntoView: scrollToSecondSection,
        targetRef: secondSectionRef,
    } = useScrollIntoView({
        duration: 500,
    });

    const dottedBgRef = useRef(null);

    useEffect(() => {
        document.addEventListener("scroll", (e) => {
            if (dottedBgRef.current) {
                //@ts-ignore
                dottedBgRef.current.style.transform = `translate(${window.scrollX / 15}px, ${
                    window.scrollY / 15
                }px)`;
            }
        });
    }, [dottedBgRef]);

    const age = useMemo(() => {
        var diff_ms = Date.now() - new Date(2006, 4, 13).getTime();
        var age_dt = new Date(diff_ms);

        return Math.abs(age_dt.getUTCFullYear() - 1970);
    }, []);

    return (
        <Suspense fallback={<FullScreenLoading />}>
            <Box className={classes.header}>
                <LandingCanvas />
                <Box className={classes.headerContent}>
                    <Text className={classes.headerTitle} weight="bold">
                        Hi, I&apos;m{" "}
                        <Text
                            component="span"
                            variant="gradient"
                            gradient={{ from: "cyan", to: "blue", deg: 45 }}
                            inherit={true}
                        >
                            Xeretis
                        </Text>
                    </Text>
                    <Text className={classes.headerDescription}>
                        I'm a Hungarian high school student doing web development and sometimes
                        other kinds of software development as well.
                    </Text>
                </Box>
                <ScrollAction callback={scrollToFirstSection} />
            </Box>
            <Box ref={firstSectionRef as any} className={classes.content}>
                <Box className={classes.contentCard}>
                    <Title order={1} mb="xl">
                        About Me
                    </Title>
                    <Text align="justify">
                        I'm a student of the Lovassy László High School in Veszprém, Hungary. I'm
                        currently {age} years old and I started programming at about the age of 11
                        with the C language. Right now I'm most interested in{" "}
                        <Kbd>full-stack web development</Kbd>, but I have some experience with C++
                        console application and library development and Java development as well. I
                        also teach programming to primary school students at <Kbd>Logiscool</Kbd>.
                    </Text>
                    <Title order={3} my="xl">
                        Technologies I Use
                    </Title>
                    <List>
                        <List.Item>React</List.Item>
                        <List.Item>React Native</List.Item>
                        <List.Item>Typescript</List.Item>
                        <List.Item>Java</List.Item>
                        <List.Item>C++</List.Item>
                        <List.Item>Laravel</List.Item>
                        <List.Item>Express.js</List.Item>
                    </List>
                    <Title order={3} my="xl">
                        Tools I Use
                    </Title>
                    <List>
                        <List.Item>Visual Studio Code</List.Item>
                        <List.Item>Firefox Developer Edition</List.Item>
                        <List.Item>IntelliJ Idea Ultimate</List.Item>
                        <List.Item>CLion</List.Item>
                        <List.Item>Docker</List.Item>
                        <List.Item>Postman</List.Item>
                        <List.Item>Git</List.Item>
                    </List>
                </Box>
                <Box className={classes.dottedBg} ref={dottedBgRef} />
                <MediaQuery smallerThan="lg" styles={{ display: "none" }}>
                    <Box>
                        <ScrollAction callback={scrollToSecondSection} />
                    </Box>
                </MediaQuery>
            </Box>
            <Box ref={secondSectionRef as any} className={classes.content}>
                <Box className={classes.projectCard}>
                    <Title align="center" order={1} mb="xl">
                        My Projects
                    </Title>
                    <SimpleGrid
                        cols={2}
                        spacing="xl"
                        breakpoints={[{ maxWidth: 1200, cols: 1, spacing: "sm" }]}
                    >
                        <Box className={classes.projectContainer}>
                            <Box pb="xl">
                                <Title order={3} mb="xl">
                                    LovassyApp
                                </Title>
                                <Text align="justify">
                                    A full-stack apllication with a React front-end, React Native
                                    front-end, Laravel back-end and a C# desktop application. The
                                    purpose of this project is to digitalize a grade based reward
                                    system in my school and it includes a shop as well, where
                                    students can spend currency earned for grades. I'm currently
                                    working on it with one of my friends, and I'm responsible for
                                    the front-ends. The project is closed source at the moment.
                                </Text>
                            </Box>
                            <ProjectLinks />
                        </Box>
                        <Image radius="md" src={llgapp} withPlaceholder />
                        <Box className={classes.projectContainer}>
                            <Box pb="xl">
                                <Title order={3} mb="xl">
                                    DayGuesser
                                </Title>
                                <Text align="justify">
                                    A simple web application I made for practicing the Doomsday
                                    algorithm (guessing the day of the week from a date). It's made
                                    with React, Typescript and Mantine, and it's open source.
                                </Text>
                            </Box>
                            <ProjectLinks
                                website="https://day-guesser.vercel.app/"
                                github="https://github.com/Xeretis/DayGuesser"
                            />
                        </Box>
                        <Image radius="md" src={dayguesser} withPlaceholder />
                        <Box className={classes.projectContainer}>
                            <Box pb="xl">
                                <Title order={3} mb="xl">
                                    Docsharing
                                </Title>
                                <Text align="justify">
                                    A monolithic Laravel application made for sharing documents and
                                    posts with a group of users in a space. The features include
                                    authentication with Laravel Fortify, managing spaces, posts,
                                    invites (either pernament or temporary) and joining spaces with
                                    codes, and it's open source.
                                </Text>
                            </Box>
                            <ProjectLinks github="https://github.com/Xeretis/Docsharing" />
                        </Box>
                        <Image radius="md" src={docsharing} withPlaceholder />
                        <Box className={classes.projectContainer}>
                            <Box pb="xl">
                                <Title order={3} mb="xl">
                                    NextClient
                                </Title>
                                <Text align="justify">
                                    A minecraft utility mod written in Java aimed at anarchy
                                    servers. I wrote this during carantine in 2020 and it includes
                                    some code from other open source utility mods, but most of it is
                                    written by me. The most notable features are predictive crystal
                                    aura, macro system, custom client base and nice click gui made
                                    with PanelStudio, and it's open source.
                                </Text>
                            </Box>
                            <ProjectLinks github="https://github.com/Xeretis/NextClient/tree/rewrite" />
                        </Box>
                        <Image radius="md" src={next} withPlaceholder />
                    </SimpleGrid>
                </Box>
                <Box className={classes.projectCard}>
                    <Box pt="xl">
                        <Title align="center" order={1} my="lg">
                            Other Notable Projects
                        </Title>
                        <SimpleGrid
                            cols={2}
                            spacing="xl"
                            breakpoints={[{ maxWidth: 1200, cols: 1, spacing: "sm" }]}
                        >
                            <Box className={classes.projectContainer}>
                                <Box pb="xl">
                                    <Title order={3} mb="xl">
                                        ExpressBase
                                    </Title>
                                    <Text align="justify">
                                        A project template for full-stack applications with an
                                        Express.js back-end and React frontend in a monorepo, all
                                        using typescript. It includes a security focused custom auth
                                        system, request validation, a job queue system with Redis,
                                        Prisma ORM, emails with Nodemailer and front-end
                                        implementations for the auth system with RTK Query and
                                        Mantine, and it's all open source. The full feature set is
                                        documented in the repo readme.
                                    </Text>
                                </Box>
                                <ProjectLinks github="https://github.com/Xeretis/ExpressBase" />
                            </Box>
                            <Box className={classes.projectContainer}>
                                <Box pb="xl">
                                    <Title order={3} mb="xl">
                                        CliLib
                                    </Title>
                                    <Text align="justify">
                                        An easy to use, yet powerful header only cli parser for C++.
                                        It was originally made for my own future projects, but it's
                                        been open source since the beginning. The full feature set,
                                        documentation and examples are available in the repo.
                                    </Text>
                                </Box>
                                <ProjectLinks github="https://github.com/Xeretis/CliLib" />
                            </Box>
                        </SimpleGrid>
                        <Center mt="md">
                            <Button
                                component="a"
                                href="https://github.com/Xeretis"
                                target="_blank"
                                rel="noopener noreferrer"
                                radius="md"
                                variant="gradient"
                                gradient={{ from: "cyan", to: "blue", deg: 45 }}
                            >
                                See all my public projects on Github
                            </Button>
                        </Center>
                    </Box>
                </Box>
            </Box>
            <Center>
                <Box className={classes.footer}>
                    <Group align="center" position={width > 520 ? "apart" : "center"} p="xl">
                        <Text align="center">
                            Designed and made by{" "}
                            <Text
                                component="span"
                                inherit
                                variant="gradient"
                                gradient={{ from: "cyan", to: "blue", deg: 45 }}
                            >
                                Xeretis
                            </Text>
                        </Text>
                        <Group>
                            <ActionIcon
                                component="a"
                                href="mailto:ocskon@gmail.com"
                                variant="transparent"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    stroke-width="2"
                                    stroke="currentColor"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                                    <polyline points="3 7 12 13 21 7"></polyline>
                                </svg>
                            </ActionIcon>
                            <CopyButton value="Lorem ipsum#7120" timeout={2000}>
                                {({ copied, copy }) => (
                                    <Tooltip
                                        label={copied ? "Copied" : 'Copy "Lorem ipsum#7120"'}
                                        withArrow
                                        position="right"
                                    >
                                        <ActionIcon
                                            onClick={copy}
                                            variant="transparent"
                                            aria-label="Copy discord tag"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                stroke-width="2"
                                                stroke="currentColor"
                                                fill="none"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            >
                                                <path
                                                    stroke="none"
                                                    d="M0 0h24v24H0z"
                                                    fill="none"
                                                ></path>
                                                <circle cx="9" cy="12" r="1"></circle>
                                                <circle cx="15" cy="12" r="1"></circle>
                                                <path d="M7.5 7.5c3.5 -1 5.5 -1 9 0"></path>
                                                <path d="M7 16.5c3.5 1 6.5 1 10 0"></path>
                                                <path d="M15.5 17c0 1 1.5 3 2 3c1.5 0 2.833 -1.667 3.5 -3c.667 -1.667 .5 -5.833 -1.5 -11.5c-1.457 -1.015 -3 -1.34 -4.5 -1.5l-1 2.5"></path>
                                                <path d="M8.5 17c0 1 -1.356 3 -1.832 3c-1.429 0 -2.698 -1.667 -3.333 -3c-.635 -1.667 -.476 -5.833 1.428 -11.5c1.388 -1.015 2.782 -1.34 4.237 -1.5l1 2.5"></path>
                                            </svg>
                                        </ActionIcon>
                                    </Tooltip>
                                )}
                            </CopyButton>
                        </Group>
                    </Group>
                </Box>
            </Center>
        </Suspense>
    );
};

export default App;
