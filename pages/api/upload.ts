import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import formidable, { errors as formidableErrors } from "formidable";
import { promises as fs } from "fs";
import path from "path";

export const config = {
    api: {
        bodyParser: false,
    },
};

const readFile = (
    req: NextApiRequest,
    saveLocally?: boolean
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
    const options: formidable.Options = {};
    if (saveLocally) {
        options.uploadDir = path.join(process.cwd(), "/public/images");
        options.filename = (name, ext, path, form) => {
            return Date.now().toString() + "_" + path.originalFilename;
        };
    }

    const form = formidable(options);
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        });
    });
};

const handler: NextApiHandler = async (req, res) => {
    try {
        await fs.readdir(path.join(process.cwd() + "/public", "/images"));
    } catch (error) {
        await fs.mkdir(path.join(process.cwd() + "/public", "/images"));
    }
    await readFile(req, true);
    res.json({ done: "ok" });
};
export default handler;

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     if (req.method !== "POST") {
//         return res.status(405).json({
//             message: "Method npt allowed",
//         });
//     }

//     const form = formidable({ multiples: false });
//     let fields;
//     let files;

//     try {
//         [fields, files] = await form.parse(req);
//         const imageFile = files.file[0];
//         if (!imageFile || !imageFile.filepath) {
//             return res.status(400).json({
//                 message: "No image file uploaded",
//             });
//         }
//         const uploadDir = path.join(process.cwd(), "public", "images");
//         await fs.mkdir(uploadDir, { recursive: true });

//         res.status(200).json({
//             message: "Image uploaded succesfully",
//             imageUrl: `/images/${imageFile}`,
//         });
//     } catch (error) {
//         console.error("Upload error:", error);
//         res.status(500).json({ message: "Failed to upload image" });
//     }
// }
