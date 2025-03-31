import React, { useEffect, useState, useMemo } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import { MapPin, Briefcase, Banknote } from 'lucide-react';
import { formatDistanceToNow, parse } from 'date-fns';

const JobListingPage = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState([]);

  const [skills, setSkills] = useState([]);
  const [locations, setLocations] = useState([]);
  const [experience, setExperience] = useState([]);

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

  const jobs = useMemo(
    () => [
      {
        title: 'Frontend Developer',
        company: 'TechCorp',
        location: 'New York, NY',
        experience: '2+ years',
        salaryRange: '$70,000 - $90,000',
        skills: ['Node', 'React', 'CSS'],
        timeElapsed: '30/03/2024 12:00:00',
      },
      {
        title: 'Backend Engineer',
        company: 'CodeBase',
        location: 'San Francisco, CA',
        experience: '3+ years',
        salaryRange: '$90,000 - $110,000',
        skills: ['Node.js', 'Express', 'MongoDB'],
        timeElapsed: '29/03/2024 15:30:00',
      },
      {
        title: 'Full Stack Developer',
        company: 'InnovateX',
        location: 'Remote',
        experience: '4+ years',
        salaryRange: '$85,000 - $105,000',
        skills: ['React', 'Node.js', 'GraphQL'],
        timeElapsed: '28/03/2024 08:45:00',
      },
      {
        title: 'UI/UX Designer',
        company: 'PixelPerfect',
        location: 'Los Angeles, CA',
        experience: '2+ years',
        salaryRange: '$60,000 - $80,000',
        skills: ['Figma', 'Sketch', 'Adobe XD'],
        timeElapsed: '27/03/2024 18:20:00',
      },
      {
        title: 'Data Scientist',
        company: 'AI Labs',
        location: 'Boston, MA',
        experience: '5+ years',
        salaryRange: '$110,000 - $130,000',
        skills: ['Python', 'TensorFlow', 'Pandas'],
        timeElapsed: '25/03/2024 09:10:00',
      },
      {
        title: 'DevOps Engineer',
        company: 'CloudSync',
        location: 'Austin, TX',
        experience: '3+ years',
        salaryRange: '$95,000 - $115,000',
        skills: ['Docker', 'Kubernetes', 'AWS'],
        timeElapsed: '26/03/2024 14:05:00',
      },
      {
        title: 'Product Manager',
        company: 'Visionary',
        location: 'Seattle, WA',
        experience: '6+ years',
        salaryRange: '$100,000 - $140,000',
        skills: ['Agile', 'Scrum', 'JIRA'],
        timeElapsed: '28/03/2024 11:15:00',
      },
      {
        title: 'Cybersecurity Analyst',
        company: 'SecureNet',
        location: 'Washington, DC',
        experience: '3+ years',
        salaryRange: '$85,000 - $100,000',
        skills: ['Network Security', 'SIEM', 'Ethical Hacking'],
        timeElapsed: '30/03/2024 07:50:00',
      },
      {
        title: 'Mobile App Developer',
        company: 'AppWorks',
        location: 'Denver, CO',
        experience: '2+ years',
        salaryRange: '$75,000 - $95,000',
        skills: ['Flutter', 'React Native', 'Swift'],
        timeElapsed: '22/03/2024 16:30:00',
      },
      {
        title: 'Machine Learning Engineer',
        company: 'DeepTech',
        location: 'San Diego, CA',
        experience: '4+ years',
        salaryRange: '$120,000 - $150,000',
        skills: ['Python', 'PyTorch', 'NLP'],
        timeElapsed: '29/03/2024 13:40:00',
      },
    ],
    []
  );

  const [filteredJobs, setFilteredJobs] = useState(jobs);

  useEffect(() => {
    const extractCategories = (jobs) => {
      const skillsSet = new Set();
      const locationSet = new Set();
      const experienceSet = new Set();

      jobs.forEach((job) => {
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
    extractCategories(jobs);
  }, [jobs]);

  useEffect(() => {
    const filterJobs = () => {
      setFilteredJobs(
        jobs.filter((job) => {
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
    filterJobs(jobs);
  }, [selectedSkills, selectedLocations, selectedExperience, jobs]);

  return (
    <main className="mt-10">
      <div className="fixed w-100 flex flex-col gap-5 p-8 rounded-2xl shadow-[inset_0px_0px_5px_1px_#f7fafc90]">
        <div>
          <h3>Skills</h3>
          <Multiselect
            options={skills}
            selectedValues={selectedSkills}
            onSelect={onSelectSkills}
            onRemove={onRemoveSkills}
            displayValue="name"
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
          />
        </div>
      </div>
      <div className="flex-3/4 flex flex-col gap-5 ml-110 h-max my-10">
        {filteredJobs.map((job, index) => (
          <JobCard job={job} key={index} />
        ))}
      </div>
    </main>
  );
};

export default JobListingPage;

const JobCard = ({ job }) => {
  function timeAgo(dateString) {
    const parsedDate = parse(dateString, 'dd/MM/yyyy HH:mm:ss', new Date());
    return formatDistanceToNow(parsedDate, { addSuffix: true });
  }

  return (
    <div className="p-5 rounded-2xl shadow-[inset_0px_0px_5px_1px_#f7fafc90] flex flex-col gap-3">
      <div>
        <h3 className="mb-1 text-lg">{job.title}</h3>
        <h4 className="text-sm text-[#bbafe8]">{job.company}</h4>
      </div>
      <div className="flex gap-6">
        <div className="flex gap-1 text-sm items-center">
          <div className="bg-[#bbafe840] p-1 rounded-xl">
            <MapPin size={20} />
          </div>
          {job.location}
        </div>
        <div className="flex gap-1 text-sm items-center">
          <div className="bg-[#bbafe840] p-1 rounded-xl">
            <Briefcase size={20} />
          </div>
          {job.experience}
        </div>
        <div className="flex gap-1 text-sm items-center">
          <div className="bg-[#bbafe840] p-1 rounded-xl">
            <Banknote size={20} />
          </div>
          {job.salaryRange}
        </div>
      </div>
      <ul className="flex gap-2">
        {job.skills.map((skill, index) => (
          <li
            key={index}
            className="text-sm px-1 py-0.5 bg-[#9793b5] rounded-lg"
          >
            {skill}
          </li>
        ))}
      </ul>

      <div className="text-sm">{timeAgo(job.timeElapsed)}</div>
    </div>
  );
};
