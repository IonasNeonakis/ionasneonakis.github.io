import { addBasePath } from "@/app/utils/imageUtils";
import type { JSX } from "react";

export interface Person {
  firstName: string;
  lastName: string;
  name: string;
  role: string;
  avatar: string;
  location: string;
  currentCompany: Organization;
  languages: string[];
}

interface SocialLink {
  name: string;
  icon: string;
  link: string;
}

interface Home {
  label: string;
  title: string;
  description: string;
  headline: JSX.Element;
  subline: JSX.Element;
}

interface Organization {
  name: string;
  image: Image;
}

interface Experience {
  company: Organization;
  timeframe: string;
  role: string;
  achievements: string[];
}

interface Image {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface StudiesInstitution {
  organization: Organization;
  timeframe: string;
  role: string;
  studiedFields: string[];
}

export interface Certification {
  name: string;
  certificationId: string;
  organization: Organization;
  link: string;
  date: Date;
}

interface About {
  label: string;
  title: string;
  description: string;
  intro: {
    title: string;
    description: JSX.Element;
  };
  work: {
    title: string;
    experiences: Experience[];
  };
  studies: {
    title: string;
    institutions: StudiesInstitution[];
  };
  certifications: {
    title: string;
    certifications: Certification[];
  };
}

interface Blog {
  label: string;
  title: string;
  description: string;
}

interface Work {
  label: string;
  title: string;
  description: string;
}

interface I18nContent {
  person: Person;
  social: SocialLink[];
  home: Home;
  about: About;
  blog: Blog;
  work: Work;
}

const createI18nContent = (t: (key: string, options?: unknown) => string): I18nContent => {
  const person: Person = {
    firstName: "Ionas",
    lastName: "NEONAKIS",
    get name() {
      return `${this.firstName} ${this.lastName}`;
    },
    role: t("person.role"),
    avatar: addBasePath("/images/avatar.webp"),
    currentCompany: {
      name: "Takima",
      image: {
        src: addBasePath("/images/companies/takima.webp"),
        alt: "Takima Logo",
        height: 30,
        width: 30,
      },
    },
    location: "Europe/Paris",
    languages: [t("about.french"), t("about.english")],
  };

  const social: SocialLink[] = [
    {
      name: "LinkedIn",
      icon: "linkedin",
      link: "https://www.linkedin.com/in/ionas-neonakis/",
    },
    {
      name: "GitHub",
      icon: "github",
      link: "https://github.com/IonasNeonakis",
    },
  ];

  const home: Home = {
    label: t("home.label"),
    title: t("home.title", { name: person.name }),
    description: t("home.description", { role: person.role }),
    headline: <>{t("home.headline")}</>,
    subline: <>{t("home.subline")}</>,
  };

  const about: About = {
    label: t("about.label"),
    title: t("about.title"),
    description: t("about.description", {
      name: person.name,
      role: person.role,
      location: person.location,
    }),
    intro: {
      title: t("about.intro.title"),
      description: <>{t("about.intro.description")}</>,
    },
    work: {
      title: t("about.work.title"),
      experiences: [
        {
          company: {
            name: t("about.work.experiences.LuxuryLeader.companyName"),
            image: {
              src: "/images/companies/diamond.webp",
              alt: t("about.work.experiences.LuxuryLeader.companyAlt"),
              height: 30,
              width: 30,
            },
          },
          timeframe: t("about.work.experiences.LuxuryLeader.timeframe"),
          role: t("about.work.experiences.LuxuryLeader.role"),
          achievements: t("about.work.experiences.LuxuryLeader.achievements").split(";"),
        },
        {
          company: {
            name: t("about.work.experiences.TakimaRH.companyName"),
            image: {
              src: "/images/companies/takima.webp",
              alt: t("about.work.experiences.TakimaRH.companyAlt"),
              height: 30,
              width: 30,
            },
          },
          timeframe: t("about.work.experiences.TakimaRH.timeframe"),
          role: t("about.work.experiences.TakimaRH.role"),
          achievements: t("about.work.experiences.TakimaRH.achievements").split(";"),
        },
        {
          company: {
            name: t("about.work.experiences.TakimaFormation.companyName"),
            image: {
              src: "/images/companies/takima.webp",
              alt: t("about.work.experiences.TakimaFormation.companyAlt"),
              height: 30,
              width: 30,
            },
          },
          timeframe: t("about.work.experiences.TakimaFormation.timeframe"),
          role: t("about.work.experiences.TakimaFormation.role"),
          achievements: t("about.work.experiences.TakimaFormation.achievements").split(";"),
        },
        {
          company: {
            name: t("about.work.experiences.Atos.companyName"),
            image: {
              src: "/images/companies/atos.webp",
              alt: t("about.work.experiences.Atos.companyAlt"),
              height: 15,
              width: 46,
            },
          },
          timeframe: t("about.work.experiences.Atos.timeframe"),
          role: t("about.work.experiences.Atos.role"),
          achievements: t("about.work.experiences.Atos.achievements").split(";"),
        },
      ],
    },
    studies: {
      title: t("about.studies.title"),
      institutions: [
        {
          organization: {
            name: t("about.studies.institutions.MastersUniversityOrleans.name"),
            image: {
              src: addBasePath("/images/companies/univ-orleans.webp"),
              alt: "University of Orléans Logo",
              height: 30,
              width: 42,
            },
          },
          role: t("about.studies.institutions.MastersUniversityOrleans.description"),
          studiedFields: t(
            "about.studies.institutions.MastersUniversityOrleans.studiedFields",
          ).split(";"),
          timeframe: t("about.studies.institutions.MastersUniversityOrleans.timeframe"),
        },
        {
          organization: {
            name: t("about.studies.institutions.LicenseUniversityOrleans.name"),
            image: {
              src: addBasePath("/images/companies/univ-orleans.webp"),
              alt: "University of Orléans Logo",
              height: 30,
              width: 42,
            },
          },
          role: t("about.studies.institutions.LicenseUniversityOrleans.description"),
          studiedFields: t(
            "about.studies.institutions.LicenseUniversityOrleans.studiedFields",
          ).split(";"),
          timeframe: t("about.studies.institutions.LicenseUniversityOrleans.timeframe"),
        },
      ],
    },
    certifications: {
      title: t("about.certifications.title"),
      certifications: [
        {
          name: "Kubernetes & DevOps",
          link: "https://takicert.takima.io/certificates/18121901-5f5a-43a8-8132-924dfb0a0b81",
          organization: {
            name: "Takima",
            image: {
              src: addBasePath("/images/companies/takima.webp"),
              alt: "Takima Logo",
              height: 30,
              width: 30,
            },
          },
          date: new Date("2024-09-01"),
          certificationId: "18121901-5f5a-43a8-8132-924dfb0a0b81",
        },
        {
          name: "Oracle Certified Professional (OCP) : Java SE 17 Developer",
          certificationId: "17820121OCPJSE17",
          link: addBasePath("/images/certifications/OCP17.pdf"),
          organization: {
            name: "Oracle",
            image: {
              src: addBasePath("/images/companies/oracle.webp"),
              alt: "Oracle Logo",
              height: 30,
              width: 54,
            },
          },
          date: new Date("2023-07-01"),
        },
        {
          name: "Master 3 - Professional Java & Web Full Stack Developer",
          link: "https://takicert.takima.io/certificates/e1e4a4e5-e6c5-4934-a437-f61b0dc95d4a",
          organization: {
            name: "Takima",
            image: {
              src: addBasePath("/images/companies/takima.webp"),
              alt: "Takima Logo",
              height: 30,
              width: 30,
            },
          },
          date: new Date("2022-09-01"),
          certificationId: "e1e4a4e5-e6c5-4934-a437-f61b0dc95d4a",
        },
        {
          name: t("about.certifications.master"),
          link: addBasePath("/images/certifications/MASTER.pdf"),
          organization: {
            name: t("about.certifications.university"),
            image: {
              src: addBasePath("/images/companies/univ-orleans.webp"),
              alt: "University of Orléans Logo",
              height: 30,
              width: 42,
            },
          },
          certificationId: "16646728",
          date: new Date("2022-09-01"),
        },
        {
          name: t("about.certifications.bachelor"),
          link: addBasePath("/images/certifications/LICENSE.pdf"),
          organization: {
            name: t("about.certifications.university"),
            image: {
              src: addBasePath("/images/companies/univ-orleans.webp"),
              alt: "University of Orléans Logo",
              height: 30,
              width: 42,
            },
          },
          certificationId: "14318674",
          date: new Date("2020-09-01"),
        },
        {
          name: t("about.certifications.bac"),
          link: addBasePath("/images/certifications/BAC.pdf"),
          organization: {
            name: t("about.certifications.highschool"),
            image: {
              src: addBasePath("/images/companies/benjam.webp"),
              alt: "Benjamin Franklin high school Logo",
              height: 30,
              width: 54,
            },
          },
          certificationId: "170322572441",
          date: new Date("2017-10-01"),
        },
      ],
    },
  };

  const blog: Blog = {
    label: t("blog.label"),
    title: t("blog.title"),
    description: t("blog.description", { name: person.name }),
  };

  const work: Work = {
    label: t("work.label"),
    title: t("work.title"),
    description: t("work.description", { name: person.name }),
  };

  return {
    person,
    social,
    home,
    about,
    blog,
    work,
  };
};

export { createI18nContent };
