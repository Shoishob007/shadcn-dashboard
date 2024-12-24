export const uploadLogoImage = async (
  file,
  accessToken,
  session,
  orgId,
  update
) => {
  if (!file) {
    console.error("No file provided for upload.");
    return false;
  }

  if (!accessToken) {
    console.error("Access Token is missing.");
    return false;
  }

  const formData = new FormData();
  formData.append("file", file, file.name);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/media-images`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      console.error(
        "Failed to upload logo/profile picture:",
        response.statusText
      );
      console.error("Response Status Code:", response.status);
      return false;
    }

    const result = await response.json();
    console.log("Profile/logo image uploaded successfully:", result);
    return result;
  } catch (error) {
    console.error("Error uploading logo/profile picture:", error);
    return false;
  }
};
