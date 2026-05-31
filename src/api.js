const BASE_URL = "https://dogapi.dog/api/v2";

export async function fetchBreeds() {
  const res = await fetch(`${BASE_URL}/breeds?page[size]=12`);
  if (!res.ok) throw new Error("Failed to fetch dog breeds");
  return res.json();
}

export async function fetchBreedDetails(id) {
  const res = await fetch(`${BASE_URL}/breeds/${id}`);
  if (!res.ok) throw new Error("Failed to fetch breed details");
  return res.json();
}

export async function fetchFacts() {
  const res = await fetch(`${BASE_URL}/facts?limit=3`);
  if (!res.ok) throw new Error("Failed to fetch dog facts");
  return res.json();
}

export async function fetchGroups() {
  const res = await fetch(`${BASE_URL}/groups`);
  if (!res.ok) throw new Error("Failed to fetch dog groups");
  return res.json();
}
