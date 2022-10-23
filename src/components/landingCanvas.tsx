import { AnimatedSphere } from "./animatedSphere";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
    canvas: {
        height: "100%",
        maxWidth: "50%",

        [`@media (max-width: ${theme.breakpoints.lg + 60}px)`]: {
            maxWidth: "100%",
            maxHeight: "55%",
        },
    },
}));

const LandingCanvas = (): JSX.Element => {
    const { classes } = useStyles();

    return (
        <Canvas className={classes.canvas}>
            <OrbitControls enableZoom={false} />
            {/* eslint-disable-next-line react/no-unknown-property */}
            <ambientLight intensity={0.5} />
            {/* eslint-disable-next-line react/no-unknown-property */}
            <directionalLight position={[-2, 5, 2]} intensity={1} />
            <Suspense fallback={null}>
                <AnimatedSphere />
            </Suspense>
        </Canvas>
    );
};

export default LandingCanvas;
