import React from "react";
import FeatureCard from "../FeatureCard";
import NotificationCard from "../NotificationCard";

const featureCards = [
  {
    title: "Get Notified Instantly",
    description:
      "Monitor your website's uptime and receive email alerts whenever it goes down.",
    buttonLabel: "Sign Up Now",
    to: "/signup",
    zIndex: 30,
  },
  {
    title: "Easy & Reliable Monitoring",
    description:
      "Set up in seconds, and enjoy 24/7 reliable monitoring with detailed stats and alerts.",
    buttonLabel: "Get Started",
    to: "/signup",
    zIndex: 20,
  },
  {
    title: "Custom Alerts and Logs",
    description:
      "Get detailed logs and customize alerts to match your needs. Never miss an incident.",
    buttonLabel: "Learn More",
    to: "/features",
    zIndex: 10,
  },
];

const FeaturesSection = () => {
  return (
    <section className=" flex flex-col items-center px-6 md:px-20 py-20 space-y-20">
      {/* Static Top Content with Basic Features */}

      <div className="flex flex-col md:flex-row items-center gap-12 w-full max-w-7xl">
        <div className="w-full md:w-1/2">
          <img
            src="https://placehold.co/500x500?text=Image"
            alt="Decorative"
            className="w-full rounded-lg shadow-md"
          />
        </div>

        <div className="w-full md:w-1/2 space-y-10">
          <div>
            <h2 className="text-3xl font-bold border-l-4 border-black pl-4">
              Real-time Uptime Monitoring
            </h2>
            <p className="text-gray-700 mt-2">
              Receive instant alerts when your website goes down, ensuring
              minimal downtime for your online presence.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold">Email Alerts</h2>
            <p className="text-gray-700 mt-2">
              Get notified via email whenever there is an issue with your
              website's uptime, allowing you to take immediate action.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold">Simple Setup Process</h2>
            <p className="text-gray-700 mt-2">
              Easily set up the uptime monitoring service in just a few steps
              without any complicated configurations.
            </p>
          </div>
        </div>
      </div>

      {/* Feature Card with Signup Button */}

      <div className="w-full">
        <NotificationCard />
      </div>
      {/* Scroll-Stacked Cards */}
      <div className="relative max-w-7xl mx-auto flex">
        {/* Fixed Image (unchanged) */}
        <div className="hidden md:block w-1/2 sticky top-20 self-start">
          <img
            src="https://placehold.co/500x500?text=Image"
            alt="Decorative"
            className="w-full rounded-lg shadow-md"
          />
        </div>

        {/* Scrollable Cards Container */}
        <div className="w-full md:w-1/2 h-[600px] overflow-y-scroll relative">
          {featureCards.map((card, index) => (
            <div
              key={index}
              className="sticky top-0 transition-transform duration-300"
              style={{
                zIndex: featureCards.length - index,
                transform: `translateY(${index * 20}px) rotate(${
                  (index - 1) * 2
                }deg)`,
              }}
            >
              <FeatureCard
                title={card.title}
                description={card.description}
                buttonLabel={card.buttonLabel}
                to={card.to}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
