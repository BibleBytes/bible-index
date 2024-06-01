import {
    type Book,
    type BookMetadata,
    type Language,
    Metadata,
} from "../../resources/index.js";

/**
 * Retrieves book metadata by ID or name.
 * @param {Language} language - An enumerated language code.
 * @param {number | Book} id - The ID or index of the book to retrieve.
 * @returns {BookMetadata | undefined} The metadata of the book if found, otherwise undefined.
 */
export function GetBook(
    language: Language,
    id: number | Book,
): BookMetadata | undefined {
    const metadata = Metadata[language];
    if (typeof id === "number") {
        if (id < 0 || id >= metadata.length) {
            return undefined;
        }
        return metadata[id];
    }
    return metadata.find((b) => b.id === id);
}

/**
 * Retrieves book metadata for multiple IDs or names.
 * @param {Language} language - An enumerated language code.
 * @param {(number | Book)[]} [ids] - An optional array of IDs or indexes of the books to retrieve.
 * @returns {readonly BookMetadata[]} An array containing the metadata of the specified books.
 */
export function GetAllBooks(
    language: Language,
    ids?: (number | Book)[] | readonly Book[],
): readonly BookMetadata[] {
    if (!ids) {
        return Metadata[language];
    }
    return Object.freeze(
        ids
            .map((id) => GetBook(language, id))
            .filter((b) => b !== undefined) as BookMetadata[],
    );
}
