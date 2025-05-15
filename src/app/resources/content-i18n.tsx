import { addBasePath } from "@/app/utils/imageUtils";
import { JSX } from "react";

interface Person {
    firstName: string;
    lastName: string;
    name: string;
    role: string;
    avatar: string;
    location: string;
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

interface Company {
    name: string;
    image: Image;
}

interface Experience {
    company: Company;
    timeframe: string;
    role: string;
    achievements: string[];
    images: Image[];
}

interface Image {
    src: string;
    alt: string;
    width: number;
    height: number;
}

interface StudiesInstitution {
    name: string;
    description: JSX.Element;
}

interface Skill {
    title: string;
    description: JSX.Element;
    images: Image[];
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
    technical: {
        title: string;
        skills: Skill[];
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

const createI18nContent = (t: (key: string, options?: any) => string): I18nContent => {
    const person: Person = {
        firstName: "Ionas",
        lastName: "NEONAKIS",
        get name() {
            return `${this.firstName} ${this.lastName}`;
        },
        role: t("person.role"),
        avatar: addBasePath("/images/avatar.jpg"),
        location: "Europe/Paris",
        languages: ["Français", "Anglais", "Grec"],
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
        {
            name: "Email",
            icon: "email",
            link: "mailto:ionas.neonakis@gmail.com",
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
                            src: "/images/companies/diamond.png",
                            alt: t("about.work.experiences.LuxuryLeader.companyAlt"),
                            height: 30,
                            width: 30,
                        }
                    },
                    timeframe: t("about.work.experiences.LuxuryLeader.timeframe"),
                    role: t("about.work.experiences.LuxuryLeader.role"),
                    achievements: t("about.work.experiences.LuxuryLeader.achievements").split(";"),
                    images: [
                        {
                            src: addBasePath("/images/projects/project-01/cover-01.jpg"),
                            alt: "Projet Leader du Luxe",
                            width: 16,
                            height: 9,
                        },
                    ],
                },
                {
                    company: {
                        name: t("about.work.experiences.TakimaRH.companyName"),
                        image: {
                            src: "/images/companies/takima.png",
                            alt: t("about.work.experiences.TakimaRH.companyAlt"),
                            height: 30,
                            width: 30,
                        }
                    },
                    timeframe: t("about.work.experiences.TakimaRH.timeframe"),
                    role: t("about.work.experiences.TakimaRH.role"),
                    achievements: t("about.work.experiences.TakimaRH.achievements").split(";"),
                    images: [],
                },
                {
                    company: {
                        name: t("about.work.experiences.TakimaFormation.companyName"),
                        image: {
                            src: "/images/companies/takima.png",
                            alt: t("about.work.experiences.TakimaFormation.companyAlt"),
                            height: 30,
                            width: 30,
                        }
                    },
                    timeframe: t("about.work.experiences.TakimaFormation.timeframe"),
                    role: t("about.work.experiences.TakimaFormation.role"),
                    achievements: t("about.work.experiences.TakimaFormation.achievements").split(";"),
                    images: [],
                },
                {
                    company: {
                        name: t("about.work.experiences.Atos.companyName"),
                        image: {
                            src: "/images/companies/atos.png",
                            alt: t("about.work.experiences.Atos.companyAlt"),
                            height: 15,
                            width: 46,
                        }
                    },
                    timeframe: t("about.work.experiences.Atos.timeframe"),
                    role: t("about.work.experiences.Atos.role"),
                    achievements: t("about.work.experiences.Atos.achievements").split(";"),
                    images: [],
                },
            ],
        },
        studies: {
            title: t("about.studies.title"),
            institutions: [
                {
                    name: t("about.studies.institutions.MastersUniversityOrleans.name"),
                    description: <>{t("about.studies.institutions.MastersUniversityOrleans.description")}</>,
                },
                {
                    name: t("about.studies.institutions.LicenseUniversityOrleans.name"),
                    description: <>{t("about.studies.institutions.LicenseUniversityOrleans.description")}</>,
                },
            ],
        },
        technical: {
            title: t("about.technical.title"),
            skills: [
                {
                    title: "SpringBoot",
                    description: <>{t("about.technical.skills.SpringBoot.description")}</>,
                    images: [
                        {
                            src: addBasePath("/images/projects/project-01/cover-02.jpg"),
                            alt: "Spring Boot",
                            width: 16,
                            height: 9,
                        },
                    ],
                },
                {
                    title: "React",
                    description: <>{t("about.technical.skills.React.description")}</>,
                    images: [
                        {
                            src: addBasePath("/images/projects/project-01/cover-03.jpg"),
                            alt: "React",
                            width: 16,
                            height: 9,
                        },
                    ],
                },
                {
                    title: "DevOps",
                    description: <>{t("about.technical.skills.DevOps.description")}</>,
                    images: [
                        {
                            src: addBasePath("/images/projects/project-01/cover-04.jpg"),
                            alt: "DevOps",
                            width: 16,
                            height: 9,
                        },
                    ],
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
