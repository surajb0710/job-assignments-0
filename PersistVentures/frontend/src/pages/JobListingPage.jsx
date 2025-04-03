import React, { useEffect, useState, useMemo } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import axios from 'axios';
import JobCard from '../components/cards/JobCard';
import RocketAnimation from '../animation/RocketAnimation';

const JobListingPage = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState([]);
  const [authUser, setAuthUser] = useState({});
  const [jobsList, setJobsList] = useState([]);
  const [skills, setSkills] = useState([]);
  const [locations, setLocations] = useState([]);
  const [experience, setExperience] = useState([]);

  const [isApplying, setIsApplying] = useState(false);
  const [apiSuccess, setApiSuccess] = useState(false);

  const onSelectSkills = (selectedList) => setSelectedSkills(selectedList);
  const onRemoveSkills = (selectedList) => setSelectedSkills(selectedList);

  const onSelectLocations = (selectedList) =>
    setSelectedLocations(selectedList);
  const onRemoveLocations = (selectedList) =>
    setSelectedLocations(selectedList);

  const onSelectExperience = (selectedList) =>
    setSelectedExperience(selectedList);

  const onRemoveExperience = (selectedList) =>
    setSelectedExperience(selectedList);

  useEffect(() => {
    const getJobs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/jobs`
        );
        setJobsList(response.data.sortedJobs);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    getJobs();
  }, []);

  const [filteredJobs, setFilteredJobs] = useState(jobsList);

  useEffect(() => {
    const extractCategories = (jobsList) => {
      const skillsSet = new Set();
      const locationSet = new Set();
      const experienceSet = new Set();

      jobsList.forEach((job) => {
        if (job.skills) job.skills.forEach((skill) => skillsSet.add(skill));
        locationSet.add(job.location);
        experienceSet.add(job.experience);
      });

      const formatArray = (set) =>
        [...set].map((name, index) => ({ name, id: index + 1 }));

      setSkills(formatArray(skillsSet));
      setLocations(formatArray(locationSet));
      setExperience(formatArray(experienceSet));
    };
    extractCategories(jobsList);
  }, [jobsList]);

  useEffect(() => {
    const filterJobs = () => {
      setFilteredJobs(
        jobsList.filter((job) => {
          const skillsMatch =
            selectedSkills.length === 0 ||
            selectedSkills.some((s) => job.skills.includes(s.name));

          const locationMatch =
            selectedLocations.length === 0 ||
            selectedLocations.some((l) => job.location === l.name);

          const experienceMatch =
            selectedExperience.length === 0 ||
            selectedExperience.some((e) => job.experience === e.name);

          return skillsMatch && locationMatch && experienceMatch;
        })
      );
    };
    filterJobs(jobsList);
  }, [selectedSkills, selectedLocations, selectedExperience, jobsList]);

  useEffect(() => {
    const getAuthUser = async () => {
      const token = localStorage.getItem('authToken');

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAuthUser(response.data.user);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    getAuthUser();
  }, []);

  const resetApiSuccess = () => {
    setApiSuccess(false);
    setIsApplying(false);
  };

  return (
    <main className="mt-10">
      <div className="fixed w-100 flex flex-col gap-5 p-8 rounded-2xl shadow-[inset_0px_0px_5px_1px_#f7fafc90] bg-gradient">
        <div>
          <h3>Skills</h3>
          <Multiselect
            options={skills}
            selectedValues={selectedSkills}
            onSelect={onSelectSkills}
            onRemove={onRemoveSkills}
            displayValue="name"
            style={{
              searchBox: {
                border: 'none', // Corrected: Added quotes around 'none'
                fontSize: '14px', // Corrected: Added quotes around '10px'
              },
              chips: {
                // To change css chips(Selected options)
                background: '#9793b5',
              },
              optionContainer: {
                // To change css for option container
                border: '2px solid',
                background: '#bbafe8',
              },
              option: {
                // To change css for dropdown options
                color: '#5c5482',
              },
            }}
          />
        </div>
        <div>
          <h3>Location</h3>
          <Multiselect
            options={locations}
            selectedValues={selectedLocations}
            onSelect={onSelectLocations}
            onRemove={onRemoveLocations}
            displayValue="name"
            style={{
              searchBox: {
                border: 'none', // Corrected: Added quotes around 'none'
                fontSize: '14px', // Corrected: Added quotes around '10px'
              },
              chips: {
                // To change css chips(Selected options)
                background: '#9793b5',
              },
              optionContainer: {
                // To change css for option container
                border: '2px solid',
                background: '#bbafe8',
              },
              option: {
                // To change css for dropdown options
                color: '#5c5482',
              },
            }}
          />
        </div>
        <div>
          <h3>Experience</h3>
          <Multiselect
            options={experience}
            selectedValues={selectedExperience}
            onSelect={onSelectExperience}
            onRemove={onRemoveExperience}
            displayValue="name"
            style={{
              searchBox: {
                border: 'none', // Corrected: Added quotes around 'none'
                fontSize: '14px', // Corrected: Added quotes around '10px'
              },
              chips: {
                // To change css chips(Selected options)
                background: '#9793b5',
              },
              optionContainer: {
                // To change css for option container
                border: '2px solid',
                background: '#bbafe8',
              },
              option: {
                // To change css for dropdown options
                color: '#5c5482',
              },
            }}
          />
        </div>
      </div>
      <RocketAnimation
        isApplying={isApplying}
        apiSuccess={apiSuccess}
        resetApiSuccess={resetApiSuccess}
      />
      <div className="flex-3/4 flex flex-col gap-5 ml-110 h-max my-10">
        {filteredJobs.map((job, index) => (
          <JobCard
            job={job}
            key={index}
            applicantEmail={authUser.email}
            isRecruiter={authUser.isRecruiter}
            setIsApplying={setIsApplying}
            setApiSuccess={setApiSuccess}
          />
        ))}
      </div>
    </main>
  );
};

export default JobListingPage;
