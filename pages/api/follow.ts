import prisma from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST' && req.method !== 'GET') {
        return res.status(405).end();
    }

    try {

        const { userId } = req.body || req.query;


        const { currentUser } = await serverAuth(req, res);


        if (!userId || typeof userId !== 'string') {
            throw new Error('invalid id 1')
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            throw new Error('invalid id 2')
        }

        let updatedFollowingIds = [...(user.followingIds || [])];

        if (req.method === 'POST') {
            updatedFollowingIds.push(userId);
        }

        if (req.method === 'GET') {
            updatedFollowingIds = updatedFollowingIds.filter((followingId) => followingId !== userId);
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                followingIds: updatedFollowingIds
            }
        });

        return res.status(200).json(updatedUser);

    } catch (e) {
        console.log(e);
        return res.status(400).end();
    }
}