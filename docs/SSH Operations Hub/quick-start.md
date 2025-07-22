---
title: Quick Start
description: Get started with SSH Operations Hub in minutes
---

# Quick Start

Get SSH Operations Hub up and running in just a few minutes with this step-by-step guide.

## Prerequisites

- Ubuntu Desktop 22.04 LTS (only tested environment)
- SSH access to target clients
- Basic familiarity with command line operations

## Installation

For optimal interaction with the script, please follow the installation instructions below:

### Ubuntu 22.04 LTS

```bash
# Install via Curl
mkdir -p ~/.config/ssh-operations-hub
curl -O https://raw.githubusercontent.com/UMD-UROC/SSH-Operations-Hub-Script/refs/heads/main/scripts/ssh-operations-hub.bash
curl -s https://raw.githubusercontent.com/UMD-UROC/SSH-Operations-Hub-Script/main/scripts/install.bash | bash
curl -O --output-dir ~/.config/ssh-operations-hub https://raw.githubusercontent.com/UMD-UROC/SSH-Operations-Hub-Script/refs/heads/main/config/defaults.conf
```

:::warning Important
**Important:** This script has only been tested on Ubuntu Desktop 22.04 LTS.
:::

:::danger Security Notice
**Security Notice:** For security-conscious users, it is recommended that you review the installation script source code
and execute the commands manually.
:::

## Your First Command

Now that you have SSH Operations Hub installed, let's execute your first multi-client command:

```bash
# This command will connect to 10.200.142.1, 10.200.142.2, and 10.200.142.3
ssh-operations-hub -ip 1 2 3 -user root -cmd "echo Client \$CLIENT_NUM ready"
```

:::tip Variable Substitution
**Tip:** Each client gets assigned a `$CLIENT_NUM` variable that represents its position in the IP list (starting from
1). This is useful for creating unique identifiers per client.
:::

### Understanding the Command

Let's break down what this command does:

- `-ip 1 2 3` - Specifies IP addresses (automatically prefixed with 10.200.142.)
- `-user root` - SSH username for all specified clients
- `-cmd "echo Client \$CLIENT_NUM ready"` - Command to execute on each client

:::info IP Prefixes
**Note:** The `-ip` flag automatically appends the default IP prefix (10.200.142.) to the provided IP octets. To use a
different prefix, specify it using the `-ip-prefix` flag, for example: `-ip-prefix 192.168.1`
:::

:::warning Command Limitations
**Note:** Interactive commands are not supported by this script. For more information about command compatibility,
please refer to
the ["Passing Command To Be Run On Client"](Reference/script-reference/passing-command-to-be-run-on-client.md) section.
:::

## Next Steps

Congratulations! You've successfully executed your first SSH Operations Hub command. Here's what to explore next:

### Learn More About Available Options

- **[Script Reference](Reference/script-reference/README.md)** - Complete documentation of all flags and options
- **[Configuration](Reference/configuration.md)** - Customize default settings

### Common Use Cases

Try these example commands to explore more functionality:

```bash
# Using a custom IP prefix
ssh-operations-hub -ip-prefix 192.168.1 -ip 10 11 12 -user admin -cmd "uptime"

# Using both primary and secondary client groups
ssh-operations-hub -primary 1 2 -user root -secondary 5 6 -suser admin -cmd "hostname"
```

**For detailed information about available commands and advanced usage, consult
the [Script Reference](Reference/script-reference/README.md) documentation.**
