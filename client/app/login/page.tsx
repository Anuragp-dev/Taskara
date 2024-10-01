"use client";
import React, { useEffect } from "react";
import LoginForm from "../Components/auth/LoginForm/LoginForm";
import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";

function page() {
  const { user } = useUserContext()
  const router = useRouter();

  useEffect(() => {
    // redirect to home page if user is already logged in 
    if (user && user._id) {
      router.push("/")
    }
  }, [user, router])

  // return null if user is null or id is null
  if (user && user._id) {
    return null
  }
  return (
    <div className="auth-page w-full h-full flex justify-center items-center">
      <LoginForm />
    </div>
  );
}

export default page;
