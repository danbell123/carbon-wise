import React from 'react';
import DesktopBackgroundImage from '../../assets/DesktopBackground.png';
import UsageContainer from '../../components/summaryWidgets/UsageContainer';

const Dashboard = () => {
  return (
    <>
    <main className="flex-1 w-full h-64 rounded-3xs bg-bg-main overflow-hidden flex flex-col items-start justify-start pt-[50px] px-[40px] pb-10 relative gap-[30px] border-[0.5px] border-solid border-card-border lg:pt-8 lg:pb-5 lg:box-border mq1050:pt-[21px] mq1050:box-border mq450:pt-5 mq450:box-border">
        <img
          className="w-full h-full absolute !m-[0] top-[0px] right-[0px] left-[0px] max-w-full overflow-hidden shrink-0 object-cover"
          alt="Background"
          src={DesktopBackgroundImage}
        />
        <section className="self-stretch overflow-hidden flex flex-col items-start justify-start gap-[10px] max-w-full z-[1] text-left text-23xl text-text-colour-primary font-body-text-medium">
          <h1 className="m-0 relative font-semibold font-rubik fontSize-h1 inline-block max-w-full">
            Good Morning Dan!
          </h1>
          <h3 className="m-0 w-[334px] relative font-normal font-rubik fontSize-h2 text-text-colour-secondary inline-block max-w-full mq450:text-base">
            Back to saving the planet
          </h3>
        </section>
      </main>
      <section className="self-stretch h-full">
        <UsageContainer />
      </section>
    </>
  );
};

export default Dashboard;
