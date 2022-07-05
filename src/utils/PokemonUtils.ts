export function getIdFromUrl(url: string): string {
  return url.split("/").reverse()[1];
}

export function getImageFromId(id: string): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

export function isPrime(num?: number): boolean {
  if (!num) {
    return false;
  }
  for (let i = 2, s = Math.sqrt(num); i <= s; i++)
    if (num % i === 0) return false;
  return num > 1;
}
