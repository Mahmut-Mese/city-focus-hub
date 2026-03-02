type PostWithTags = {
  tags?: string[];
};

export function getPopularTags(posts: PostWithTags[], limit = 8): string[] {
  const counts = new Map<string, number>();
  const firstSeenOrder = new Map<string, number>();
  let order = 0;

  posts.forEach((post) => {
    const uniqueTags = new Set((post.tags || []).filter(Boolean));

    uniqueTags.forEach((tag) => {
      counts.set(tag, (counts.get(tag) || 0) + 1);

      if (!firstSeenOrder.has(tag)) {
        firstSeenOrder.set(tag, order);
        order += 1;
      }
    });
  });

  return Array.from(counts.entries())
    .sort((a, b) => {
      const countDiff = b[1] - a[1];
      if (countDiff !== 0) {
        return countDiff;
      }

      return (firstSeenOrder.get(a[0]) || 0) - (firstSeenOrder.get(b[0]) || 0);
    })
    .slice(0, limit)
    .map(([tag]) => tag);
}
