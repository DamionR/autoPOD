import React from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../../api/supabase";
import GoogleAuthButton from "../../components/Button/GoogleAuthButton";

function SignIn() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded shadow">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["google"]}
          theme="light"
        />
        <GoogleAuthButton className="mt-4" />
      </div>
    </div>
  );
}

export default SignIn;
