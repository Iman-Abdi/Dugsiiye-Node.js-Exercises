import { useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";

import { useProfile } from "../features/auth/authQueries";

import { uploadProfilePicture } from "../api/uploadApi";

import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { toast } from "sonner";

export default function Profile() {
  const {
    data: user,
    isLoading,
    error,
  } = useProfile();

  const [file, setFile] =
    useState(null);

  const [uploading, setUploading] =
    useState(false);

  const handleUpload =
    async () => {
      if (!file) {
        toast.error(
          "Please select an image"
        );

        return;
      }

      try {
        setUploading(true);

        const formData =
          new FormData();

        formData.append(
          "image",
          file
        );

        await uploadProfilePicture(
          formData
        );

        toast.success(
          "Profile picture updated"
        );
      } catch (error) {
        toast.error(
          error?.response?.data
            ?.message ||
            "Upload failed"
        );
      } finally {
        setUploading(false);
      }
    };

  if (isLoading) {
    return (
      <DashboardLayout>
        <h1>Loading...</h1>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <h1>
          Failed to load profile
        </h1>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">
          Profile
        </h1>

        <div className="border rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback>
                {user?.name
                  ?.charAt(0)
                  ?.toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div>
              <h2 className="text-xl font-semibold">
                {user?.name}
              </h2>

              <p className="text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </div>

          <div>
            <p>
              <strong>
                Name:
              </strong>{" "}
              {user?.name}
            </p>

            <p>
              <strong>
                Email:
              </strong>{" "}
              {user?.email}
            </p>

            <p>
              <strong>
                Role:
              </strong>{" "}
              {user?.role}
            </p>
          </div>
        </div>

        <div className="border rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold">
            Upload Profile Picture
          </h2>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFile(
                e.target.files[0]
              )
            }
          />

          <Button
            onClick={
              handleUpload
            }
            disabled={
              uploading
            }
          >
            {uploading
              ? "Uploading..."
              : "Upload Image"}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}