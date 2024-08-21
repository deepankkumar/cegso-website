import React from 'react';
import Layout from '../components/layout'; // Adjust the import path as needed

const JoinPage: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold mb-8">Join CEGSO</h1>
        <div className="w-full max-w-4xl">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdL5igoIoOmkGziKZU6F69enYVjui4PAZsXMbY_7sVP8SauJw/viewform?embedded=true"
            className="w-full h-screen"

          >
            Loading…
          </iframe>
        </div>
      </div>
    </Layout>
  );
};

export default JoinPage;