type FeedCommand =
  | "FEED.BUILD"
  | "FEED.ROUTE"
  | "STREAM.SWITCH"
  | "MEMORY.UPDATE"
  | "TRACK.engagement";

interface CommandContext {
  feed?: any[];
  mode?: "forYou" | "explore";
  payload?: any;
}

export function runCommand(
  command: FeedCommand,
  ctx: CommandContext
) {
  switch (command) {
    case "FEED.BUILD":
      return ctx.feed ?? [];

    case "FEED.ROUTE":
      return ctx.mode === "explore"
        ? "explore"
        : "forYou";

    case "STREAM.SWITCH":
      return ctx.payload?.stream ?? "forYou";

    case "MEMORY.UPDATE":
      return true; // hook placeholder

    case "TRACK.engagement":
      return true; // hook placeholder

    default:
      return ctx.feed ?? [];
  }
}