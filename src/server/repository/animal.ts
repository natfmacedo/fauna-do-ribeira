import { read } from "@db-crud-animais";

interface AnimalRepositoryGetParams {
    page?: number;
    limit?: number;
}

interface AnimalRepositoryGetOutput {
    animals: Animal[];
    total: number;
    pages: number;
}

function get({
    page,
    limit,
}: AnimalRepositoryGetParams = {}): AnimalRepositoryGetOutput {
    const currentPage = page || 1;
    const currentLimit = limit || 4;

    const ALL_ANIMALS = read();

    // Paginação
    const startIndex = (currentPage - 1) * currentLimit;
    const endIndex = currentPage * currentLimit;
    const paginatedAnimals = ALL_ANIMALS.slice(startIndex, endIndex);
    const totalPages = Math.ceil(ALL_ANIMALS.length / currentLimit);

    return {
        animals: paginatedAnimals,
        total: ALL_ANIMALS.length,
        pages: totalPages,
    };
}

export const animalRepository = {
    get,
};

// Model/Schema
interface Animal {
    id: string;
    date: string;
    image: string;
    imageDescription: string;
    name: string;
    scientificName: string;
    characteristics: string;
    eating: string;
    location: string;
    iucnState: string;
    link: string;
}
