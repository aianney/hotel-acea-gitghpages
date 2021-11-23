import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import Store from "../store/store.component";
let Theme = createTheme({
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: "navigationButton" },
                    style: {
                        background: Store.env.colors.primary.main,
                        fontSize: Store.env.fonts.size.md,
                        fontWeight: Store.env.fonts.weight.bold,
                        textDecoration: "none",
                        color: "unset",
                        "&:hover": {
                            background: Store.env.colors.primary.dark,
                        }
                    }
                }
            ],
            styleOverrides: {
                root: {
                    borderRadius: "1rem"
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                roots: {
                    borderRadius: "1rem",
                }
            }
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    borderRadius: "4px"
                },
            }
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    fontSize: Store.env.fonts.size.xl,
                    borderRadius: "4px !important",
                },
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    borderRadius: "4px"
                }
                ,
            }
        },
    },
    overrides: {
        MuiSelect: {
            colorPrimary: {
                '&.Mui-disabled': {
                    color: 'white'
                }
            }
        }
    },
    palette: {
        background: {
            light: `#ffffff`,
            default: `#fafafa`,
        },
        primary: {
            ...Store.env.colors.primary
        },
        secondary: {
            light: `#d58048`,
            main: `#A95B27`,
            dark: `#6b3a19`
        },
        light: {
            light: `#fff`,
            main: `#fafafa`,
        }
    },
    shadows: [`none`],
    shape: {
        borderRadius: `1rem`,
        borderRadiusLg: `1.25rem`,
        borderRadiusSm: `.75rem`,
    },
    cardSelect: {
        backgroundColor: `#fafafa`,
        fontWeight: Store.env.fonts.weight.bold,
        fontSize: Store.env.fonts.size.md,
        padding: 0,
    },
    typography: {
        fontFamily: {
            sansSerif: Store.env.fonts.style.sansSerif,
            serif: Store.env.fonts.style.serif,
        },
        fontSizeXs: Store.env.fonts.size.xs,
        fontSizeSm: Store.env.fonts.size.sm,
        fontSize: Store.env.fonts.size.md,
        fontSizeLg: Store.env.fonts.size.lg,
        fontSizeXl: Store.env.fonts.size.xl,
        fontWeightLight: Store.env.fonts.weight.light,
        fontWeightRegular: Store.env.fonts.weight.regular,
        fontWeightMedium: Store.env.fonts.weight.medium,
        fontWeightBold: Store.env.fonts.weight.bold,
        fontWeightBlack: Store.env.fonts.weight.black,
        body1: {
            fontFamily: Store.env.fonts.style.sansSerif,
        },
        body2: {
            fontFamily: Store.env.fonts.style.sansSerif,
        },
        pageTitle: {
            fontFamily: Store.env.fonts.style.serif,
            fontSize: 28,
            fontWeight: Store.env.fonts.weight.black,
        },
        contactCardTitle: {
            color: `white`,
            fontSize: 22,
            fontWeight: Store.env.fonts.weight.bold,
            lineHeight: 1,
            textAlign: `right`,
        },
        contactCardSubtitle: {
            color: `white`,
            textAlign: `right`,
        },
        introTitle: {
            fontFamily: Store.env.fonts.style.serif,
            fontSize: Store.env.fonts.size.xl,
            fontWeight: Store.env.fonts.weight.bold,
        },
        introSubtitle: {
            fontFamily: Store.env.fonts.style.sansSerif,
            fontSize: Store.env.fonts.size.md,
            fontWeight: Store.env.fonts.weight.medium,
            lineHeight: 2,
            color: `#999`,
        },
        introChips: {
            fontFamily: Store.env.fonts.style.sansSerif,
            fontSize: Store.env.fonts.size.sm,
            fontWeight: Store.env.fonts.weight.medium,
            lineHeight: 2,
        },
        pageSubtitle: {
            fontFamily: Store.env.fonts.style.sansSerif,
            fontSize: Store.env.fonts.size.md,
            fontStyle: `italic`,
            color: `#999`,
        },
        title: {
            color: Store.env.colors.primary.main,
            fontWeight: Store.env.fonts.weight.bold,
            fontSize: Store.env.fonts.size.lg,
        },
        filterLabel: {
            color: Store.env.colors.primary.main,
            fontFamily: Store.env.fonts.style.sansSerif,
            fontWeight: Store.env.fonts.weight.bold,
        },
        filterText: {
            fontFamily: Store.env.fonts.style.sansSerif,
            fontsize: Store.env.fonts.size.md,
            fontWeight: Store.env.fonts.weight.bold,
            color: `black`,
            textTransform: `capitalize`,
            width: `100%`,
        },
        navBarLink: {
            textTransform: `capitalize`,
            fontWeight: Store.env.fonts.weight.bold,
        },
        priceBreakdownTitle: {
            fontFamily: Store.env.fonts.style.sansSerif,
            fontSize: Store.env.fonts.size.xs,
            fontWeight: Store.env.fonts.weight.bold,
        },
        priceBreakdownTotal: {
            fontFamily: Store.env.fonts.style.serif,
            fontWeight: Store.env.fonts.weight.black,
        },
        priceBreakdownTitlePrice: {
            fontFamily: Store.env.fonts.style.sansSerif,
            fontSize: Store.env.fonts.size.md,
            fontWeight: Store.env.fonts.weight.medium,
        },
        roomCardLabel: {
            fontFamily: Store.env.fonts.style.sansSerif,
            fontSize: Store.env.fonts.size.xs,
        },
        roomCardButton: {
            fontSize: Store.env.fonts.size.md,
        },
        roomCardPrice: {
            fontSize: Store.env.fonts.size.xl
        },
        roomTypeTitle: {
            fontFamily: Store.env.fonts.style.serif,
            fontSize: Store.env.fonts.size.lg,
            fontWeight: Store.env.fonts.weight.bold,
            color: Store.env.colors.primary.main,
        }
    },
});

Theme = responsiveFontSizes(Theme);

export default Theme;