import prisma from '@/libs/prismadb';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    try {

        const { postId } = req.query;

        if (!postId || typeof postId !== 'string') {
            throw new Error('invalid id');
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId
            }, include: {
                user: true,
                comment: {
                    include: {
                        user: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        });

        return res.status(200).json(post);

    } catch (e) {
        console.log(e);
        return res.status(400).end();
    }
}