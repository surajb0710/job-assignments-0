import React from 'react';
import { FileText, Linkedin, Goal, Workflow } from 'lucide-react';

const WeDoEverything = ({ targetRef, onNavigate }) => {
  return (
    <div className="flex flex-col items-center rounded-4xl gap-y-10 py-10 px-20 mt-20">
      <h2 className="text-4xl text-center">We Do Everything For You!</h2>
      <p className="text-center">
        Looking for your next big career move? Relax - We will handle it all!
      </p>
      <div className="grid grid-cols-3 grid-rows-2 gap-5">
        <div className="col-start-1 col-end-2 row-start-1 row-end-2">
          <Card1
            title="Craft a Standout Resume"
            description="Stand out with a professionally designed, tailor-made resume."
          >
            <FileText />
          </Card1>
        </div>
        <div className="col-start-2 col-end-3 row-start-1 row-end-2">
          <Card1
            title="LinkedIn Profile Enhancement"
            description="Optimize your LinkedIn to attract top recruiters."
          >
            <Linkedin />
          </Card1>
        </div>
        <div className="col-start-3 col-end-4 row-start-1 row-end-2">
          <Card1
            title="Automated Job Applications"
            description="Let automation work for you, apply to jobs without lifting a finger"
          >
            <Goal />
          </Card1>
        </div>
        <div className="col-start-1 col-end-2 row-start-2 row-end-3">
          <Card1
            title="Personalized Career Advice"
            description="Receive guidance tailored to your goals, plus interview prep and insider tips."
          >
            <Workflow />
          </Card1>
        </div>
        <div className="col-start-2 col-end-4 row-start-2 row-end-3">
          <div className="h-full flex flex-col justify-between gap-4 p-6 rounded-2xl bg-[#bbafe850] shadow-[inset_0px_0px_10px_1px_#f7fafc90]">
            <p className="text-3xl">Take Stress out of job hunting</p>
            <p>
              Join our accelerator program and focus on your future while we
              handle the hard work.
            </p>
            <button
              onClick={() => onNavigate(targetRef)}
              className="w-max text-base bg-[#bbafe8] text-[#1b1c1c] px-5 h-12 rounded-[24px] shadow-[inset_0px_0px_10px_1px_#f7fafc90] cursor-pointer"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeDoEverything;

const Card1 = ({ title, description, children }) => {
  return (
    <div className="group h-full flex flex-col gap-4 p-6 rounded-2xl hover:bg-[#bbafe840] shadow-[inset_0px_0px_10px_1px_#f7fafc90]">
      <div className="p-2 rounded-xl bg-[#bbafe840] group-hover:bg-[#eae7f8] h-10 w-10">
        {children}
      </div>
      <p className="text-2xl">{title}</p>
      <p>{description}</p>
    </div>
  );
};
