import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

const Curious = () => {
  const [show, setShow] = useState({});

  const toggleShow = (index) => {
    setShow((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const faqs = [
    {
      question:
        'I am a junior/mid-level/senior developer. Is this program for me?',
      answer:
        'Yes, this program is for everyone. Whether you are a junior developer looking to get your first job, or a senior developer looking to get a better job, this program is for you. We have helped developers of all levels get the job they want.',
    },
    {
      question: 'You apply to jobs for me?',
      answer:
        'Yes! We have a state-of-the-art AI that applies to hundreds of jobs a day, basically guaranteeing you a job!',
    },
    {
      question: 'How long does it take to get a job with this program?',
      answer:
        'We have seen candidates get a job in less than 2 weeks after being accepted. On average it takes around a month!',
    },
    {
      question: 'What does Persist Ventures get?',
      answer: `We get 15% of your salary from your new job, for 2 years, only once you find a job. If you don't find a job, you owe nothing. Compare this to a university, where you have to pay thousands upfront just to get a piece of paper that MIGHT get you a job. It's a no-brainer!`,
    },
  ];

  return (
    <div className="flex flex-col items-center rounded-4xl gap-y-10 py-10 relative w-full">
      <h2 className="text-4xl text-center">Curious? We've Got Answers!</h2>
      <div className="w-full">
        {faqs.map((faq, index) => (
          <FAQ
            key={index}
            index={index}
            question={faq.question}
            answer={faq.answer}
            showAnswer={show[index] || false}
            toggleShow={toggleShow}
          />
        ))}
      </div>
    </div>
  );
};

export default Curious;

const FAQ = ({ question, answer, showAnswer, toggleShow, index }) => {
  return showAnswer ? (
    <div>
      <div className="flex items-center gap-5 px-10 py-10 rounded-t-2xl bg-[#7c749e] my-5">
        <p className="text-4xl self-start">0{index + 1}</p>
        <div className="flex flex-col gap-5 grow">
          <p className="text-left">{question}</p>
          <p className="">{answer}</p>
        </div>
        <div
          className="cursor-pointer rounded-full bg-[#bbafe840] p-2 self-start"
          onClick={() => toggleShow(index)}
        >
          <EyeOff size={24} />
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div className="flex items-center justify-between gap-5 px-10 py-5 rounded-2xl">
        <p className="text-4xl text-[#9793b5]">0{index + 1}</p>
        <p className="mr-auto  grow">{question} </p>
        <div
          className="cursor-pointer rounded-full bg-[#bbafe840] p-2"
          onClick={() => toggleShow(index)}
        >
          <Eye size={24} />
        </div>
      </div>
      <hr className="my-5 h-0.5 text-[#544c7c] bg-[#544c7c]" />
    </div>
  );
};
