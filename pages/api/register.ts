import prisma from '@/libs/prismadb';

import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(400).end();
    }

    try {
        const { email, password, username, name } = req.body;

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                email,
                username,
                name,
                hashedPassword
            }
        });

        return res.status(201).json(user);
    } catch (e) {
        console.log(e);
        return res.status(400).end();
    }
}