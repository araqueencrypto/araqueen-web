export async function fetchHealth() {
  const res = await fetch("/api/health");

  if (!res.ok) {
    throw new Error("Backend not reachable");
  }

  return res.json();
}
