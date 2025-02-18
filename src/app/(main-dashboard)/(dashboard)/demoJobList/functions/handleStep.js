export const handleStepChange = async (applications, applicantId, applicationId, hiringStages, onUpdateApplicant, newStage, setScheduleModal, toast, accessToken) => {
    const applicant = applications.find((a) => a.id === applicantId);

    if (!applicationId) {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/applicant-status`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({
                        jobApplication: applicantId,
                        hiringStage: hiringStages.docs[0].id,
                        status: "shortlisted",
                        timeStamp: new Date().toISOString(),
                    }),
                }
            );

            if (response.ok) {
                const updatedApplicant = {
                    ...applicant,
                    applicationStatus: "shortlisted",
                    hiringStep: hiringStages.docs[0],
                };
                onUpdateApplicant(updatedApplicant);
                toast({
                    title: "Success",
                    description: "Applicant shortlisted successfully.",
                    variant: "ourSuccess",
                });
            } else {
                throw new Error("Failed to shortlist applicant");
            }
        } catch (error) {
            console.error("Error updating applicant status:", error);
            toast({
                title: "Error",
                description: "Failed to shortlist applicant. Please try again.",
                variant: "ourDestructive",
            });
        }
    } else {
        setScheduleModal({
            isOpen: true,
            applicantId,
            applicationId,
            step: newStage,
        });
    }
};
