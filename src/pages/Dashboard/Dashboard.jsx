import React from 'react';
import DesktopBackgroundImageDark from '../../assets/DesktopBackground.png';
import DesktopBackgroundImageLight from '../../assets/DesktopBackgroundLight.jpg';
import UsageContainer from '../../components/summaryWidgets/UsageContainer';
import CarbonIntensityWidget from '../../components/summaryWidgets/carbonIntensityWidget';
import CarbonIntensityPeakTimes from '../../components/summaryWidgets/carbonIntensityPeakTimes';
import ScoresSummary from '../../components/summaryWidgets/ScoresSummary';
import { useTheme } from '../../contexts/themeContext';

const Dashboard = () => {
  const { theme, setTheme } = useTheme("");

  return (
    <>
    <main className="flex-1 w-full h-96 rounded-3xs flex flex-col items-start justify-start relative">
      <section className="p-5 pt-28 sm:p-10 flex flex-col items-start justify-start z-[1] text-text-colour-primary gap-3">
        <h1 className="text-4xl w-full m-0">
          Good Morning Dan!
        </h1>
        <h3 className="m-0 text-lg font-normal text-text-colour-secondary">
          Back to saving the planet
        </h3>
      </section>
    </main>
    <section className="-mt-0 sm:-mt-64 p-5 sm:p-10 self-stretch flex flex-col lg:flex-row items-stretch justify-start gap-10">
      <div className='w-full lg:w-1/3 xl:w-1/3 flex flex-col z-20'>
        <UsageContainer />
      </div>
      <div className='w-full lg:w-2/3 xl:w-2/3 flex flex-col z-20'>
        <CarbonIntensityWidget />
      </div>
    </section>
    <section className=" p-5 sm:p-10 self-stretch h-min flex flex-col lg:flex-row items-start justify-start gap-10">
      <div className='w-full lg:w-1/3 xl:w-1/3 flex z-20'>
        <CarbonIntensityPeakTimes />
      </div>
      <div className='w-full lg:w-2/3 xl:w-2/3 flex z-20'>
      <ScoresSummary />
      </div>
    </section>

    </>
  );
};

export default Dashboard;
