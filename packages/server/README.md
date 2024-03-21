# server

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.0.26. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

# deploy notes

if upgrading the bun version, make sure to upgrade the version on the server and in the build scripts

# service

`gameserv.service` in `/lib/systemd/system`

Update env variables on server at `/etc/environment`
