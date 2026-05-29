---
layout: post
title: "Automating Linux Administration with Bash: Three Scripts I Use Daily"
date: 2026-05-29
author: Aakash Budhathoki
tags: [Linux, Bash, Automation, SysAdmin]
excerpt: >
  Bash scripting is the backbone of Linux automation. In this post I walk through
  three practical scripts I use daily — system health checks, automated backups
  with rotation, and a user onboarding helper.
---

Bash scripting is one of the most powerful tools in a system administrator's toolkit.
Once you stop running the same commands manually and start automating them,
your productivity changes completely.

Here are three Bash scripts I reach for regularly. Each solves a real, recurring sysadmin problem.

---

## 1. System Health Check

Running a quick sanity check on a server should take one command, not ten.
This script collects the most useful metrics and prints a clean report:

```bash
#!/bin/bash
# health-check.sh — Quick system health snapshot

HOSTNAME=$(hostname)
DATE=$(date +"%Y-%m-%d %T")
LOAD=$(uptime | awk -F'load average:' '{print $2}' | xargs)
MEM_USED=$(free -h | awk '/^Mem:/ {print $3 "/" $2}')
DISK_USED=$(df -h / | awk 'NR==2 {print $5 " used (" $3 "/" $2 ")"}')
FAILED_SERVICES=$(systemctl --failed --no-legend | wc -l)

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  System Health: $HOSTNAME"
echo "  $DATE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Load avg:   $LOAD"
echo "  Memory:     $MEM_USED"
echo "  Disk (/):   $DISK_USED"
echo "  Failed svc: $FAILED_SERVICES"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ "$FAILED_SERVICES" -gt 0 ]; then
  echo "  ⚠ Failed services:"
  systemctl --failed --no-legend
fi
```

Make it executable and drop it into cron for a daily report:

```bash
chmod +x health-check.sh

# Run every morning at 8am, append to a log
0 8 * * * /opt/scripts/health-check.sh >> /var/log/health.log 2>&1
```

---

## 2. Automated Backup with 7-Day Rotation

Backups without rotation fill your disk. This script archives a target directory and
automatically removes archives older than your retention window:

```bash
#!/bin/bash
# backup.sh — Daily backup with configurable retention

SOURCE_DIR="/var/www/html"
BACKUP_DIR="/backups"
RETENTION_DAYS=7
DATE=$(date +%Y-%m-%d)
ARCHIVE="$BACKUP_DIR/backup-$DATE.tar.gz"

# Ensure backup dir exists
mkdir -p "$BACKUP_DIR"

# Create compressed archive
tar -czf "$ARCHIVE" "$SOURCE_DIR" 2>/dev/null
echo "[$(date)] Created: $ARCHIVE"

# Prune old archives
find "$BACKUP_DIR" -name "backup-*.tar.gz" -mtime +"$RETENTION_DAYS" -delete
echo "[$(date)] Pruned archives older than ${RETENTION_DAYS} days"
```

Schedule it nightly:

```bash
0 2 * * * /opt/scripts/backup.sh >> /var/log/backup.log 2>&1
```

> Change `RETENTION_DAYS` and `SOURCE_DIR` at the top — no need to touch the logic.

---

## 3. Staff Onboarding: Create a User with a Forced Password Reset

When a new employee joins, this script creates their account and ensures they set
their own password on first login — no sharing of known passwords:

```bash
#!/bin/bash
# onboard.sh — Create a user with a temporary password

USERNAME="$1"
TEMP_PASS="Welcome@$(date +%Y)!"

if [ -z "$USERNAME" ]; then
  echo "Usage: $0 <username>"
  exit 1
fi

if id "$USERNAME" &>/dev/null; then
  echo "User '$USERNAME' already exists."
  exit 1
fi

useradd -m -s /bin/bash "$USERNAME"
echo "$USERNAME:$TEMP_PASS" | chpasswd
chage -d 0 "$USERNAME"   # Force password change on first login

echo "✓ User '$USERNAME' created."
echo "  Temp password: $TEMP_PASS"
echo "  They will be prompted to change it at first login."
```

Usage:

```bash
sudo bash onboard.sh john.doe
```

---

## The Rule That Changed How I Work

> **If you do something twice, write a script.**

Every manual step is a place where you can make a mistake, forget something,
or waste ten minutes you didn't need to. A script is a decision made once
and applied consistently forever.

These three scripts took maybe an hour to write and refine. They've saved far more
than that in repeated manual work since then.

What Bash scripts have become part of your daily workflow?
Reach out via the [Contact](/#contact) section — I'd love to see what others are automating.
