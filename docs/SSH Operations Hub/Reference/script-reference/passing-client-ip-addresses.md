---
title: Passing Client IP Addresses
description: Documentation for IP pool configuration flags
---

# Passing Client IP Addresses

Configure which clients SSH Operations Hub will target by specifying IP addresses for primary and secondary client
groups.

## -ip and -primary

These flags define the default IP pool. All clients in this pool use the username specified by the `-user` flag. By
default, the script prepends "10.200.142." to each number unless a different prefix is specified.

```bash
# Example Usage:

# Using the -ip flag (results in 10.200.142.1, 10.200.142.2, 10.200.142.3)
ssh-operations-hub -ip 1 2 3 -user root -cmd "hostname"

# Using a custom prefix
ssh-operations-hub -ip-prefix 192.168.1. -ip 1 2 3 -user admin -cmd "uptime"
```

:::tip
**Note:** The `-ip` and `-primary` flags are functionally identical and can be used interchangeably.
:::

## -secondary

This flag defines the secondary IP pool. Clients in this pool use the username specified by the `-suser` flag.

```bash
# Example Usage - Mixed client groups
ssh-operations-hub -primary 1 2 -user root -secondary 10 11 -suser admin -cmd "df -h"

# This will execute the command on:
# - 10.200.142.1 and 10.200.142.2 as user 'root'
# - 10.200.142.10 and 10.200.142.11 as user 'admin'
```

## IP Address Validation

SSH Operations Hub validates IP addresses against the allowed IPs defined in your configuration:

- IP octets must be within the ranges specified in `ALLOWED_IPS`
- Duplicate IP addresses are automatically removed
- Invalid IP formats are rejected with error messages

:::info Configuration
The allowed IP ranges can be customized in your [configuration file](../configuration.md).
:::

## Common Patterns

### Single Group Operation

```bash
# Target multiple clients with same user
ssh-operations-hub -ip 1 2 3 4 5 -user ubuntu -cmd "sudo apt update"
```

### Multi-Group Operation

```bash
# Different user privileges for different client groups
ssh-operations-hub -primary 1 2 -user root -secondary 20 21 22 -suser ubuntu -cmd "whoami"
```

### Custom Network Range

```bash
# Use different network segment
ssh-operations-hub -ip-prefix 172.16.0. -ip 100 101 102 -user admin -cmd "ping -c 1 google.com"
```
