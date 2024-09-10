import { NextApiRequest, NextApiResponse } from "next";
import { animalController } from "@server/controller/animal";

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    if (request.method === "GET") {
        await animalController.get(request, response);
        return;
    }

    if (request.method === "POST") {
        await animalController.create(request, response);
        return;
    }

    response.status(405).json({
        error: {
            message: "Method not allowed",
        },
    });
}
