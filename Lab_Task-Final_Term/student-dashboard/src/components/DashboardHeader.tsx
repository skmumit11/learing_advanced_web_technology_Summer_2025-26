import PropTypes from "prop-types";

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