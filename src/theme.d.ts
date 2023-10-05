import { ThemeOptions } from "@mui/material/styles";

interface bg {
    main: string;
    secondary: string;
}

declare module "@mui/material/styles" {
    interface Theme {}

    interface ThemeOptions {}

    interface Palette {
        custom?: PaletteColor;
    }

    interface PaletteOptions {
        neutral?: PalleteColorOptions;
        custom?: PaletteColorOptions;
    }

    interface SimpleColorPaletteOptions {
        darker?: string;
    }

    interface PaletteColor {
        darker?: string;
    }

    interface SimpleColorPaletteOptions {
        bg?: bg;
    }

    interface PaletteColor {
        bg?: bg;
    }
}
