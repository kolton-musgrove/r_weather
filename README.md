## Developing

Once you've created a project and installed dependencies with `pnpm install`, start a development server:

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

## Building

To create a production version of your app:

```bash
pnpm run build
```

You can preview the production build with `pnpm run preview`.

Each PR in this repository will get it's only development deployment in Vercel which will be linked to automatically in a comment on the PR.

The main branch is push protected and requires and requirements-passing PR to make any changes. Any such merges will automatically be deployed to the live site.
