import type { MantineThemeOverride } from '@mantine/core';

export const CustomTheme: MantineThemeOverride = {
    fontFamily: 'Open Sans, sans-serif',
    defaultRadius: 5,
    components: {
        Text: {
            defaultProps: {
                size: 'sm',
            },
        },
        Container: {
            defaultProps: {
                mx: "auto",
                // maw: 700
            },
        },
        Paper: {
            defaultProps: {
                p: "md",
                mt: "xl",
            },
        }
    //     Button: {
    //         defaultProps: {
    //             radius: 'xl',
    //         },
    //         styles: {
    //             root: {
    //                 fontWeight: 600,
    //             },
    //         },
    //         vars: {
    //             pill: (theme) => ({
    //                 root: {
    //                     borderRadius: 9999,
    //                     backgroundColor: theme.colors.indigo[6],
    //                     color: 'white',
    //                 },
    //             }),
    //         },
    //     },
    },
};
