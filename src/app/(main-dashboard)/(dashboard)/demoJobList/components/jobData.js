export const documents = {
    docs: [
        {
            id: "dfacc5af-c464-47ab-92a4-af019499f608",
            job: {
                id: "bf200cb1-3ffa-4ef7-a071-3b81103ebebd",
                title: "Demo Job Title 1",
                description:
                    "Join our dynamic team as a Full-Stack Developer at [Org1], where you'll build and maintain scalable web applications. This role involves contributing to both front-end and back-end development, solving complex challenges, and collaborating with cross-functional teams. If you're passionate about clean code, modern technologies, and innovation, we'd love to hear from you!",
                skills: ["JavaScript", "React", "Node.js", "Express"],
                jobRole: "Full-Stack Engineer",
                degreeLevel: ["MSc.", "BSc."],
                fieldOfStudy: ["CSE", "EEE", "ETE", "MIE"],
                yearOfExperience: 2,
                location: "Mirpur, Dhaka, Bangladesh",
                requirements: [
                    "JavaScript (React, Node.js)",
                    "RESTful APIs integration.",
                    "SQL/NoSQL databases.",
                    "Version control (Git)",
                    "Problem-solving ability.",
                    "Communication and Teamwork.",
                ],
                responsibilities: [
                    "Develop and maintain secure, scalable web applications.",
                    "Write clean, maintainable code and conduct code reviews.",
                    "Collaborate with designers and product managers.",
                    "Troubleshoot and optimize application performance.",
                    "Stay updated with emerging technologies and mentor junior developers.",
                ],
                employeeBenefits: [
                    "Competitive salary with performance bonuses.",
                    "Comprehensive health insurance.",
                    "Flexible working hours and remote options.",
                    "Paid vacation and sick leave.",
                    "Professional development programs and training.",
                    "Team-building events and wellness initiatives.",
                ],
                salary: 40000,
                address: null,
                phone: "+8801405-444444",
                email: "demo-email@example.com",
                contactInfo: null,
                employeeType: "Full-Time",
                jobType: "Physical",
                steps:["Screening Test", "Aptitude Test", "Technical Test", "Interview"],

                organization: {
                    orgName: "Org1",
                    img: {
                        sizes: {
                            thumbnail: {
                                url: `${process.env.NEXT_PUBLIC_API_URL}/media/images/hh_logo.png`,
                            },
                        },
                    },
                },
            },
            applicantCount: 40,
            deadline: "2024-11-22",
            published: "2024-11-12",
        },
        {
            id: "dfacc5af-c464-47ab-92a4-af019499f608",
            job: {
                id: "bf200cb1-3ffa-4ef7-a071-3b81103ebebd",
                title: "Demo Job Title 2",
                description: "Short and Brief description of the job",

                skills: ["JavaScript", "React", "Node.js", "Express"],
                jobRole: "Frontend Engineer",
                degreeLevel: ["Phd", "MSc."],
                fieldOfStudy: ["CSE", "EEE", "ETE", "MIE"],
                yearOfExperience: 6,
                location: null,
                requirements: null,
                employeeBenefits: null,
                salary: null,
                address: null,
                salary: 6000,
                phone: "+8801405-444444",
                email: "demo-email@example.com",
                contactInfo: null,
                published: "2024-12-12",
                employeeType: "Full-Time",
                jobType: "Remote",

                organization: {
                    orgName: "Org2",
                    img: {
                        sizes: {
                            thumbnail: {
                                url: `${process.env.NEXT_PUBLIC_API_URL}/media/images/hh_logo.png`,
                            },
                        },
                    },
                },
            },
            applicantCount: 80,
            deadline: "2024-12-22",
            published: "2024-11-26",
        },
        {
            id: "dfacc5af-c464-47ab-92a4-af019499f608",
            job: {
                id: "bf200cb1-3ffa-4ef7-a071-3b81103ebebd",
                title: "Demo Job Title 3",
                description: "Short and Brief description of the job",
                skills: ["JavaScript", "React", "Node.js", "Express"],
                jobRole: "Backend Engineer",
                degreeLevel: ["MSc.", "BSc."],
                fieldOfStudy: ["CSE", "EEE", "ETE", "MIE"],
                yearOfExperience: 3,
                location: null,
                salary: 90000,
                requirements: null,
                employeeBenefits: null,
                salary: null,
                address: null,
                phone: "+8801405-444444",
                email: "demo-email@example.com",
                contactInfo: null,
                employeeType: "Part-Time",
                jobType: "Hybrid",

                organization: {
                    orgName: "Org3",
                    img: {
                        sizes: {
                            thumbnail: {
                                url: `${process.env.NEXT_PUBLIC_API_URL}/media/images/hh_logo.png`,
                            },
                        },
                    },
                },
            },
            applicantCount: 10,
            deadline: "2024-12-22",
            published: "2024-11-12",
        },
    ],
};