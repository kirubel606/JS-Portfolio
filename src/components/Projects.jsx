// GitHubRepositories.js

import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';

const GitHubRepositories = () => {
  const [repos, setRepos] = useState([]);

  // Array for repository names to exclude
  const excludedRepositories = ['kirubel606', 'Desktop-App', 'QR-Code-Scanner-Generator'];

  useEffect(() => {
    // Fetch GitHub repositories here
    fetch('https://api.github.com/users/kirubel606/repos') // Update the username here
      .then(response => response.json())
      .then(data => {
        // Filter out excluded repositories
        const filteredRepos = data.filter(repo => !excludedRepositories.includes(repo.name));
        setRepos(filteredRepos);
      })
      .catch(error => console.error('Error fetching GitHub repositories', error));
  }, []);

  return (
    <div id="projects" className='bg-black'>
      <h2 className='text-center text-white mb-5'>  Projects </h2>
      <div className="row projectzone mx-auto text-center">
        {repos.map(repo => (
          <div key={repo.id} className="col-md-4 mb-4">
            <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1}>
            <div className="card github-card">
              <div className="card-body">
                <h5 className="card-title futurefont" style={{color:"white"}}>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    {repo.name}
                  </a>
                </h5>
                <p className="card-text">{repo.description}</p>
                <a href={repo.html_url} className="btn btn-outline-primary githubbutton futurefont" target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              </div>
            </div>
            </Tilt>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GitHubRepositories;
