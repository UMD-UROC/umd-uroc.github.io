import mavOverview from "./content/mavinsight/overview.md?raw";
import mavSetup from "./content/mavinsight/setup.md?raw";
import sshOverview from "./content/ssh/overview.md?raw";
import sshQuickStart from "./content/ssh/quick-start.md?raw";
import sshContents from "./content/ssh/contents.md?raw";
import sshConfiguration from "./content/ssh/reference/configuration.md?raw";
import sshReference from "./content/ssh/reference/script-reference/README.md?raw";
import sshIps from "./content/ssh/reference/script-reference/passing-client-ip-addresses.md?raw";
import sshPrefix from "./content/ssh/reference/script-reference/passing-client-ip-prefix.md?raw";
import sshUsers from "./content/ssh/reference/script-reference/passing-client-user-names.md?raw";
import sshCommand from "./content/ssh/reference/script-reference/passing-command-to-be-run-on-client.md?raw";
import standards from "./content/development-standards.md?raw";

export type Page = {
  path: string;
  title: string;
  description: string;
  group: "MAVInsight" | "SSH Operations Hub" | "UROC";
  source: string;
  markdown: string;
};

export const pages: Page[] = [
  {
    path: "/projects/mavinsight",
    title: "MAVInsight",
    description: "Live MAVLink data visualization for PX4 and ROS 2.",
    group: "MAVInsight",
    source: "MAVInsight.md",
    markdown: mavOverview,
  },
  {
    path: "/projects/mavinsight/setup",
    title: "Installation & setup",
    description: "Set up PX4, MAVROS, QGroundControl, and your visualization tools.",
    group: "MAVInsight",
    source: "MAVInsight/Setup.md",
    markdown: mavSetup,
  },
  {
    path: "/projects/ssh-operations-hub",
    title: "SSH Operations Hub",
    description: "Run commands across multiple SSH clients from one place.",
    group: "SSH Operations Hub",
    source: "SSH Operations Hub.md",
    markdown: sshOverview,
  },
  {
    path: "/projects/ssh-operations-hub/quick-start",
    title: "Quick start",
    description: "Install the script and run your first multi-client command.",
    group: "SSH Operations Hub",
    source: "SSH Operations Hub/quick-start.md",
    markdown: sshQuickStart,
  },
  {
    path: "/projects/ssh-operations-hub/contents",
    title: "Documentation map",
    description: "Find the right SSH Operations Hub guide.",
    group: "SSH Operations Hub",
    source: "SSH Operations Hub/SUMMARY.md",
    markdown: sshContents,
  },
  {
    path: "/projects/ssh-operations-hub/reference/configuration",
    title: "Configuration",
    description: "Customize IP prefixes and allowed client addresses.",
    group: "SSH Operations Hub",
    source: "SSH Operations Hub/Reference/configuration.md",
    markdown: sshConfiguration,
  },
  {
    path: "/projects/ssh-operations-hub/reference/script-reference",
    title: "Script reference",
    description: "A quick reference for every script flag.",
    group: "SSH Operations Hub",
    source: "SSH Operations Hub/Reference/script-reference/README.md",
    markdown: sshReference,
  },
  {
    path: "/projects/ssh-operations-hub/reference/script-reference/client-ip-addresses",
    title: "Client IP addresses",
    description: "Target primary and secondary client groups.",
    group: "SSH Operations Hub",
    source: "SSH Operations Hub/Reference/script-reference/passing-client-ip-addresses.md",
    markdown: sshIps,
  },
  {
    path: "/projects/ssh-operations-hub/reference/script-reference/client-ip-prefix",
    title: "Client IP prefix",
    description: "Choose a network prefix for client connections.",
    group: "SSH Operations Hub",
    source: "SSH Operations Hub/Reference/script-reference/passing-client-ip-prefix.md",
    markdown: sshPrefix,
  },
  {
    path: "/projects/ssh-operations-hub/reference/script-reference/client-user-names",
    title: "Client user names",
    description: "Set SSH usernames for each client group.",
    group: "SSH Operations Hub",
    source: "SSH Operations Hub/Reference/script-reference/passing-client-user-names.md",
    markdown: sshUsers,
  },
  {
    path: "/projects/ssh-operations-hub/reference/script-reference/command-to-run",
    title: "Command to run",
    description: "Pass commands and substitute client numbers.",
    group: "SSH Operations Hub",
    source: "SSH Operations Hub/Reference/script-reference/passing-command-to-be-run-on-client.md",
    markdown: sshCommand,
  },
  {
    path: "/development-standards",
    title: "Development standards",
    description: "Shared version control, workflow, code style, and documentation practices.",
    group: "UROC",
    source: "development-standards.md",
    markdown: standards,
  },
];
