interface AnimalRepositoryGetParams {
    page: number;
    limit: number;
}
interface AnimalRepositoryGetOutput {
    animals: Animal[];
    total: number;
    pages: number;
}

function get({
    page,
    limit,
}: AnimalRepositoryGetParams): Promise<AnimalRepositoryGetOutput> {
    return fetch("/api/animals").then(async (serverAnswer) => {
        const animalsString = await serverAnswer.text();
        const serverAnimals = JSON.parse(animalsString).animals;

        const ALL_ANIMALS = serverAnimals;
        // Paginação
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedAnimals = ALL_ANIMALS.slice(startIndex, endIndex);
        const totalPages = Math.ceil(ALL_ANIMALS.lenght / limit);

        return {
            animals: paginatedAnimals,
            total: ALL_ANIMALS.lenght,
            pages: totalPages,
        };
    });
}

export const animalRepository = {
    get,
};

// Model/Schema
interface Animal {
    id: string;
    date: Date;
    name: string;
    image: string;
    scientificName: string;
    characteristics: string;
    eating: string;
    location: string;
    iucnState: string;
    link: string;
}
