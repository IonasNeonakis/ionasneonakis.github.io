import type { SpacingToken } from "@once-ui-system/core";
import {Raleway, Source_Code_Pro} from "next/font/google";

const baseURL: string = "ionasneonakis.github.io";

const routes: Record<string, boolean> = {
  "/": true,
  "/about": true,
  "/work": false,
  "/blog": false,
};

interface Style {
  theme: "dark" | "light";
  neutral: "sand" | "gray" | "slate";
  brand:
    | "blue"
    | "indigo"
    | "violet"
    | "magenta"
    | "pink"
    | "red"
    | "orange"
    | "yellow"
    | "moss"
    | "green"
    | "emerald"
    | "aqua"
    | "cyan";
  accent:
    | "blue"
    | "indigo"
    | "violet"
    | "magenta"
    | "pink"
    | "red"
    | "orange"
    | "yellow"
    | "moss"
    | "green"
    | "emerald"
    | "aqua"
    | "cyan";
  solid: "color" | "inverse" | "contrast";
  solidStyle: "flat" | "plastic";
  border: "rounded" | "playful" | "conservative";
  surface: "filled" | "translucent";
  transition: "all" | "micro" | "macro" | "none";
  scaling?: "90" | "95" | "100" | "105" | "110";
}

type Opacity = 0 | 50 | 100 | 20 | 10 | 30 | 40 | 60 | 70 | 80 | 90;

const style: Style = {
  theme: "dark",
  neutral: "gray",
  brand: "red",
  accent: "emerald",
  solid: "contrast",
  solidStyle: "flat",
  border: "playful",
  surface: "translucent",
  transition: "all",
};

interface Effects {
  mask: {
    cursor: boolean;
    x: number;
    y: number;
    radius: number;
  };
  gradient: {
    display: boolean;
    x: number;
    y: number;
    width: number;
    height: number;
    tilt: number;
    colorStart: string;
    colorEnd: string;
    opacity: Opacity;
  };
  dots: {
    display: boolean;
    size: SpacingToken;
    color: string;
    opacity: Opacity;
  };
  lines: {
    display: boolean;
    color: string;
    opacity: Opacity;
    thickness?: number;
    angle?: number;
  };
  grid: {
    display: boolean;
    color: string;
    opacity: Opacity;
    width?: SpacingToken;
    height?: SpacingToken;
  };
}
const effects: Effects = {
  mask: {
    cursor: true,
    x: 0,
    y: 0,
    radius: 75,
  },
  gradient: {
    display: true,
    x: 50,
    y: 0,
    width: 100,
    height: 100,
    tilt: 0,
    colorStart: "brand-background-strong",
    colorEnd: "static-transparent",
    opacity: 50,
  },
  dots: {
    display: true,
    size: "2",
    color: "brand-on-background-weak",
    opacity: 20,
  },
  lines: {
    display: false,
    color: "neutral-alpha-weak",
    opacity: 100,
  },
  grid: {
    display: false,
    color: "neutral-alpha-weak",
    opacity: 100,
  },
};

interface Mailchimp {
  action: string;
  effects: Effects;
}

const mailchimp: Mailchimp = {
  action: "https://formsubmit.co/ee4ec3a521c1bccf4855768076984cc9", // random-like string linked to my email address ionas.neonakis+portfolio@gmail.com
  effects: {
    mask: {
      cursor: true,
      x: 50,
      y: 0,
      radius: 75,
    },
    gradient: {
      display: true,
      opacity: 90,
      x: 50,
      y: 0,
      width: 50,
      height: 50,
      tilt: 0,
      colorStart: "accent-background-strong",
      colorEnd: "static-transparent",
    },
    dots: {
      display: true,
      opacity: 20,
      size: "2",
      color: "brand-on-background-weak",
    },
    grid: {
      display: false,
      opacity: 100,
      color: "neutral-alpha-medium",
    },
    lines: {
      display: false,
      opacity: 100,
      color: "neutral-alpha-medium",
      thickness: 1,
      angle: 90,
    },
  },
};

interface Display {
  location: boolean;
  time: boolean;
}

const display: Display = {
  location: false,
  time: false,
};



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

export { routes, effects, style, display, baseURL, mailchimp, fonts };
