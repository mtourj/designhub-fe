import React from 'react';

import { TabPanel } from 'react-tabs';
import empty from '../../ASSETS/Icons/empty_project.svg';
import ProjectThumbnail from '../Project/ProjectThumbnail';

export default function AllTab({projects, users, ...rest}) {
//console.log('GET ALL PROJECTS EXPLORE', projects);
    //console.log('GET ALL USERS EXPLORE', users?.users)
  return (
    <>
      <div className="empty-state">
        <img src={empty} alt="empty" className="empty-icon" />
        <h1 className="no-projects">There are no projects in this category.</h1>
      </div>

      <div className="explore-projects-array">
      {projects?.projects.map(project => {
          const user = users?.users?.find(user => users.id === projects.userId);
          //console.log('ARRAY USERS', user)
          return (
            <ProjectThumbnail project={project} user={user} key={project.id} />
          );
        })}
      </div>
    </>
  );
}
