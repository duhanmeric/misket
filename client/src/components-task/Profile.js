import ProjectContent from "./ProjectContent";
import Sidebar from "../components-ui/Sidebar";
import { useState } from "react";

export default function Project() {
  const [selectedProject, setSelectedProject] = useState(null);

  const handleContent = (project) => {
    setSelectedProject(project);
  };
  return (
    <div className="dashboard">
      <Sidebar handleContent={handleContent} />
      <ProjectContent selectedProject={selectedProject} />
    </div>
  );
}
