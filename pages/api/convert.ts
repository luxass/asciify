import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import imageToAscii from "image-to-ascii";
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
            part.on("data", (buf) => {
                imageToAscii(
                    buf,
                    {
                        colored: false
                    },
                    (err: any, converted: any) => {
                        if (err) reject(err);
                        resolve(converted);
                    }
                );
            });
            form.handlePart(part);
        };

        form.parse(req, (err, fields, files) => {
            if (err) return reject(err);
        });
    });
    res.status(200).json({ art: data });
}

export const config = {
    api: {
        bodyParser: false,
    },
};
