import { createContext } from 'react';

const ProjectSettings = createContext();

const ProjectSettingsProvider = ({ children }) => {

  return (
    <ProjectSettings.Provider value={{env:"prd",ipAddr:"192.168.1.6"}}>
      {children}
    </ProjectSettings.Provider>
  );
};

export { ProjectSettings, ProjectSettingsProvider };
