import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/libs/prismadb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST' && req.method !== 'GET') {
        return res.status(405).end();
    }

    try {

        if (req.method === 'POST') {
            const { currentUser } = await serverAuth(req, res);
            const { body } = req.body;

            const post = prisma.post.create({
                data: {
                    body,
                    userId: currentUser.id
                }
            });
            return res.status(200).json(post);
        }

        if (req.method === 'GET') {
            // FINISH GET METHOD 
        }

    } catch (e) {
        console.log(e);
        return res.status(400).end();
    }
}