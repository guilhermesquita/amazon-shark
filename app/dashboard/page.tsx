"use client";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import Companies from "@/components/usuario/Companies";
import Profile from "@/components/usuario/Profile";
import React from "react";

export default function Dashboard() {
  const [selectedSection, setSelectedSection] = React.useState("profile");

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <Navbar />
      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-6xl w-full px-3">
        <main className="flex-1 flex flex-row gap-6">
          <Sidebar
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
          />
          <div className="flex-grow">
            {selectedSection === "profile" && <Profile />}
            {selectedSection === "companies" && <Companies />}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
