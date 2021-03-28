import ProjectContent from "./ProjectContent";
import DesktopSidebar from "../components-ui/DesktopSidebar";
import MobileSidebar from "../components-ui/MobileSidebar";
import { useState } from "react";

export default function Dashboard() {
  const [selectedContent, setSelectedContent] = useState(null);
  const [projectList, setProjectList] = useState([]);

  const handleSelected = (newValue) => {
    setSelectedContent(newValue);
  };

  return (
    <div className="dashboard">
      <DesktopSidebar
        selectedContent={selectedContent}
        handleSelected={handleSelected}
        projectList={projectList}
        setProjectList={setProjectList}
      />
      <MobileSidebar
        selectedContent={selectedContent}
        handleSelected={handleSelected}
        projectList={projectList}
        setProjectList={setProjectList}
      ></MobileSidebar>
      <ProjectContent
        selectedContent={selectedContent}
        handleSelected={handleSelected}
        projectList={projectList}
        setProjectList={setProjectList}
      />
    </div>
  );
}
