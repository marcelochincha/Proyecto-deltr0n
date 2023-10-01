"use client";

export default function logoutPage() {
  // redirect to main page and set localStorage to ""
  if (typeof window !== 'undefined') {
    localStorage.setItem("RUC", "");
    window.location.href = "/";
  }
}
