import { Hono } from 'hono';
import { z } from "zod";
import * as fs from "fs";
const app = new Hono()
app.get('/', (c) => c.text('Hello Bun!'))
console.log("running")

const paramsSchema = z.object({
  strm: z.string().max(4),
  courseId: z.string().min(1).max(10),
});


app.get("/api/course/:strm/:courseId", (c) => {
  console.log(c.req.param());
  const { strm, courseId } = paramsSchema.parse(c.req.param());

  const data = JSON.parse(fs.readFileSync("content.json", "utf8"));
  // Full response data for the mock API
  const responseData = [
    {
      strm: "2247",
      courseId: "104171",
      timestamp: 1709654837998,
      courseOfferNumber: "1",
      subject: "CSE",
      catalogNumber: "100",
      primaryOwningDepartmentAcadOrg: "CCOMPENG",
      primaryOwningParentCollegeAcadOrg: "CES",
      splitOwners: null,
      primaryOwningDepartmentDescription: "Computer Science and Engineering Program",
      primaryOwningParentCollegeDescription: "Ira A. Fulton Schools of Engineering",
      catalogPrint: true,
      acadCareerCode: "UGRD",
      description: "Principles of Programming with C++",
      fullDescription: "Principles of problem solving using C++, algorithm design, structured programming, fundamental algorithms and techniques, and computer systems concepts. Social and ethical responsibility.",
      approvedUnitsMinimum: 3,
      approvedUnitsMaximum: 3,
      defaultUnitsMinimum: 3,
      defaultUnitsMaximum: 3,
      academicProgressUnits: 3,
      financialAidProgressUnits: 3,
      courseRepeatable: false,
      totalCompletionsAllowed: 1,
      totalUnitsAllowed: 3,
      allowMultipleEnrollmentsInTerm: false,
      requirementDesignationCode: "GE48",
      requirementDesignationDescription: "QTRS OR CS",
      requirementGroupCode: null,
      requirementGroupDescription: null,
      greatestTermOffered: "2251",
      equivalentCourseGroupId: null,
      gradingBasisCode: "OPT",
      gradingBasisDescription: "Student Option",
      topics: null,
      components: [
        {
          code: "LAB",
          description: "Laboratory",
          graded: false,
          optional: false,
          primary: false
        },
        {
          code: "LEC",
          description: "Lecture",
          graded: true,
          optional: false,
          primary: true
        }
      ],
      equivalentCourses: []
    }
  ];
  return c.json(responseData);
});
app.onError((error, c) => {
  console.error("Internal Server Error:", error);
  return c.json({ error: "Internal Server Error" }, 500);
});



export default {
    port: 8686, 
  fetch: app.fetch, 
}