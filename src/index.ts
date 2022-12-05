export default {
  async fetch(request: Request, env: any) {
    console.warn(env);
    return await handleRequest(request, env.LEADERBOARD, env.SESSION_TOKEN);
  },
};

interface LeaderboardBody {
  members: {};
}

async function handleRequest(
  request: Request,
  LEADERBOARD: string,
  SESSION_TOKEN: string
) {
  const url = new URL(request.url);

  const userId = url.searchParams.get("user_id");
  if (userId === null) {
    return new Response("user_id parameter is required", {
      status: 400,
      statusText: "Bad Request",
    });
  }

  const year = url.searchParams.get("year");
  if (year === null) {
    return new Response("year parameter is required", {
      status: 400,
      statusText: "Bad Request",
    });
  }

  const leaderboard = url.searchParams.get("leaderboard") || LEADERBOARD;

  const res = await fetch(
    `https://adventofcode.com/${year}/leaderboard/private/view/${leaderboard}.json`,
    {
      headers: {
        cookie: `session=${SESSION_TOKEN}`,
      },
      cf: {
        cacheTtl: 900,
        cacheEverything: true,
      },
    }
  );

  const body: LeaderboardBody = await res.json();

  const users = Object.entries(body.members).filter(([id, info]) => {
    return id == userId;
  });

  if (users.length !== 1) {
    return new Response(`No entry found for user ${userId}`, {
      status: 404,
      statusText: "Not Found",
      headers: {
        "cache-control": "max-age=900",
      },
    });
  }

  return new Response(
    JSON.stringify({
      schemaVersion: 1,
      label: "AoC Stars",
      message: users[0][1].stars.toString(),
      color: "308413",
      labelColor: "D90A16",
    }),
    {
      headers: {
        "cache-control": "max-age=900",
      },
    }
  );
}
