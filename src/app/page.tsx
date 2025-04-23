import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Head>
        <title>PakSafe - Secure Your NPM Dependencies</title>
        <meta name="description" content="Scan your NPM package dependencies for security vulnerabilities with PakSafe." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className=" bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 flex flex-col items-center justify-center text-center">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">🛡️ Proactive Security</h2>
        <p className="text-md text-gray-500 dark:text-gray-400">
          Identify and address vulnerabilities in your NPM dependencies.
        </p>
        <Link href="/features" className="mt-4 text-primary-600 hover:underline dark:text-primary-500">Learn More</Link>
      </div>

      <div className=" bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 flex flex-col items-center justify-center text-center">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">🔍 Confusion & CVE Detection</h2>
        <p className="text-md text-gray-500 dark:text-gray-400">
          Detect dependency confusion attacks and known CVEs.
        </p>
        <Link href="/usage" className="mt-4 text-primary-600 hover:underline dark:text-primary-500">Explore Usage</Link>
      </div>

      <div className=" bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 flex flex-col items-center justify-center text-center">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">🚀 Easy Integration</h2>
        <p className="text-md text-gray-500 dark:text-gray-400">
          Simple command-line tool for your workflows.
        </p>
        <Link href="/installation" className="mt-4 text-primary-600 hover:underline dark:text-primary-500">Installation</Link>
      </div>

      <div className=" bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 flex flex-col items-center justify-center text-center">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">✨ Stay Secure</h2>
        <p className="text-md text-gray-500 dark:text-gray-400">
          Keep your projects safe and reliable.
        </p>
        <Link href="/documentation" className="mt-4 text-primary-600 hover:underline dark:text-primary-500">Documentation</Link>
      </div>
    </div>
  );
}