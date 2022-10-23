import { MeshDistortMaterial, Sphere } from "@react-three/drei";

import { useMantineTheme } from "@mantine/core";
import { useMemo } from "react";
import { useViewportSize } from "@mantine/hooks";

export const AnimatedSphere = (): JSX.Element => {
    const theme = useMantineTheme();
    const { width } = useViewportSize();
    const scale = useMemo(() => {
        if (width > theme.breakpoints.sm) return 2;
        return 1.4;
    }, [width, theme]);

    return (
        //@ts-ignore
        <Sphere visible={true} args={[1.2, 200, 200]} scale={scale}>
            <MeshDistortMaterial
                color={theme.colors.cyan[7]}
                attach="material"
                distort={0.35}
                roughness={5}
                speed={1.2}
                poleAmount={0.5}
            />
        </Sphere>
    );
};
