import { Raleway, Source_Code_Pro } from "next/font/google";

const heading = Raleway({
    variable: "--font-heading",
    subsets: ["latin"],
    display: "swap",
});

const body = Raleway({
    variable: "--font-body",
    subsets: ["latin"],
    display: "swap",
});

const label = Raleway({
    variable: "--font-label",
    subsets: ["latin"],
    display: "swap",
});

const code = Source_Code_Pro({
    variable: "--font-code",
    subsets: ["latin"],
    display: "swap",
});


const primary = Raleway({
    variable: "--font-primary",
    subsets: ["latin"],
    display: "swap",
});


const fonts = {
    primary: primary,
    heading: heading,
    body: body,
    label: label,
    code: code,
};

export { fonts, dataStyle };