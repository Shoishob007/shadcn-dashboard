import qs from "qs";

export const fetchJobApplications = async (orgId, accessToken, page) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/job-applications?where[jobDetails.job.organization][equals]=${orgId}&page=${page}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching job applications:", error);
    throw error;
  }
};

export const fetchApplicantProfiles = async (applicantIds, accessToken) => {
  try {
    return await Promise.all(
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
  } catch (error) {
    console.error("Error fetching applicant profiles:", error);
    throw error;
  }
};

export const fetchHiringStages = async (orgId, accessToken) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/hiring-stages?where[organization.id][equals]=${orgId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return await response.json();
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

export const transformApplicantData = (
  application,
  profile,
  applicantProfiles
) => {
  if (!profile) return null;

  const latestStatus =
    application.applicationStatus?.docs?.[0]?.status || "applied";
  const applicationStatusId = application.applicationStatus?.docs?.[0]?.id;
  // console.log("Application status id in the action:: ", applicationId);
  const newApplicationStatusId = application.applicationStatus?.docs?.[0]?.id;
  const cvUrl = profile?.cv?.url
    ? `${process.env.NEXT_PUBLIC_API_URL}${profile?.cv?.url}`
    : null;
  const profilePicture = `${process.env.NEXT_PUBLIC_API_URL}${profile?.img?.url}`;

  return {
    id: application.id,
    applicantProfileID: application?.applicant?.id,
    name: profile.name || "N/A",
    CVScore: profile.CVScore || (profile?.cv ? 75 : 0),
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
      pictureUrl: profilePicture,
      websiteUrl: profile?.applicantWebsiteUrl,
    },
    jobTitle: application.jobDetails?.job?.title || "N/A",
    jobRole: application.jobDetails?.jobRole?.[0]?.title || "N/A",
    applicationStatus: latestStatus,
    jobApplicationId: application.id, // This is the job application ID
    applicationStatusId: applicationStatusId,
    hiringStep: application.applicationStatus?.docs[0]?.hiringStage,
    createdAt: application.createdAt,
    newApplicationStatusId: newApplicationStatusId,
  };
};

export const filterApplicants = (
  applicants,
  filters,
  selectedStatus,
  selectedStep
) => {
  return applicants.filter((applicant) => {
    let statusMatch = false;

    if (!selectedStatus) {
      statusMatch =
        applicant.applicationStatus === "applied" ||
        applicant.applicationStatus === "hired" ||
        applicant.applicationStatus === "rejected" ||
        applicant.applicationStatus === "shortlisted";
    } else if (selectedStatus === "applied") {
      statusMatch =
        applicant.applicationStatus === "applied" ||
        applicant.applicationStatus === "hired" ||
        applicant.applicationStatus === "rejected" ||
        applicant.applicationStatus === "shortlisted";
    } else if (selectedStatus === "hired") {
      statusMatch = applicant.applicationStatus === "hired";
    } else if (selectedStatus === "rejected") {
      statusMatch = applicant.applicationStatus === "rejected";
    } else if (selectedStatus === "shortlisted") {
      if (selectedStep === "all") {
        statusMatch = applicant.applicationStatus === "shortlisted";
      } else {
        statusMatch =
          applicant.applicationStatus === "shortlisted" &&
          applicant.hiringStep?.title === selectedStep;
      }
    }

    if (!statusMatch) return false;

    // Apply additional filters
    if (
      filters.searchQuery &&
      !applicant?.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
    ) {
      return false;
    }
    if (
      filters.selectedJobRole !== "all" &&
      applicant.jobRole !== filters.selectedJobRole
    ) {
      return false;
    }
    if (filters.selectedTime !== "all") {
      const createdAt = new Date(applicant.createdAt);
      const now = new Date();
      const timeDiff = now - createdAt;

      if (
        filters.selectedTime === "last24h" &&
        timeDiff > 24 * 60 * 60 * 1000
      ) {
        return false;
      }
      if (
        filters.selectedTime === "last7d" &&
        timeDiff > 7 * 24 * 60 * 60 * 1000
      ) {
        return false;
      }
      if (
        filters.selectedTime === "last30d" &&
        timeDiff > 30 * 24 * 60 * 60 * 1000
      ) {
        return false;
      }
    }

    return true;
  });
};

export const fetchApplicantStatusWithQs = async (jobApplicationId, accessToken) => {
  try {
    const query = qs.stringify({
      where: {
        jobApplication: {
          equals: jobApplicationId,
        },
      },
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/applicant-status?${query}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch applicant status: ${response.status}`);
    }

    const data = await response.json();

    // console.log("fetched status:: ", data);

    // Extract the applicationStatus ID from the response
    const applicationStatusId = data.docs?.[0]?.id || null;
    console.log("applicationStatusId ::: ", applicationStatusId);

    return {
      statusData: data,
      newApplicationStatusID: applicationStatusId,
    };
  } catch (error) {
    console.error("Error fetching applicant status:", error);
    throw error;
  }
};
