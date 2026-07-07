import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

export default function Home() {
  return (
    <Layout
      title="E2E on Rails"
      description="The Rails test bridge for Cypress and Playwright."
    >
      <main className="home">
        <section className="hero">
          <div className="hero__inner">
            <div className="hero__brand">
              <img
                className="hero__mark"
                src="/img/icon-tile.svg"
                alt="E2E on Rails"
              />
              <p className="hero__eyebrow">Cypress + Playwright on Rails</p>
            </div>
            <h1>E2E browser tests for Rails.</h1>
            <p className="hero__copy">
              Use Cypress or Playwright with Rails scenarios, factories,
              fixtures, app commands, VCR, and clean test data.
            </p>
            <div className="hero__actions">
              <Link className="button button--primary button--lg" to="/docs/getting-started">
                Read the docs
              </Link>
              <Link
                className="button button--secondary button--lg"
                to="https://github.com/shakacode/cypress-playwright-on-rails"
              >
                GitHub
              </Link>
            </div>
          </div>
        </section>

        <section className="features">
          <article>
            <h2>Rails-side state</h2>
            <p>
              Keep factories, fixtures, scenarios, and cleanup in Ruby where
              Rails teams can maintain them.
            </p>
          </article>
          <article>
            <h2>Two browser runners</h2>
            <p>
              Use Cypress or Playwright without duplicating the Rails bridge
              that prepares app state.
            </p>
          </article>
          <article>
            <h2>Clean test data</h2>
            <p>
              Reset state and call explicit app commands so browser specs stay
              focused on user-visible behavior.
            </p>
          </article>
        </section>
      </main>
    </Layout>
  );
}
