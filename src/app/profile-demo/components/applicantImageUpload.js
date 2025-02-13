export const uploadApplicantCoverImage = async (
  file,
  accessToken,
  applicantId
) => {
  if (file) {
    const formData = new FormData();
    formData.append("img", file, file.name);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/applicants/${applicantId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        console.error("Failed to upload and update cover image");
        return;
      }

      const result = await response.json();
      const updatedImageUrl = `${process.env.NEXT_PUBLIC_API_URL}${result.doc.img.url}`;
      console.log(
        "Applicant cover image updated successfully:",
        updatedImageUrl
      );
      return updatedImageUrl;
    } catch (error) {
      console.error("Error uploading applicant cover image:", error);
    }
  }
};

export const uploadApplicantLogoImage = async (
  file,
  accessToken,
  session,
  applicantId,
  update
) => {
  const formData = new FormData();
  formData.append("file", file, file.name);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/media-images`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
        body: formData,
      }
    );

    if (response.ok) {
      const result = await response.json();
      const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${result.doc.url}`;

      console.log(
        "Applicant profile/logo image uploaded successfully:",
        imageUrl
      );

      const updateResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/applicants/${applicantId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            pictureUrl: imageUrl,
          }),
        }
      );

      if (!updateResponse.ok) {
        console.error("Failed to update applicant with new pictureUrl");
        return false;
      }

      const updatedSession = {
        ...session,
        user: {
          ...session.user,
          image: imageUrl,
        },
      };

      await update(updatedSession);

      console.log("Session updated with new applicant profile image");
      return true;
    } else {
      console.error("Failed to upload applicant logo/profile picture");
      return false;
    }
  } catch (error) {
    console.error("Error uploading applicant logo/profile picture:", error);
    return false;
  }
};
