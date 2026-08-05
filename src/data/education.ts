export type Education = {
  school: string;
  degree: string;
  period: string;
  detail?: string;
};

export const education: Education[] = [
  {
    school: "Arizona State University",
    degree: "Master's, Mechatronics, Robotics, and Automation Engineering",
    period: "May 2023",
    detail: "GPA 3.5",
  },
  {
    school: "Jawaharlal Nehru Technological University",
    degree: "Bachelor of Technology",
    period: "Sep 2016",
    detail: "GPA 3.7",
  },
];
