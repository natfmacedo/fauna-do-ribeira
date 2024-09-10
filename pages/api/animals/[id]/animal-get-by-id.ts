import { animalController } from "@server/controller/animal";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    if (request.method === "GET") {
        await animalController.getAnimalById(request, response);
        return;
    }
    response.status(405).json({
        error: {
            message: "Method now allowed",
        },
    });
}
