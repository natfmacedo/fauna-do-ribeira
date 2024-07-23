import { animalController } from "@server/controller/animal";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
    request: NextApiRequest,
    response: NextApiResponse
) {
    if (request.method === "PUT") {
        animalController.animalUpdate(request, response);
        return;
    }
    response.status(405).json({
        error: {
            message: "Method now allowed",
        },
    });
    // eslint-disable-next-line no-console
    // console.log(request.headers);
    // response.status(200).json({ message: "Animal atualizado!" });
}
