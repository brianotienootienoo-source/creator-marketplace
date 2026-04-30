import { getPosts, calculateCreatorScore } from "./posts";
import { getFollowing } from "./following";

/* =========================================================
   🧠 CREATOR LEADERBOARD (FROM DISCOVER)
=========================================================*/
export function getTopCreators(creators: any[]) {
  const posts = getPosts();

  return creators
    .map((c) => {
      const creatorPosts = posts.filter(
        (p) => p.creatorSlug === c.slug
      );

      const viralCount = creatorPosts.filter(
        (p) => p.type === "viral"
      ).length;

      const totalLikes = creatorPosts.reduce(
        (sum, p) => sum + (p.likes || 0),
        0
      );

      return {
        ...c,
        score: calculateCreatorScore(c.slug),
        viralCount,
        totalLikes,
      };
    })
    .sort((a, b) => b.score - a.score);
}

/* =========================================================
   🔥 VIRAL BOOST (FROM DISCOVER)
=========================================================*/
function getViralWeight(post: any) {
  const creatorScore = calculateCreatorScore(
    post.creatorSlug
  );

  return (post.likes || 0) * 0.7 + creatorScore * 0.3;
}

/* =========================================================
   🌍 GLOBAL FEED
=========================================================*/
export function getGlobalFeed() {
  return getPosts()
    .map((post) => ({
      ...post,
      ui: {
        ...(post.ui || {}),
        viralWeight: getViralWeight(post),
      },
    }))
    .sort((a, b) => b.ui.viralWeight - a.ui.viralWeight);
}

/* =========================================================
   🔥 TRENDING FEED
=========================================================*/
export function getTrendingFeed() {
  return getGlobalFeed().slice(0, 20);
}

/* =========================================================
   👥 FOLLOWING FEED
=========================================================*/
export function getFollowingFeed() {
  const following = getFollowing();

  return getGlobalFeed().filter((post) =>
    following.includes(post.creatorSlug)
  );
}

/* =========================================================
   🎯 FOR YOU FEED (NEXT STEP READY)
=========================================================*/
export function getForYouFeed() {
  return getGlobalFeed(); // placeholder (we’ll personalize later)
}