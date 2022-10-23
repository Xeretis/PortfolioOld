import { Center, Loader, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
    container: {
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        backgroundColor: theme.colors.dark[7],
    },
}));

export const FullScreenLoading = (): JSX.Element => {
    const { classes } = useStyles();

    return (
        <Center className={classes.container}>
            <Loader size="xl" variant="bars" />
        </Center>
    );
};
