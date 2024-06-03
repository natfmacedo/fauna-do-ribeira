import { animalRepository } from "@ui/repository/animal";

interface AnimalControllerGetParams {
    page: number;
}

async function get(params: AnimalControllerGetParams) {
    // eslint-disable-next-line no-console
    console.log(params);
    return animalRepository.get({
        page: params.page,
        limit: 4,
    });
}

export const animalController = {
    get,
};
