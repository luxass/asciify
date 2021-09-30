import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        res.status(405).end("Method not allowed");
        return;
    }
    const data = await new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm({
            keepExtensions: true,
            multiples: false,
        });
        form.onPart = function (part) {
            console.log(part);
            part.on("data", (buf) => {
                // Here we converts the image buffer to ascii art
            });
            form.handlePart(part);
        };

        form.parse(req, (err, fields, files) => {
            if (err) return reject(err);
            resolve({ fields, files });
        });
    });

    res.status(200).json(data);

}

export const config = {
    api: {
        bodyParser: false,
    },
};
