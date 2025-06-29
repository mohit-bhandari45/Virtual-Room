"use client";

import MainLoader from "@/components/loaders/mainLoader";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const LoginSuccess = () => {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (!token) {
      const availToken = localStorage.getItem("token");
      if (!availToken) {
        router.push("/auth/login");
      } else {
        router.push("/dashboard");
      }
    } else {
      localStorage.setItem("token", token);
      router.push("/dashboard");
    }
  }, [router]);

  return <MainLoader msg={"Redirecting... Please wait"} />;
};

export default LoginSuccess;
