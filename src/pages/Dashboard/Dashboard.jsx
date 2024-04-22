import React, { useState, useEffect } from 'react';
import UsageContainer from '../../components/summaryWidgets/UsageContainer';
import CarbonIntensityWidget from '../../components/summaryWidgets/carbonIntensityWidget';
import CarbonIntensityPeakTimes from '../../components/summaryWidgets/carbonIntensityPeakTimes';
import ScoresSummary from '../../components/summaryWidgets/ScoresSummary';
import fetchUserData from '../../services/getUserDetails';
import { getAuth } from "firebase/auth";

const Dashboard = () => {
  const [firstName, setFirstName] = useState(''); // State to store the first name

  useEffect(() => {
    // Fetch user's first name as soon as the component mounts
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      fetchUserData(currentUser.uid).then((userData) => {
        console.log("userData.firstName: ", userData.firstName);
        setFirstName(userData.firstName); // Update state with first name
      }).catch(error => console.error("Failed to fetch user data:", error));
    }
  }, []);

  const getTimeOfDay = () => {
    const currentHour = new Date().getHours();
    let timeOfDay;

    if (currentHour >= 0 && currentHour < 12) {
      timeOfDay = "Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      timeOfDay = "Afternoon";
    } else {
      timeOfDay = "Evening";
    }

    return timeOfDay;
  };

  return (
    <div className='p-5 pt-20 sm:p-10 flex flex-col gap-10'>
      <main className="flex-1 w-full h-min rounded-3xs flex flex-col items-start justify-start relative">
        <section className="flex flex-col items-start justify-start text-text-colour-primary gap-3">
          <h1 className="text-4xl w-full m-0">
            Good {getTimeOfDay()} {firstName}!
          </h1>
          <h3 className="m-0 text-lg font-normal text-text-colour-secondary">
            Back to saving the planet
          </h3>
        </section>
      </main>
      <section className=" self-stretch flex flex-col lg:flex-row items-stretch justify-start gap-10">
        <div className='w-full lg:w-1/3 xl:w-1/3 flex flex-col z-20'>
          <UsageContainer />
        </div>
        <div className='w-full lg:w-2/3 xl:w-2/3 flex flex-col z-20'>
          <CarbonIntensityWidget />
        </div>
      </section>
      <section className="self-stretch h-min flex flex-col lg:flex-row items-start justify-start gap-10">
        <div className='w-full lg:w-1/3 xl:w-1/3 flex z-20'>
          <CarbonIntensityPeakTimes />
        </div>
        <div className='w-full lg:w-2/3 xl:w-2/3 flex z-20'>
        <ScoresSummary />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
