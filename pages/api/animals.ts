import { NextApiRequest, NextApiResponse } from "next";
import { animalController } from "@server/controller/animal";
export default function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    if (request.method === "GET") {
        animalController.get(request, response);
        return;
    }

    response.status(405).json({
        message: "Method not allowed",
    });
}
