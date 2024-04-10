import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Animation variants for the accordion content
  const contentVariants = {
    hidden: { 
      opacity: 0,
      height: 0 
    },
    visible: { 
      opacity: 1,
      height: 'auto',
      transition: { 
        duration: 0.4,
        ease: 'backIn'
      }
    },
  };

  // Chevron rotation animation
  const chevronVariants = {
    rotated: { rotate: 180 },
    normal: { rotate: 0 },
  };

  return (
    <div className="bg-bg-main-transparent glassEffectNoShadow box-border border border-white backdrop-blur-sm w-full p-5 rounded-xl shadow-md">
      <button
        className="py-2 w-full px-0 text-left flex gap-2 justify-between items-center bg-transparent"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold text-text-colour-primary">{question}</span>
        <motion.span
          className="material-symbols-outlined text-text-colour-secondary"
          initial={false}
          animate={isOpen ? "rotated" : "normal"}
          variants={chevronVariants}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          expand_more
        </motion.span>
      </button>
      <motion.div
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        variants={contentVariants}
      >
        <p className="pt-2 text-base text-text-colour-primary">{answer}</p>
      </motion.div>
    </div>
  );
};

// The FAQPage component
function FAQPage() {
  // Dummy questions and answers
  const faqs = [
    {   question: "What is CarbonWise?", 
        answer: "CarbonWise is a web application designed to help UK households manage and reduce their carbon footprint through intelligent energy consumption. It provides real-time, regional-based carbon intensity data from the UK grid, empowering users to make environmentally responsible energy consumption decisions."
    },
    {   question: "Why was CarbonWise created?", 
        answer: "With the UK committed to becoming net-zero by 2050, there's a pressing need for innovative solutions to reduce carbon emissions. CarbonWise addresses the absence of user-friendly tools that display carbon intensity in an actionable manner, enabling individuals to contribute to this national goal by making informed energy consumption choices."
    },
    {   question: "How does CarbonWise work?", 
        answer: "CarbonWise combines your household energy usage data with real-time carbon intensity information of the UK electricity grid. Users receive personalized insights and forecasts on the best times to use or save energy, based on when the grid is most sustainable."
    },
    {   question: "How does CarbonWise calculate my carbon score?", 
        answer: "The app uses a carbon scoring algorithm that evaluates your household energy consumption against the real-time carbon intensity data of the electricity grid. This score helps users understand their impact and guides them towards reducing their carbon footprint by shifting energy use to low-carbon periods."
    },
    {   question: "Can CarbonWise forecast low carbon intensity periods?", 
        answer: "Yes, one of the core features of CarbonWise is its ability to forecast periods of low carbon intensity. This allows users to plan their energy consumption more effectively, such as scheduling high-energy tasks during times when the grid is greener."
    },
    {   question: "How secure is my data with CarbonWise?", 
        answer: "CarbonWise is committed to user privacy and data protection. We adhere to GDPR and other relevant legislation, ensuring all user data is securely stored and processed. Consent mechanisms are in place for all data collection, with a strong focus on anonymization to protect user identities."
    },
    {   question: "How can I start using CarbonWise?", 
        answer: "Simply visit the CarbonWise website and sign up for an account. Once registered, you'll recive your energy monitor in the post. Once it's set up you start receiving personalized insights and carbon intensity scores."
    },
    {   question: "Is CarbonWise free to use?", 
        answer: "Simply visit the CarbonWise website and sign up for an account. Once registered, you'll recive your energy monitor in the post. Once it's set up you start receiving personalized insights and carbon intensity scores."
    },
    {   question: "How can I provide feedback or suggest features for CarbonWise?", 
        answer: "We value user feedback and suggestions. You can contact us directly through the feedback form on our website or by emailing support@carbonwise.uk. Your input helps us improve and expand our services."
    },
  ];

  return (
    <div className="p-5 pt-20 sm:p-10 flex flex-col gap-4">
      <h1 className="text-4xl w-full m-0 text-text-colour-primary">Frequently Asked Questions</h1>
      <p className="text-base pt-2 text-text-colour-secondary">
        Some FAQ's to help you understand CarbonWise better. If you have any other questions, feel free to reach out to us at support@carbonwise.uk.
      </p>

      {/* Accordion items */}
      <div className="flex flex-col gap-2 pt-5">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
}

export default FAQPage;
