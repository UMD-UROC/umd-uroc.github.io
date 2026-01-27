import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header
      className={clsx('hero hero--primary', styles.heroBanner)}
      style={{
        backgroundImage: 'url("https://uroc.umd.edu/sites/uroc.umd.edu/files/DSC_0667_0.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '80vh', // Make the hero image taller to fill more of the page
      }}
    >
      <div className="container">
        <Heading as="h1" className="hero__title" style={{ color: 'white' }}>
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle" style={{ color: 'white' }}>
          {siteConfig.tagline}
        </p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="https://uroc.umd.edu">
            Learn More About UROC
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
    </Layout>
  );
}
