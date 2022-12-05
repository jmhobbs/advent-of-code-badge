# Advent of Code Badge

This repo is a Cloudflare worker which can be used with a private leaderboard
to provide the metadata required for a custom badge from [shields.io](https://shields.io/)
with your Advent of Code stars earned for a given year, like this:

![AoC Badge](https://img.shields.io/badge/AoC%20Stars-4-308413?labelColor=D90A16)

# Deploying

You will need:

- A [Cloudflare](https://www.cloudflare.com/) account
- An [Advent of Code](https://www.adventofcode.com/) private leaderboard
- Your `session` cookie from Advent of Code

## Edit the `wrangler.toml`

Set the `LEADERBOARD` variable to your leaderboard ID, i.e. the `<id>` from your private leaderboard URL `https://adventofcode.com/<year>/leaderboard/private/view/<id>`

## Set Your Secret

Use `wrangler secret put SESSION_TOKEN` to set your token

## Confirm It Works

Use `wrangler dev` and test the endpoint

## Deploy

`wrangler publish`

# Crafting Your Markdown

Take your workers URL with `user_id` and `year` set in the query parameters, and URL encode it.

Then provide it and the `url` parameter to `https://img.shields.io/endpoint`

Use that as the image source for your badge.

## Example

```
[![AoC Badge](https://img.shields.io/endpoint?url=https%3A%2F%2Faoc.your-worker-here.workers.dev%2F%3Fuser_id%3D4896%26year%3D2022)](https://adventofcode.com/)
```

# Note!

Your session token lasts about a month, so you'll have to update that occasionally.
