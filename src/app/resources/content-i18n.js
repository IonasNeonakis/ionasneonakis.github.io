import {addBasePath} from "@/app/utils/imageUtils";

const createI18nContent = (t) => {
    const person = {
        firstName: "Ionas",
        lastName: "NEONAKIS",
        get name() {
            return `${this.firstName} ${this.lastName}`;
        },
        role:  t("person.role"),
        avatar: addBasePath("/images/avatar.jpg"),
        location: "Europe/Paris", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
        languages: ["French", "English", "Greek"], // optional: Leave the array empty if you don't want to display languages
    };

    const social = [
        // Links are automatically displayed.
        // Import new icons in /once-ui/icons.ts
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
        title: t("home.title", {name: person.name}),
        description: t("home.description", {role: person.role}),
        headline: <>{t("home.headline")}</>,
        subline: <>{t("home.subline")}</>
    }

    const about = {
        label: t("about.label"),
        title: t("about.title"),
        description: t("about.description", {name: person.name, role: person.role, location: person.location}),
        tableOfContent: {
            display: true,
            subItems: true
        },
        avatar: {
            display: true
        },
        calendar: {
            display: true,
            link: 'https://cal.com'
        },
        intro: {
            display: true,
            title: t("about.intro.title"),
            description: <>{t("about.intro.description")}</>
        },
        work: {
            display: true, // set to false to hide this section
            title: t("about.work.title"),
            experiences: [
                {
                    company: 'FLY',
                    timeframe: t("about.work.experiences.FLY.timeframe"),
                    role: t("about.work.experiences.FLY.role"),
                    achievements: t("about.work.experiences.FLY.achievements").split(";"),
                    images: [ // optional: leave the array empty if you don't want to display images
                        {
                            src: addBasePath('/images/projects/project-01/cover-01.jpg'),
                            alt: 'Once UI Project',
                            width: 16,
                            height: 9
                        }
                    ]
                },
                {
                    company: 'Creativ3',
                    timeframe: t("about.work.experiences.Creativ3.timeframe"),
                    role: t("about.work.experiences.Creativ3.role"),
                    achievements: t("about.work.experiences.Creativ3.achievements").split(";"),
                    images: [ ]
                }
            ]
        },
        studies: {
            display: true, // set to false to hide this section
            title: t("about.studies.title"),
            institutions: [
                {
                    name: t('about.studies.institutions.MastersUniversityOrleans.name'),
                    description: <>{t(`about.studies.institutions.MastersUniversityOrleans.description`)}</>,
                },
                {
                    name:  t('about.studies.institutions.LicenseUniversityOrleans.name'),
                    description: <>{t(`about.studies.institutions.LicenseUniversityOrleans.description`)}</>,
                },
            ]
        },
        technical: {
            display: true, // set to false to hide this section
            title: t("about.technical.title"),
            skills: [
                {
                    title: 'React',
                    description: <>{t("about.technical.skills.React.description")}</>,
                    images: [
                        {
                            src: addBasePath('/images/projects/project-01/cover-02.jpg'),
                            alt: 'Project image',
                            width: 16,
                            height: 9
                        },
                        {
                            src: addBasePath('/images/projects/project-01/cover-03.jpg'),
                            alt: 'Project image',
                            width: 16,
                            height: 9
                        },
                    ]
                },
                {
                    title: 'Spring Boot',
                    description: <>{t("about.technical.skills.Spring Boot.description")}</>, // "." not accepted in next-intl namespace
                    images: [
                        {
                            src: addBasePath('/images/projects/project-01/cover-04.jpg'),
                            alt: 'Project image',
                            width: 16,
                            height: 9
                        },
                    ]
                },
                {
                    title: 'DevOps',
                    description: <>{t("about.technical.skills.DevOps.description")}</>,
                    images: [
                        {
                            src: addBasePath('/images/projects/project-01/cover-04.jpg'),
                            alt: 'Project image',
                            width: 16,
                            height: 9
                        },
                    ]
                }

            ]
        }
    }

    const blog = {
        label: t("blog.label"),
        title: t("blog.title"),
        description: t("blog.description", {name: person.name})
        // Create new blog posts by adding a new .mdx file to app/blog/posts
        // All posts will be listed on the /blog route
    }

    const work = {
        label: t("work.label"),
        title: t("work.title"),
        description: t("work.description", {name: person.name})
        // Create new project pages by adding a new .mdx file to app/blog/posts
        // All projects will be listed on the /home and /work routes
    }

    return {
        person,
        social,
        home,
        about,
        blog,
        work,
    }
};

export { createI18nContent };