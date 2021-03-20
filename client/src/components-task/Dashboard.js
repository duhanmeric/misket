import ProjectContent from "./ProjectContent";
import Sidebar from "../components-ui/Sidebar";
import { useState } from "react";

export default function Dashboard() {
  const [selectedContent, setSelectedContent] = useState(null);
  const [projectList, setProjectList] = useState([]);

  const handleSelected = (newValue) => {
    setSelectedContent(newValue);
  };

  return (
    <div className="dashboard">
      <Sidebar
        selectedContent={selectedContent}
        handleSelected={handleSelected}
        projectList={projectList}
        setProjectList={setProjectList}
      />
      <ProjectContent
        selectedContent={selectedContent}
        handleSelected={handleSelected}
        projectList={projectList}
        setProjectList={setProjectList}
      />
    </div>
  );
}
