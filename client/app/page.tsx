"use client";
import { useUserContext } from "@/context/userContext";
import useRedirect from "@/hooks/useUserRedirect";
import { useState } from "react";
import ChangePasswordForm from "./Components/auth/ChangePasswordForm/ChangePasswordForm";

export default function Home() {
  useRedirect("/login");

  return (
    <main>haii</main>
  );
}
