export function paginateData<T>(data: T[], page: number, limit: number) {
  const start = (page - 1) * limit;
  const end = page * limit;
  return data.slice(start, end);
}

export function sortData<T>(data: T[], order: "asc" | "desc", sort_by: "id") {
  return data.sort((a, b) => {
    if (order === "asc") {
      return a[sort_by] - b[sort_by];
    } else {
      return b[sort_by] - a[sort_by];
    }
  });
}
