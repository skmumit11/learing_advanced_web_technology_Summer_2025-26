import PropTypes from "prop-types";

type StatBadgeVariant =
  | "default"
  | "primary"
  | "success";

interface StatBadgeProps {
  label: string;
  value: string | number;
  variant?: StatBadgeVariant;
}

function StatBadge({
  label,
  value,
  variant = "default",
}: StatBadgeProps) {
  return (
    <div
      className={`stat-badge stat-badge--${variant}`}
    >
      <span className="stat-badge__label">
        {label}
      </span>

      <strong className="stat-badge__value">
        {value}
      </strong>
    </div>
  );
}

StatBadge.propTypes = {
  label: PropTypes.string.isRequired,

  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,

  variant: PropTypes.oneOf([
    "default",
    "primary",
    "success",
  ]),
};

export default StatBadge;
