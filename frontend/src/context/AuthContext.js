import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../api/supabase";

/**
 * @typedef {Object} AuthContextValue
 * @property {object|null} user
 * @property {boolean} loading
 * @property {string|null} error
 * @property {(email: string, password: string) => Promise<boolean>} login
 * @property {() => Promise<void>} logout
 * @property {(email: string, password: string) => Promise<boolean>} register
 * @property {(email: string) => Promise<boolean>} resetPassword
 */

const AuthContext = createContext();

/**
 * AuthProvider manages authentication state and provides auth methods.
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @returns {JSX.Element}
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (isMounted) {
        setUser(data?.session?.user || null);
        setLoading(false);
      }
    });
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (isMounted) setUser(session?.user || null);
      }
    );
    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  /**
   * Log in a user.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<boolean>}
   */
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setUser(data?.user || null);
      if (error) throw error;
      return true;
    } catch (err) {
      setError(err.message || "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Log out the current user.
   * @returns {Promise<void>}
   */
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  /**
   * Register a new user.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<boolean>}
   */
  const register = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { error, data } = await supabase.auth.signUp({ email, password });
      setUser(data?.user || null);
      if (error) throw error;
      return true;
    } catch (err) {
      setError(err.message || "Registration failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Send a password reset email.
   * @param {string} email
   * @returns {Promise<boolean>}
   */
  const resetPassword = async (email) => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      return true;
    } catch (err) {
      setError(err.message || "Password reset failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  /** @type {AuthContextValue} */
  const value = {
    user,
    loading,
    error,
    login,
    logout,
    register,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * useAuth provides access to the AuthContext.
 * Throws if used outside the provider.
 * @returns {AuthContextValue}
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
