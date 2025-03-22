export function getCardCountString(
    cardCount: number
) {
    return `${cardCount} card${cardCount === 1 ? "" : "s"}`;
}