import PropTypes from "prop-types";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { StudentContext } from "../context/StudentContext";

interface NavigationItem {
  label: string;
  targetId: string;
}

interface DashboardHeaderProps {
  title: string;
  tagline: string;
  navigationItems: NavigationItem[];
}

function DashboardHeader({
  title,
  tagline,
  navigationItems,
}: DashboardHeaderProps) {
  const themeContext = useContext(ThemeContext);
  const studentContext = useContext(StudentContext);

  if (!themeContext || !studentContext) {
    throw new Error("Contexts must be used within their Providers");
  }

  const { theme, toggleTheme } = themeContext;
  const { favoriteCount } = studentContext;

  function navigateToSection(targetId: string) {
    const section = document.getElementById(targetId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  }

  return (
    <header className="dashboard-header">
      <div className="container dashboard-header__content">
        <div className="dashboard-header__brand">
          <span
            className="dashboard-header__logo"
            aria-hidden="true"
          >
            SD
          </span>

          <span>
            <span className="dashboard-header__title">
              {title}
            </span>

            <span className="dashboard-header__tagline">
              {tagline}
            </span>
          </span>
        </div>

        <nav
          className="dashboard-navigation"
          aria-label="Dashboard navigation"
        >
          <ul className="dashboard-navigation__list">
            {navigationItems.map((item) => (
              <li key={item.targetId}>
                <button
                  type="button"
                  className="dashboard-navigation__link"
                  onClick={() =>
                    navigateToSection(item.targetId)
                  }
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              type="button"
              className="dashboard-navigation__link"
              onClick={toggleTheme}
              style={{ padding: '0.4rem', border: '1px solid var(--color-border)' }}
            >
              {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>
            <div className="dashboard-header__favorites">
              ★ Favorites: {favoriteCount}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

DashboardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,

  navigationItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      targetId: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default DashboardHeader;