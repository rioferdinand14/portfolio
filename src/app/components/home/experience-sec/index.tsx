import React from 'react';

const ExperienceSec = () => {
    const experiences = [
      {
        year: "2026",
        period: "Sep 2025 - Feb 2026",
        title: "Fullstack Developer",
        company: "Badan Kesatuan Bangsa dan Politik Kota Surabaya",
        type: "Contract",
        description:
          "I worked as a Full-stack Developer to help the local government move away from slow, paper-based tasks. I built several digital tools to make their work easier, like an online archive that automatically tracks file dates and a database that helps staff verify community information quickly. I was responsible for everything from the design of the pages to the security of the data, making sure every website was safe and easy to use. My main goal was to create systems that help the department work faster and keep their records much more organized.",
      },
      {
        year: "2024",
        period: "Sep 2024 - Dec 2024",
        title: "Junior Backend Developer",
        company: "LLDIKTI Wilayah VII Jawa Timur",
        type: "Internship",
        description:
          "I built the backend for a web application used to manage lecturer data and document submissions. Using Laravel, I created the logic for handling file uploads and administrative reports while making sure the system could handle daily traffic without slowing down. A big part of my job was organizing the database to keep all the information secure and easy for the team to access.",
      },
      {
        year: "2024",
        period: "Feb 2024 - Jul 2024",
        title: "Manufacturing Digitalization Intern",
        company: "PT Siemens Indonesia",
        type: "Internship",
        description:
          "I helped the manufacturing team move away from paper processes by helping to build a digital checklist app. I also worked on both the user interface and the backend, creating a way for staff to manage procurement and maintenance tasks app directly from their devices. Before the app went live, I ran thorough tests on every feature to make sure it was reliable enough for a busy industrial setting.",
      },
      //   {
      //     year: "2020-2022",
      //     title: "Team Lead Designer",
      //     company: "www.company.com",
      //     type: "Fulltime",
      //     description:
      //       "Handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated",
      //   },
      //   {
      //     year: "2023+",
      //     title: "Team Lead Designer",
      //     company: "www.latest.com",
      //     type: "Fulltime",
      //     description:
      //       "Release of Letraset sheets containing Lorem Ipsum passages and more recently with desktop publishing software",
      //   },
    ];

    return (
        <section>
            <div className="py-16 md:py-32">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between gap-2 border-b border-black pb-7 mb-9 md:mb-16">
                        <h2>Experience</h2>
                        <p className="text-xl text-primary">( 02 )</p>
                    </div>

                    <div className="space-y-7 md:space-y-12">
                        {experiences.map((exp, index) => (
                            <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 md:gap-4 xl:gap-8 items-start relative">
                                <div className="">
                                    <h3 className="font-bold mb-2 text-black">{exp.year}</h3>
                                    <h3 className="text-sm mb-2 text-gray-500">{exp.period}</h3>
                                    <h4 className="text-lg font-normal">{exp.title}</h4>
                                </div>

                                <div className=" relative">
                                    {index < experiences.length && (
                                        <div className={`absolute left-0 top-3 w-px ${index < experiences.length - 1 ? 'h-40' : 'h-30'} bg-softGray`}></div>
                                    )}

                                    <div className="no-print absolute left-0 top-0 transform -translate-x-1/2">
                                        <div className={`no-print w-3.5 h-3.5 rounded-full border-1 bg-white flex items-center justify-center ${index === 0 ? 'border-primary' : 'border-black'
                                            }`}>
                                            {index === 0 && (
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="pl-4 lg:pl-7">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xl text-black font-normal">{exp.company}</span>
                                        </div>
                                        <p className="text-base font-normal">{exp.type}</p>
                                    </div>
                                </div>

                                <div className="pl-8 sm:pl-0">
                                    <p className="leading-relaxed text-base">{exp.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceSec;