import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function EnvExport() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div>
      <code>{`${siteConfig.customFields.baseUrl}`}</code>
    </div>
  )
}
