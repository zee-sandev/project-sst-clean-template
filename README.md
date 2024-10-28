## Prepare Project

### Step 1

install package

```
pnpm install
```

### Step 2

prepare Husky for git hook

```
pnpm prepare
```

### Step 3

test start project

```
pnpm dev
```

### Step 4

install jq for each operating system

#### For Ubuntu/Debian-based systems:

```
sudo apt-get install jq
```

#### For macOS:

```
brew install jq
```

#### For CentOS/RHEL-based systems:

```
sudo yum install jq
```

#### For Windows:

Download the jq executable from the official jq releases page. After downloading, you can add the directory containing jq.exe to your system's PATH.

### Secret Setup

```
sst set secret GoogleClientId <your-google-client-id>
sst set secret GoogleClientSecret <your-google-client-secret>
```
