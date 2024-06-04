import { animalRepository } from "@ui/repository/animal";

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

export const animalController = {
    get,
};
