import { Button } from "@/components/ui/button";
import { CalendarDays, GraduationCap, Pencil } from "lucide-react";

const Educations = ({ profileInfo }) => {
  return (
    <section>
      <div className="flex justify-between mb-[14px]">
        <h1>Education</h1>
        <Button variant="outline" className="rounded-full">
          <Pencil size={16} />
        </Button>
      </div>
      <div>
        {profileInfo.map((info) => {
          return (
            <div>
              {info.educations.map((education) => {
                return (
                  <div key={education.id} className="flex gap-2.5">
                    <div className="uppercase border border-[#e2e2e2] h-10 w-10 flex items-center justify-center rounded-lg">
                      {education.instituteName.slice(0, 2)}
                    </div>
                    <div>
                      <h2 className="mb-1">{education.instituteName}</h2>
                      <div className="flex items-center gap-2 text-[12px] text-[#383838]">
                        <div className="flex gap-1 items-center">
                          <span>
                            <GraduationCap
                              size={16}
                              className="text-[#383838]"
                            />
                          </span>
                          <span>{education.degreeLevel.title}</span>
                        </div>
                        <div className="bg-gray-400 h-1 w-1 rounded-full"></div>
                        <div>
                          <span>{education.fieldOfStudy.title}</span>
                        </div>
                        <div className="bg-gray-400 h-1 w-1 rounded-full"></div>
                        <div className="flex gap-1">
                          <div className="flex items-center gap-1">
                            <span>
                              <CalendarDays
                                size={16}
                                className="text-[#383838]"
                              />
                            </span>
                            <span>
                              {new Date(education.beginning).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </div>
                          <div>-</div>
                          <div>
                            <span>
                              {new Date(education.ending).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Educations;
