"use client";

import React, { useState } from "react";
import {
  Search,
  MapPin,
  Link as LinkIcon,
  Users,
  BookOpen,
  Star,
  ExternalLink,
  GitFork,
  Sparkles,
  // GitHub,
  Code2,
  Activity,
} from "lucide-react";

export default function GitHubExplorer() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchGitHubUser = async () => {
    if (!username.trim()) return;

    setLoading(true);
    setError("");
    setUserData(null);
    setRepos([]);

    try {
      const userResponse = await fetch(
        `https://api.github.com/users/${username}`
      );

      if (!userResponse.ok) {
        throw new Error("GitHub user not found");
      }

      const user = await userResponse.json();

      const repoResponse = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated`
      );

      const repositories = await repoResponse.json();

      setUserData(user);
      setRepos(repositories);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchGitHubUser();
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl -top-40 -left-40"></div>
        <div className="absolute w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl top-40 right-0"></div>
      </div>

      <div className="relative z-10 px-6 py-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded-2xl shadow-xl">
                {/* <GitHub size={38} /> */}
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
              GitHub Account Explorer
            </h1>

            <p className="text-gray-400 mt-5 text-lg max-w-2xl mx-auto leading-relaxed">
              Search developers, inspect repositories, explore coding activity,
              and discover open-source projects beautifully.
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex justify-center mb-12">
            <div className="bg-[#161b22]/80 backdrop-blur-xl border border-gray-700 rounded-2xl p-2 flex items-center w-full max-w-3xl shadow-2xl">
              <Search className="text-gray-400 ml-4" size={24} />

              <input
                type="text"
                placeholder="Search GitHub username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent outline-none flex-1 px-4 py-4 text-lg"
              />

              <button
                onClick={fetchGitHubUser}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition-all duration-300 px-8 py-4 rounded-xl font-semibold shadow-lg"
              >
                Search
              </button>
            </div>
          </div>

          {/* Idle State */}
          {!userData && !loading && !error && (
            <div className="mt-16">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-[#161b22]/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 hover:border-cyan-500 transition-all duration-300 hover:-translate-y-2">
                  <div className="bg-cyan-500/10 w-fit p-4 rounded-2xl mb-6">
                    <Code2 className="text-cyan-400" size={30} />
                  </div>

                  <h3 className="text-2xl font-bold mb-3">
                    Discover Developers
                  </h3>

                  <p className="text-gray-400 leading-relaxed">
                    Search GitHub profiles instantly and view detailed public
                    account information beautifully.
                  </p>
                </div>

                <div className="bg-[#161b22]/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 hover:border-blue-500 transition-all duration-300 hover:-translate-y-2">
                  <div className="bg-blue-500/10 w-fit p-4 rounded-2xl mb-6">
                    <BookOpen className="text-blue-400" size={30} />
                  </div>

                  <h3 className="text-2xl font-bold mb-3">
                    Explore Repositories
                  </h3>

                  <p className="text-gray-400 leading-relaxed">
                    Browse projects, technologies, stars, forks, and repository
                    descriptions in a modern interface.
                  </p>
                </div>

                <div className="bg-[#161b22]/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 hover:border-purple-500 transition-all duration-300 hover:-translate-y-2">
                  <div className="bg-purple-500/10 w-fit p-4 rounded-2xl mb-6">
                    <Activity className="text-purple-400" size={30} />
                  </div>

                  <h3 className="text-2xl font-bold mb-3">
                    Track Activity
                  </h3>

                  <p className="text-gray-400 leading-relaxed">
                    See recently updated repositories and gain insights into a
                    developer’s active projects.
                  </p>
                </div>
              </div>

              {/* Suggestion Panel */}
              <div className="mt-12 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl p-8 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="text-cyan-400" />
                  <h2 className="text-2xl font-bold">
                    Try Searching Popular Developers
                  </h2>
                </div>

                <div className="flex flex-wrap gap-4">
                  {[
                    "torvalds",
                    "gaearon",
                    "tj",
                    "vercel",
                    "facebook",
                    "microsoft",
                  ].map((name) => (
                    <button
                      key={name}
                      onClick={() => setUsername(name)}
                      className="bg-[#161b22] hover:bg-cyan-500/20 border border-gray-700 hover:border-cyan-500 transition-all px-5 py-3 rounded-xl"
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center mt-24">
              <div className="w-20 h-20 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>

              <p className="text-gray-400 mt-6 text-lg">
                Fetching GitHub data...
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-300 p-5 rounded-2xl text-center max-w-xl mx-auto">
              {error}
            </div>
          )}

          {/* User Data */}
          {userData && (
            <div className="grid lg:grid-cols-3 gap-8 mt-10">
              {/* Left Profile */}
              <div className="bg-[#161b22]/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl h-fit">
                <div className="flex flex-col items-center text-center">
                  <img
                    src={userData.avatar_url}
                    alt={userData.login}
                    className="w-40 h-40 rounded-full border-4 border-cyan-500 shadow-2xl"
                  />

                  <h2 className="text-3xl font-bold mt-6">
                    {userData.name || userData.login}
                  </h2>

                  <p className="text-cyan-400 mt-1 text-lg">
                    @{userData.login}
                  </p>

                  {userData.bio && (
                    <p className="text-gray-400 mt-5 leading-relaxed">
                      {userData.bio}
                    </p>
                  )}

                  <div className="mt-6 flex flex-col gap-3 text-gray-300 w-full">
                    {userData.location && (
                      <div className="flex items-center gap-2">
                        <MapPin size={18} />
                        <span>{userData.location}</span>
                      </div>
                    )}

                    {userData.blog && (
                      <a
                        href={userData.blog}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 hover:text-cyan-400 transition"
                      >
                        <LinkIcon size={18} />
                        <span>Website</span>
                      </a>
                    )}
                  </div>

                  <a
                    href={userData.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 w-full"
                  >
                    <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-3 rounded-xl font-semibold hover:opacity-90 transition">
                      View GitHub Profile
                    </button>
                  </a>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="bg-[#0d1117] p-4 rounded-2xl text-center border border-gray-800">
                    <Users className="mx-auto mb-2 text-cyan-400" />
                    <h3 className="text-2xl font-bold">
                      {userData.followers}
                    </h3>
                    <p className="text-gray-400 text-sm">Followers</p>
                  </div>

                  <div className="bg-[#0d1117] p-4 rounded-2xl text-center border border-gray-800">
                    <Users className="mx-auto mb-2 text-blue-400" />
                    <h3 className="text-2xl font-bold">
                      {userData.following}
                    </h3>
                    <p className="text-gray-400 text-sm">Following</p>
                  </div>

                  <div className="bg-[#0d1117] p-4 rounded-2xl text-center border border-gray-800">
                    <BookOpen className="mx-auto mb-2 text-purple-400" />
                    <h3 className="text-2xl font-bold">
                      {userData.public_repos}
                    </h3>
                    <p className="text-gray-400 text-sm">Repositories</p>
                  </div>
                </div>
              </div>

              {/* Repositories */}
              <div className="lg:col-span-2">
                <div className="bg-[#161b22]/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold">
                      Latest Repositories
                    </h2>

                    <span className="bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-xl text-sm">
                      {repos.length} repositories
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {repos.map((repo) => (
                      <div
                        key={repo.id}
                        className="bg-[#0d1117] border border-gray-800 rounded-2xl p-6 hover:border-cyan-500 hover:translate-y-[-5px] transition-all duration-300"
                      >
                        <div className="flex items-start justify-between">
                          <h3 className="text-xl font-semibold text-cyan-400">
                            {repo.name}
                          </h3>

                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-400 hover:text-white"
                          >
                            <ExternalLink size={18} />
                          </a>
                        </div>

                        <p className="text-gray-400 mt-4 min-h-[60px]">
                          {repo.description ||
                            "No description available."}
                        </p>

                        <div className="flex items-center justify-between mt-6">
                          <span className="bg-gray-800 px-3 py-1 rounded-lg text-sm">
                            {repo.language || "Unknown"}
                          </span>

                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-yellow-400">
                              <Star size={18} />
                              <span>{repo.stargazers_count}</span>
                            </div>

                            <div className="flex items-center gap-2 text-gray-400">
                              <GitFork size={18} />
                              <span>{repo.forks_count}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {repos.length === 0 && (
                    <div className="text-center text-gray-500 py-20">
                      No repositories found.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}