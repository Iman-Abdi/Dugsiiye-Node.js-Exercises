import api from "./axios";

export const uploadProfilePicture =
  async (formData) => {
    const response =
      await api.post(
        "/upload/profile-picture",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  };