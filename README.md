# dewdayte

dewdayte is a no-fills productivity application for getting sh\*t done. It allows users to create Spaces where they can organize Tasks. A Task can be anything from "pick up some groceries" to "refactor the local storage logic into a custom hook". It's whatever you want!

The app is currently in development, but it's my main side-project. You'll see I've been making tons of commits here.

## How is it being built?

As a full stack application, dewdayte makes use of some really cool modern tools including:

- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

This repo contains the whole application, and the front and back ends are both written in typescript (hooray!), so it's easy to work rapidly across the stack.

## How can I check it out?

This repo is public, so you can look through the code all you like. If you want to run it locally, you can follow these steps:

1. Clone the repo
2. Install dependencies with `npm install` (make sure you have node installed on your machine)
3. Run `npx prisma db push` to apply migrations to your database
4. Run `npm run dev` to start the project
5. Open the `localhost` link shown in your terminal

After that, you should be able to explore the app in its current state!

## Can I work on it?

Good question! I'm the only developer working on the project for now, but I'd be happy to onboard anyone who is interested in contributing. You can reach out to me via Twitter [@iankranz][https://twitter.com/iankranz]
