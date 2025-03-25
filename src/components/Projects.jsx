import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import { useTheme } from '../context/context'; // Import the context

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const { theme } = useTheme(); // Access the theme context

  const [currentPage, setCurrentPage] = useState(1);
  const reposPerPage = 6;

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

  // Calculate the index range for the current page
  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(repos.length / reposPerPage);

  return (
    <div data-theme={theme} className='bg-[#e5e5e5] dark:bg-[#2d2d2d] w-full min-h-screen flex flex-col justify-center items-center py-12'>
      <h2 className='text-3xl font-semibold text-center dark:text-white text-gray-900 mb-10'>
        My Projects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mx-10 sm:mx-36">
        {currentRepos.map(repo => (
          <div key={repo.id} className="w-full p-4 rounded-xl shadow-lg neumorphism-inset dark:neumorphism-inset">
            <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1}>
              <div className="bg-[#e5e5e5] dark:bg-[#333333] p-6 rounded-lg shadow-lg transition-all duration-300 hover:scale-105">
                <h5 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    {repo.name}
                  </a>
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {repo.description || 'No description available'}
                </p>
                <a 
                  href={repo.html_url} 
                  className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  View on GitHub
                </a>
              </div>
            </Tilt>
          </div>
        ))}
      </div>
      
      {/* Pagination */}
      <div className="flex justify-center mt-8 ">
        <button 
          className="px-4 py-2 neumorphism dark:text-white text-gray-800 rounded-md ml-2 "
          onClick={() => paginate(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className={`px-4 py-2 mx-2 rounded-md ${currentPage === index + 1 ? 'dark:text-white text-gray-800 neumorphism-inset font-bold' : 'bg-gray-300 dark:text-white text-gray-800 neumorphism'}`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button 
          className="px-4 py-2 neumorphism dark:text-white text-gray-800 rounded-md mr-2"
          onClick={() => paginate(currentPage + 1)} 
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Projects;
