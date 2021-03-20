import ProjectContent from "./ProjectContent";
import Sidebar from "../components-ui/Sidebar";
import { useState } from "react";

export default function Dashboard() {
  const [selectedContent, setSelectedContent] = useState(null);

  const handleChange = (newValue) => {
    console.log(newValue);
    setSelectedContent(newValue);
  };

  return (
    <div className="dashboard">
      <Sidebar selectedContent={selectedContent} handleChange={handleChange} />
      <ProjectContent selectedContent={selectedContent} />
    </div>
  );
}
