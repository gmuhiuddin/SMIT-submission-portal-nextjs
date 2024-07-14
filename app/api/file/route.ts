// import { put } from '@vercel/blob';
// import { NextResponse } from 'next/server';

// export async function POST(request: Request): Promise<NextResponse> {
//     const { searchParams } = new URL(request.url);
//     const filename = searchParams.get('filename') || "";
//     const token = process.env.BLOB_READ_WRITE_TOKEN;
//     console.log(token)
//     if (filename && request.body && token) {
       
//         const blob = await put(filename, request.body, {
//           access: 'public',
//           token: token
//         });
       
//         return NextResponse.json(blob);
//     } else {
//         return NextResponse.json({ error: "No filename" });
//     };
// }

import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'
import { customAlphabet } from 'nanoid'
// import multer from 'multer';

export const runtime = 'edge'

const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
) // 7-character random string

// const storageConfig = multer.memoryStorage();
// const upload = multer({ storage: storageConfig });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export async function POST(req: Request, res: NextResponse) {

//   upload.single('file')(req as any, res as any, async (err) => {
//     if (err) {
//       return res.status(500).json({ error: 'Upload error.' });
//     }

//     const file = req.file;
//     const formData = new FormData();
//     formData.append('file', file.buffer, { filename: file.originalname, contentType: file.mimetype });

//     try {
//       const response = await axios.post('YOUR_EXTERNAL_API_ENDPOINT', formData, {
//         headers: formData.getHeaders(),
//       });
//       res.status(200).json(response.data);
//     } catch (error) {
//       res.status(500).json({ error: 'External API error.', details: error.message });
//     }
//   });

  const file = req.body || '';

  const contentType = req.headers.get('content-type') || 'text/plain';
  const filename = `${nanoid()}.${contentType.split('/')[1]}`
  
  const blob = await put(filename, file, {
    contentType,
    access: 'public',
  });

  return NextResponse.json(blob)
}



// export default async function handler(req, res) {
  
// }