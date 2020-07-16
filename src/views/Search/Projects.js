import React from 'react';

export default function Projects({ projects }) {
  console.log('projects', projects);
  return (
    <>
      {projects.map((project) => (
        <div key={project.id}>
          <h4>{project.name}</h4>
          <div className="imageBox">
            <img src={project.mainImg} alt="Project" />
          </div>
        </div>
      ))}
    </>
  );
}
