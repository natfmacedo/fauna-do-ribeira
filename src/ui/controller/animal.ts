import { animalRepository } from "@ui/repository/animal";
import { Animal } from "@ui/schema/animal";

interface AnimalControllerGetParams {
    page: number;
    limit?: number;
}

async function get(params: AnimalControllerGetParams) {
    return animalRepository.get({
        page: params.page,
        limit: params.limit || 4,
    });
}

interface AnimalControllerCreateParams {
    name?: string;
    scientificName?: string;
    image?: string;
    imageDescription?: string;
    characteristics?: string;
    eating?: string;
    location?: string;
    iucnState?: string;
    link?: string;
    onError: () => void;
    onSuccess: (animal: Animal) => void;
}

function create({
    name,
    scientificName,
    image,
    imageDescription,
    characteristics,
    eating,
    location,
    iucnState,
    link,
    onError,
    onSuccess,
}: AnimalControllerCreateParams) {
    // Fail Fast Validation
    if (
        !name ||
        !scientificName ||
        !image ||
        !imageDescription ||
        !characteristics ||
        !eating ||
        !location ||
        !iucnState ||
        !link
    ) {
        onError();
        return;
    }

    animalRepository
        .createAnimal(
            name,
            scientificName,
            image,
            imageDescription,
            characteristics,
            eating,
            location,
            iucnState,
            link
        )
        .then((newAnimal) => {
            onSuccess(newAnimal);
        })
        .catch(() => {
            onError();
        });
}

export const animalController = {
    get,
    create,
};
