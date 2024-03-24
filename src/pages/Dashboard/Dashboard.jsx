import React from 'react';
import DesktopBackgroundImage from '../../assets/DesktopBackground.png';
import UsageContainer from '../../components/summaryWidgets/UsageContainer';

const Dashboard = () => {
  return (
    <>
    <main className="flex-1 w-full h-64 rounded-3xs bg-bg-main flex flex-col items-start justify-start relative">
      <img
        className="w-full h-full absolute !m-[0] top-[0px] right-[0px] left-[0px] max-w-full overflow-hidden shrink-0 object-cover"
        alt="Background"
        src={DesktopBackgroundImage}
      />
      <section className="p-5 pt-28 sm:p-10 flex flex-col items-start justify-start z-[1] text-text-colour-primary gap-3">
        <h1 className="text-4xl w-full m-0">
          Good Morning Dan!
        </h1>
        <h3 className="m-0 text-lg font-normal text-text-colour-secondary">
          Back to saving the planet
        </h3>
      </section>
    </main>
      <section className="p-5 sm:p-10 self-stretch h-min flex flex-row ithems-start justify-start gap-10">
        <div className='w-full sm:w-1/3 flex '>
          <UsageContainer />
        </div>
        <div className='w-full sm:w-2/3 flex '>
          
        </div>
      </section>
    </>
  );
};

export default Dashboard;
