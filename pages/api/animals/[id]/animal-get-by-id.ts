import { animalController } from "@server/controller/animal";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    if (request.method === "GET") {
        animalController.getAnimalById(request, response);
        return;
    }
    response.status(405).json({
        error: {
            message: "Method now allowed",
        },
    });
}
