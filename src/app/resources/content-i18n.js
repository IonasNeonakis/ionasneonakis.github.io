import { addBasePath } from "@/app/utils/imageUtils";

const createI18nContent = (t) => {
    const person = {
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

    const social = [
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

    const home = {
        label: t("home.label"),
        title: t("home.title", { name: person.name }),
        description: t("home.description", { role: person.role }),
        headline: <>{t("home.headline")}</>,
        subline: <>{t("home.subline")}</>,
    };

    const about = {
        label: t("about.label"),
        title: t("about.title"),
        description: t("about.description", { name: person.name, role: person.role, location: person.location }),
        tableOfContent: { display: true, subItems: true },
        avatar: { display: true },
        calendar: { display: false },
        intro: {
            display: true,
            title: t("about.intro.title"),
            description: <>{t("about.intro.description")}</>,
        },
        work: {
            display: true,
            title: t("about.work.title"),
            experiences: [
                {
                    company: "Leader du Luxe",
                    timeframe: t("about.work.experiences.Leader du Luxe.timeframe"),
                    role: t("about.work.experiences.Leader du Luxe.role"),
                    achievements: t("about.work.experiences.Leader du Luxe.achievements").split(";"),
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
                    company: "Takima",
                    timeframe: t("about.work.experiences.Takima.timeframe"),
                    role: t("about.work.experiences.Takima.role"),
                    achievements: t("about.work.experiences.Takima.achievements").split(";"),
                    images: [],
                },
                {
                    company: "Atos",
                    timeframe: t("about.work.experiences.Atos.timeframe"),
                    role: t("about.work.experiences.Atos.role"),
                    achievements: t("about.work.experiences.Atos.achievements").split(";"),
                    images: [],
                }
            ],
        },
        studies: {
            display: true,
            title: t("about.studies.title"),
            institutions: [
                {
                    name: "Université d'Orléans",
                    description: <>{t("about.studies.institutions.Université d'Orléans.description")}</>,
                },
                {
                    name: "Université d'Orléans (Licence)",
                    description: <>{t("about.studies.institutions.Université d'Orléans (Licence).description")}</>,
                },
            ],
        },
        technical: {
            display: true,
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
                }
            ],
        },
    };

    const blog = {
        label: t("blog.label"),
        title: t("blog.title"),
        description: t("blog.description", { name: person.name }),
    };

    const work = {
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