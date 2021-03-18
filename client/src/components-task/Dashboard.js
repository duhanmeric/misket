import ProjectContent from "./ProjectContent";
import Sidebar from "../components-ui/Sidebar";
import { useState } from "react";

export default function Dashboard() {
  const [selectedContent, setSelectedContent] = useState(null);

  const handleProject = (content) => {
    setSelectedContent(content);
  };

  return (
    <div className="dashboard">
      <Sidebar handleProject={handleProject} />
      <ProjectContent selectedContent={selectedContent} />
    </div>
  );
}
