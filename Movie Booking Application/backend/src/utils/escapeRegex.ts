/**
 * Escapes special regex characters in a string so it can be safely
 * used inside a MongoDB `$regex` query without risking ReDoS.
 */
export const escapeRegex = (str: string): string => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};
