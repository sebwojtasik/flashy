import Badge from "../../common/components/Badge";

const RetentionBadge = ({ retention, fontSize, children }) => {
  let color;
  if (retention >= 90) color = "#409c44";
  else if (retention >= 70) color = "#f69908";
  else color = "#e34b4b";
  return (
    <Badge style={{ backgroundColor: color, fontSize }}>
      {retention}% {children}
    </Badge>
  );
};

export default RetentionBadge;
