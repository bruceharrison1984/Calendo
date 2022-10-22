import HomepageFeatures from '@site/src/components/HomepageFeatures';
import HomepageSchedulely from '../components/HomepageSchedulely/HomepageSchedulely';
import Layout from '@theme/Layout';
import React from 'react';
import clsx from 'clsx';
import styles from './index.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title" style={{ marginBottom: '-0.1em' }}>
          {siteConfig.title}
        </h1>
        <p>The extremely tiny, super-responsize calendar</p>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} documentation`}
      description="Documentation for the Schedulely React component"
    >
      <HomepageHeader />
      <main>
        <div style={{ height: '40em', marginBottom: '2.5em' }}>
          <HomepageSchedulely />
        </div>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
