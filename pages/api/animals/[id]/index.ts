import { animalController } from "@server/controller/animal";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    if (request.method === "DELETE") {
        await animalController.deleteById(request, response);
        return;
    }

    response.status(405).json({
        error: {
            message: "Method not allowed",
        },
    });
}
