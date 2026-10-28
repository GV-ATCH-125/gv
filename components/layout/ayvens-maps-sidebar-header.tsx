type Props = {
  title?: string;
  subtitle?: string;
};

export default function AyvensMapsSidebarHeader({
  title = "Partner Finder",
  subtitle = "Find a service partner near you",
}: Props) {
  return (
    <header className="sb-header">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  );
}
