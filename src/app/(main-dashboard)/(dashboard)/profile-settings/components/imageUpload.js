export const uploadCoverImage = async (file, accessToken, organizationId) => {
    if (file) {
        const formData = new FormData();
        formData.append("img", file, file.name);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/organizations/${organizationId}`,
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
            // console.log("Patch request response: ", result)
            const updatedImageUrl = `${process.env.NEXT_PUBLIC_API_URL}${result.doc.img.url}`;
            console.log("Cover image updated successfully:", updatedImageUrl);
            return updatedImageUrl;
        } catch (error) {
            console.error("Error uploading cover image:", error);
        }
    }
};


export const uploadLogoImage = async (file, accessToken, session, orgId, update) => {
    const formData = new FormData();
    formData.append("file", file, file.name);

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/media-images`, {
            method: "POST",
            headers: { Authorization: `Bearer ${accessToken}` },
            body: formData,
        });

        if (response.ok) {
            const result = await response.json();
            // console.log(result.doc)
            const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${result.doc.url}`;

            console.log("Profile/logo image uploaded successfully:", imageUrl);

            const updateResponse = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/users/${session?.user?.id}`,
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

            // console.log("Update response after the patch request :", updateResponse.json())

            if (!updateResponse.ok) {
                console.error("Failed to update organization with new pictureUrl");
                return false;
            }

            // console.log("Organization updated with new pictureUrl");

            const updatedSession = {
                ...session,
                user: {
                    ...session.user,
                    image: imageUrl,
                },
            };

            await update(updatedSession);

            console.log("Session updated with new profile image");
            return true;
        } else {
            console.error("Failed to upload logo/profile picture");
            return false;
        }
    } catch (error) {
        console.error("Error uploading logo/profile picture:", error);
        return false;
    }
};