import React, { useEffect, useState } from "react";
import { supabase } from "../../api/supabase";
import { useAuth } from "../../hooks/useAuth";
import FileUpload from "../../storage/FileUpload";
import { useNotification } from "../../context/NotificationContext";

function Profile() {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.user_metadata?.name || "");
      setAvatar(user.user_metadata?.avatar_url || "");
    }
  }, [user]);

  async function handleSave(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { name, avatar_url: avatar },
      });
      if (error) throw error;
      addNotification("Profile updated", "success");
    } catch (err) {
      addNotification(err.message || "Update failed", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSave}
      className="max-w-md mx-auto bg-white rounded shadow p-6 mt-8 flex flex-col gap-4"
    >
      <h1 className="text-2xl font-bold mb-2">Profile</h1>
      <FileUpload onUpload={setAvatar} />
      {avatar && (
        <img
          src={avatar}
          alt="Avatar"
          className="h-20 w-20 rounded-full mx-auto"
        />
      )}
      <input
        type="text"
        className="input input-bordered"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit" className="btn btn-primary" disabled={loading}>
        Save
      </button>
    </form>
  );
}

export default Profile;
