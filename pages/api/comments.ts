import prisma from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    try {
        const { currentUser } = await serverAuth(req, res);
        const { body } = req.body;
        const { postId } = req.query;

        if (!postId || typeof postId !== 'string') {
            throw new Error('invalid postId')
        }
        const comment = await prisma.comment.create({
            data: {
                body,
                userId: currentUser.id,
                postId
            }
        });

        return res.status(200).json(comment);

    } catch (e) {
        console.log(e);
        return res.status(400).end();
    }
}