import prisma from '@/libs/prismadb'
import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST' && req.method !== 'GET') {
        return res.status(405).end();
    }

    try {

        const { postId } = req.body || req.query;

        const { currentUser } = await serverAuth(req, res);

        if (!postId || typeof postId !== 'string') {
            throw new Error('invalid post id');
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId
            }

        });

        if (!post) {
            throw new Error('invalid post id')
        }

        let updatedLikedIds = [...(post.likedIds || [])];

        if (req.method === 'POST') {
            updatedLikedIds.push(currentUser.id);


            try {
                const post = await prisma.post.findUnique({
                    where: {
                        id: postId
                    }
                });

                if (post?.userId) {
                    await prisma.notification.create({
                        data: {
                            body: 'Someone liked your tweet!',
                            userId: post.userId
                        }
                    });

                    await prisma.user.update({
                        where: {
                            id: post.userId
                        },
                        data: {
                            hasNotification: true
                        }
                    });
                }
            } catch (e) {
                console.log(e);
            }
        }
        if (req.method === 'GET') {
            updatedLikedIds = updatedLikedIds.filter((likedId) => likedId !== currentUser.id)
        }

        const updatedPost = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                likedIds: updatedLikedIds
            }
        });

        return res.status(200).json(updatedPost);

    } catch (e) {
        console.log(e);
        return res.status(400).end();
    }
}