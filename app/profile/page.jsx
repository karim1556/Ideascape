"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!session?.user.id) return;

      try {
        const response = await fetch(`/api/users/${session.user.id}/posts`);
        if (response.ok) {
          const data = await response.json();
          setMyPosts(data);
        } else {
          console.error('Failed to fetch posts:', await response.text());
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        if (response.ok) {
          const filteredPosts = myPosts.filter((item) => item._id !== post._id);
          setMyPosts(filteredPosts);
          console.log("Prompt deleted successfully");
        } else {
          const errorMessage = await response.text();
          console.error("Error deleting prompt:", errorMessage);
        }
      } catch (error) {
        console.error("Error deleting prompt:", error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
