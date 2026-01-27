---
title: Script Reference
description: Complete Reference for all SSH Operations Hub script flags and options
---

# Script Reference

This reference guide provides detailed documentation for all SSH Operations Hub script flags and options. Each section
includes examples, best practices, and common use cases.

## Flag Categories

### IP Address Management

Configure which clients to target and how to connect to them.

**[-ip / -primary & -secondary](passing-client-ip-addresses.md)**
Define primary and secondary IP pools for client targeting.

**[-ip-prefix](passing-client-ip-prefix.md)**
Customize the IP address prefix used for client connections.

### User Authentication

Specify SSH usernames for different client groups.

**[-puser / -user & -suser](passing-client-user-names.md)**
Configure SSH usernames for primary and secondary client groups.

### Command Execution

Define what commands to run on your target clients.

**[-cmd](passing-command-to-be-run-on-client.md)**
Specify commands to execute across multiple clients with variable substitution support.

## Quick Reference

| Flag               | Description               | Example                |
| ------------------ | ------------------------- | ---------------------- |
| `-ip` / `-primary` | Primary client IPs        | `-ip 1 2 3`            |
| `-secondary`       | Secondary client IPs      | `-secondary 10 11`     |
| `-ip-prefix`       | Custom IP prefix          | `-ip-prefix 192.168.1` |
| `-user` / `-puser` | Primary client username   | `-user root`           |
| `-suser`           | Secondary client username | `-suser admin`         |
| `-cmd`             | Command to execute        | `-cmd "uptime"`        |

## Common Usage Patterns

### Basic Multi-Client Command

```bash
ssh-operations-hub -ip 1 2 3 -user root -cmd "hostname"
```

### Mixed User Groups

```bash
ssh-operations-hub -primary 1 2 -user root -secondary 10 11 -suser admin -cmd "uptime"
```

### Custom Network Range

```bash
ssh-operations-hub -ip-prefix 192.168.1 -ip 50 51 52 -user ubuntu -cmd "df -h"
```
