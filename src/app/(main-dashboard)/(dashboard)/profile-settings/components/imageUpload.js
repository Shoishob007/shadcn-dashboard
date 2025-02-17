export const uploadCoverImage = async (file, accessToken, organizationId) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/media-images`, {
            method: "POST",
            headers: { Authorization: `Bearer ${accessToken}` },
            body: formData,
        });

        if (response.ok) {
            const result = await response.json();
            const imageID = result.doc.id;
            const imageURL = `${process.env.NEXT_PUBLIC_API_URL}${result.doc.url}`;

            console.log("Cover image uploaded successfully:", imageID);

            // Update the organization's cover image with the new image ID
            const updatedResponse = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/organizations/${organizationId}`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        img: imageID,
                    }),
                }
            );

            if (!updatedResponse.ok) {
                console.error("Failed to update organization with new cover image");
                return null;
            }

            console.log("Organization updated with new cover image");
            return imageURL;
        } else {
            console.error("Failed to upload cover image");
            return null;
        }
    } catch (error) {
        console.error("Error uploading cover image:", error);
        return null;
    }
};


export const uploadLogoImage = async (file, accessToken, session, update) => {

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/media-images`, {
            method: "POST",
            headers: { Authorization: `Bearer ${accessToken}` },
            body: formData,
        });

        if (response.ok) {
            const result = await response.json();

            console.log("Upload response ::", result);

            const imageURL = `${process.env.NEXT_PUBLIC_API_URL}${result.doc?.url}`;

            console.log("imageURL:", imageURL);

            // Updating the session 
            const updatedSession = {
                ...session,
                user: {
                    ...session.user,
                    image: imageURL,
                },
            };
            await update(updatedSession); 
            return imageURL;
        } else {
            console.error("Failed to upload logo/profile picture. Response status:", response.status);
            const errorText = await response.text();
            console.error("Response Text:", errorText);
            return null;
        }
    } catch (error) {
        console.error("Error uploading logo/profile picture:", error);
        return null;
    }
};