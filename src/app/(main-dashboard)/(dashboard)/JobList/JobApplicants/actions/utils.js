export const fetchJobApplications = async (jobId, accessToken, page) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/job-applications?where[jobDetails.job.id][equals]=${jobId}&limit=10`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching job applications:", error);
    throw error;
  }
};

export const fetchOrganizationDetails = async (orgId, accessToken) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/organizations/${orgId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching organization details:", error);
    throw error;
  }
};

export const fetchApplicantProfiles = async (applicantIds, accessToken) => {
  try {
    const profiles = await Promise.all(
      applicantIds.map(async (id) => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/applicants/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        return { id, profile: data };
      })
    );
    return profiles;
  } catch (error) {
    console.error("Error fetching applicant profiles:", error);
    throw error;
  }
};

export const fetchHiringStages = async (organizationID, accessToken) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/hiring-stages?where[organization.id][equals]=${organizationID}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching hiring stages:", error);
    throw error;
  }
};

export const calculateTotalExperience = (experiences) => {
  if (!experiences) return "No Experience!";

  const totalMonths = experiences.reduce((acc, exp) => {
    const start = new Date(exp.startDate);
    const end = new Date(exp.endDate);
    const duration =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());
    return acc + duration;
  }, 0);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  return `${years} years ${months} months`;
};

export const transformJobInfo = (jobDetails, organizationDetails) => {
  if (!jobDetails) return null;

  return {
    title: jobDetails.job.title,
    job: {
      id: jobDetails.job.id,
      organization: {
        id: jobDetails.job.organization,
        orgName: organizationDetails?.orgName || "Organization Name",
        orgTagline: organizationDetails?.orgTagline || "",
        orgAddress: organizationDetails?.orgAddress || "",
        orgEmail: organizationDetails?.orgEmail || "",
        orgPhone: organizationDetails?.orgPhone || "",
        orgWebsiteUrl: organizationDetails?.orgWebsiteUrl || "",
        img: organizationDetails?.img || null,
        socialLinks: organizationDetails?.socialLinks || [],
      },
    },
    jobType: jobDetails.jobType?.id || "",
    employeeType: jobDetails.employeeType?.id || "",
    jobTypeTitle: jobDetails.jobType?.title || "",
    employeeTypeTitle: jobDetails.employeeType?.title || "",
    jobRole: jobDetails.jobRole?.[0]?.title || "",
    designation: jobDetails.designation?.title || "",
    location: jobDetails.location || "",
    salary: jobDetails.salary || "",
    description: jobDetails.description || "",
    requirements: jobDetails.requirements || "",
    employeeBenefits: jobDetails.employeeBenefits || "",
    skills: jobDetails?.skills || [],
    degreeLevel: jobDetails?.degreeLevel || [],
    fieldOfStudy: jobDetails?.fieldOfStudy || [],
    deadline: jobDetails.deadline || "",
    createdAt: jobDetails.createdAt || "",
    industry:
      organizationDetails?.industryType?.map((type) => type.title).join(", ") ||
      "",
    establishedYear: organizationDetails?.orgEstablishedYear || "",
  };
};

export const transformApplications = (jobApplications, applicantProfiles) => {
  return jobApplications
    .map((application) => {
      const profile = applicantProfiles[application.applicant.id];
      if (!profile) return null;

      const latestStatus =
        application.applicationStatus?.docs?.[0]?.status || "applied";
      const applicationId = application.applicationStatus?.docs?.[0]?.id;

      const cvUrl = `${process.env.NEXT_PUBLIC_API_URL}${profile?.cv?.url}`;
      const profilePicture = `${process.env.NEXT_PUBLIC_API_URL}${profile?.img?.url}`;

      return {
        id: application.id,
        jobId: application.jobDetails.job.id,
        applicantProfileID: application.applicant.id,
        name: profile.name || "N/A",
        CVScore: profile.CVScore || (profile.cv ? 75 : 0),
        CV: cvUrl,
        certifications: profile.trainingAndCertifications || [],
        experiences: profile.experiences || [],
        socialLinks: profile.socialLinks || [],
        education: profile.educations || [],
        skills: profile.skills || [],
        contactInfo: {
          email: profile.email,
          phone: profile.phone,
          address: profile.address,
        },
        applicant: {
          pictureUrl: profilePicture || null,
          websiteUrl: profile.applicantWebsiteUrl || null,
        },
        applicationStatus: latestStatus,
        applicationId: applicationId,
        hiringStep: application.applicationStatus?.docs[0]?.hiringStage,
      };
    })
    .filter(Boolean);
};
