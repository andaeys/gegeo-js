
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        // TODO: Handle file upload here
        const file = req.body.file;
        console.log('File uploaded:', file);
        res.status(200).json({ success: true });
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
