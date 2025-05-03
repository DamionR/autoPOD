import React, { useState } from "react";
import { supabase } from "../../api/supabase";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import GoogleAuthButton from "../../components/Button/GoogleAuthButton";

function SignUp() {
  const { addNotification } = useNotification();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      addNotification(
        "Sign up successful! Please check your email to confirm.",
        "success"
      );
      navigate("/signin");
    } catch (err) {
      setError(err.message || "Sign up failed");
      addNotification(err.message || "Sign up failed", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white rounded shadow p-6 mt-8 flex flex-col gap-4"
      aria-label="Sign up form"
    >
      <h1 className="text-2xl font-bold mb-2">Sign Up</h1>
      <label htmlFor="email" className="font-semibold">
        Email
      </label>
      <input
        id="email"
        type="email"
        className="input input-bordered"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoFocus
      />
      <label htmlFor="password" className="font-semibold">
        Password
      </label>
      <input
        id="password"
        type="password"
        className="input input-bordered"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
      />
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Signing up..." : "Sign Up"}
      </button>
      <div className="text-sm text-center mt-2">
        Already have an account?{" "}
        <a href="/signin" className="text-blue-600 hover:underline">
          Sign in
        </a>
      </div>
      <GoogleAuthButton className="mt-4" />
    </form>
  );
}

export default SignUp;
