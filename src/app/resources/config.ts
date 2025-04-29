const baseURL: string = "https://ionasneonakis.github.io/"; // Set to your domain name or IP address TODO change with env variable

const routes: Record<string, boolean> = {
  "/": true,
  "/about": true,
  "/work": true,
  "/blog": true,
};

interface Style {
  theme: "dark" | "light";
  neutral: "sand" | "gray" | "slate";
  brand: "blue" | "indigo" | "violet" | "magenta" | "pink" | "red" | "orange" | "yellow" | "moss" | "green" | "emerald" | "aqua" | "cyan";
  accent: "blue" | "indigo" | "violet" | "magenta" | "pink" | "red" | "orange" | "yellow" | "moss" | "green" | "emerald" | "aqua" | "cyan";
  solid: "color" | "contrast";
  solidStyle: "flat" | "plastic";
  border: "rounded" | "playful" | "conservative";
  surface: "filled" | "translucent";
  transition: "all" | "micro" | "macro";
}

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
    opacity: number;
  };
  dots: {
    display: boolean;
    size: number;
    color: string;
    opacity: number;
  };
  lines: {
    display: boolean;
    color: string;
    opacity: number;
  };
  grid: {
    display: boolean;
    color: string;
    opacity: number;
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
    size: 2,
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

interface Display {
  location: boolean;
  time: boolean;
}

const display: Display = {
  location: false,
  time: false,
};

export { routes, effects, style, display, baseURL };
