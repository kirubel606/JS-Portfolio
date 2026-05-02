import React, { useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import { useTheme } from '../context/context'; // Import the context

const EXCLUDED_REPOSITORIES = ['kirubel606', 'Desktop-App', 'QR-Code-Scanner-Generator'];

const getDriveFileId = (url) => {
  if (!url) return null;

  try {
    const parsed = new URL(url);

    if (!parsed.hostname.includes('drive.google.com')) {
      return null;
    }

    const fileMatch = parsed.pathname.match(/\/file\/d\/([^/]+)/);
    if (fileMatch?.[1]) {
      return fileMatch[1];
    }

    const id = parsed.searchParams.get('id');
    return id || null;
  } catch {
    return null;
  }
};

const getDriveEmbedUrl = (url) => {
  const fileId = getDriveFileId(url);
  if (!fileId) return null;
  return `https://drive.google.com/file/d/${fileId}/preview`;
};

const getDriveThumbnailCandidates = (url) => {
  const fileId = getDriveFileId(url);
  if (!fileId) return [];

  return [
    `https://drive.google.com/thumbnail?id=${fileId}&sz=w1600`,
    `https://drive.google.com/thumbnail?sz=w1600&id=${fileId}`,
    `https://drive.google.com/uc?export=view&id=${fileId}`
  ];
};

function FeaturedVideoCover({ title, embedUrl, thumbnailCandidates }) {
  const [thumbIndex, setThumbIndex] = useState(0);
  const activeThumb = thumbnailCandidates[thumbIndex];
  const noImageAvailable = thumbIndex >= thumbnailCandidates.length;

  return (
    <div className="aspect-video relative bg-gradient-to-br from-[#f2f2f2] to-[#dcdcdc] dark:from-[#3a3a3a] dark:to-[#2a2a2a] flex items-center justify-center">
      {!noImageAvailable ? (
        <img
          src={activeThumb}
          alt={title || 'Featured thumbnail'}
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
          onError={() => setThumbIndex((prev) => prev + 1)}
        />
      ) : null}
      {noImageAvailable && embedUrl ? (
        <iframe
          src={embedUrl}
          title={`${title || 'Featured'} preview`}
          className="absolute inset-0 w-full h-full border-0 pointer-events-none"
          allow="autoplay; encrypted-media"
        />
      ) : null}
      <div className="absolute inset-0 bg-black/35" />
      {embedUrl ? (
        <span className="relative z-10 px-5 py-2 rounded-full text-sm font-semibold text-white featured-neumorphism">
          Play Video
        </span>
      ) : (
        <span className="relative z-10 text-sm text-white px-4">No embeddable preview</span>
      )}
    </div>
  );
}

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [featuredLinks, setFeaturedLinks] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { theme } = useTheme(); // Access the theme context

  const reposPerPage = 6;

  useEffect(() => {
    fetch('https://api.github.com/users/kirubel606/repos')
      .then((response) => response.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          setRepos([]);
          return;
        }

        const filteredRepos = data.filter((repo) => !EXCLUDED_REPOSITORIES.includes(repo.name));
        setRepos(filteredRepos);
      })
      .catch((error) => {
        console.error('Error fetching GitHub repositories', error);
        setRepos([]);
      });

    fetch('/api/links')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch links: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setFeaturedLinks(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error('Error fetching featured links:', error);
        setFeaturedLinks([]);
      });
  }, []);

  // Calculate the index range for the current page
  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(repos.length / reposPerPage));

  useEffect(() => {
    if (!activeVideo) return undefined;

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setActiveVideo(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [activeVideo]);

  return (
    <div data-theme={theme} className='bg-[#e5e5e5] dark:bg-[#2d2d2d] w-full min-h-screen flex flex-col justify-center items-center py-12'>
      <h2 className='text-3xl font-semibold text-center dark:text-white text-gray-900 mb-10'>
        My Projects
      </h2>

      <h3 className='text-2xl font-semibold text-center dark:text-white text-gray-900 mb-6'>
        Featured from Google Drive
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mx-10 sm:mx-36">
        {featuredLinks.map((item, index) => {
          const embedUrl = getDriveEmbedUrl(item.url);
          const thumbnailCandidates = getDriveThumbnailCandidates(item.url);

          return (
            <div key={item.id || `${item.url}-${index}`} className="w-full p-4 rounded-2xl featured-neumorphism">
              <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.01}>
                <div className="p-5 rounded-xl featured-neumorphism-inset transition-all duration-300 hover:scale-[1.02]">
                  <button
                    type="button"
                    onClick={() => embedUrl && setActiveVideo({ title: item.title || 'Google Drive Video', embedUrl })}
                    className={`mb-4 w-full rounded-xl overflow-hidden relative ${
                      embedUrl ? 'cursor-pointer' : 'cursor-default'
                    }`}
                    disabled={!embedUrl}
                  >
                    <FeaturedVideoCover
                      title={item.title}
                      embedUrl={embedUrl}
                      thumbnailCandidates={thumbnailCandidates}
                    />
                  </button>

                  <h5 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                    {item.title || 'Portfolio Item'}
                  </h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {item.description || 'No description available'}
                  </p>
                  <a
                    href={item.url}
                    className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open Featured Link
                  </a>
                </div>
              </Tilt>
            </div>
          );
        })}
      </div>

      <h3 className='text-2xl font-semibold text-center dark:text-white text-gray-900 mt-14 mb-6'>
        GitHub Projects
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mx-10 sm:mx-36">
        {currentRepos.map((repo) => (
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

      {repos.length === 0 ? (
        <p className="mt-8 text-sm text-gray-600 dark:text-gray-300">No GitHub repositories available right now.</p>
      ) : null}

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

      {activeVideo ? (
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-8"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="w-full max-w-5xl rounded-2xl p-3 sm:p-5 featured-neumorphism bg-[#e5e5e5] dark:bg-[#2d2d2d]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white pr-4 truncate">
                {activeVideo.title}
              </h4>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="px-3 py-1 rounded-lg neumorphism text-gray-900 dark:text-white"
              >
                Close
              </button>
            </div>
            <div className="w-full rounded-xl overflow-hidden featured-neumorphism-inset">
              <iframe
                src={activeVideo.embedUrl}
                title={activeVideo.title}
                className="w-full aspect-video border-0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Projects;
