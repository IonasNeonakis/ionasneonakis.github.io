import { Redirect } from "@/app/Redirect";
import { baseURL } from "@/app/resources";

export async function generateMetadata() {
  return {
    title: "Ionas' Portfolio",
    description: "Portfolio website showcasing my work as a software engineer.",
    openGraph: {
      title: `Ionas' Portfolio`,
      description: "Portfolio website showcasing my work.",
      url: `https://${baseURL}`,
      siteName: `Ionas' Portfolio`,
      locale: "en_US",
      type: "website",
    },
  };
}

export default function Page() {
  return <Redirect />;
}
