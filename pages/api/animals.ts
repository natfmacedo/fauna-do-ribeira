import { NextApiRequest, NextApiResponse } from "next";
import { animalController } from "@server/controller/animal";

export default function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    if (request.method === "GET") {
        animalController.get(request, response);
        return;
        // animalController.get(request, response);
        // return;
    }

    if (request.method === "POST") {
        animalController.create(request, response);
        return;
    }

    response.status(405).json({
        error: {
            message: "Method not allowed",
        },
    });
}
