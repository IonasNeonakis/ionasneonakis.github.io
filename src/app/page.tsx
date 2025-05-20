import { Redirect } from "@/app/Redirect";
import { baseURL } from "@/app/resources";
import { addBasePath } from "@/app/utils/imageUtils";

export async function generateMetadata() {
  const ogImage = addBasePath("/images/avatar-og.webp");

  return {
    title: "Ionas' Portfolio",
    description: "Portfolio website showcasing my work as a software engineer.",
    openGraph: {
      title: `Ionas' Portfolio`,
      description: "Portfolio website showcasing my work.",
      url: `https://${baseURL}`,
      siteName: `Ionas' Portfolio`,
      locale: "en_US",
      images: [
        {
          url: ogImage,
          alt: "Ionas NEONAKIS",
        },
      ],
      type: "website",
    },
  };
}

export default function Page() {
  return <Redirect />;
}
