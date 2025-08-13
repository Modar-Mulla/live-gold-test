export function parsePaging(searchParams: { page?: string; limit?: string; skip?: string }) {
  const limit = Math.max(1, parseInt(searchParams.limit ?? "", 10) || 0 || 30); // default 30
  const pageFromUrl = Math.max(1, parseInt(searchParams.page ?? "", 10) || 1);
  const skip =
    parseInt(searchParams.skip ?? "", 10) >= 0
      ? parseInt(searchParams.skip!, 10)
      : (pageFromUrl - 1) * limit;

  const currentPage = Math.floor(skip / limit) + 1;
  return { limit, skip, currentPage };
}