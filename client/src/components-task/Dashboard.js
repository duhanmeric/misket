import ProjectContent from "./ProjectContent";
import Sidebar from "../components-ui/Sidebar";
import { useState } from "react";
import Profile from "../components-ui/Profile";

export default function Dashboard() {
  const [selectedContent, setSelectedContent] = useState(null);

  const handleProject = (content) => {
    if (content === "profile") {
      setSelectedContent(null);
    } else {
      setSelectedContent(content);
    }
  };

  return (
    <div className="dashboard">
      <Sidebar handleProject={handleProject} />
      {selectedContent ? (
        <ProjectContent selectedContent={selectedContent} />
      ) : (
        <Profile />
      )}
    </div>
  );
}
