// "use client";

// import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
// import { getTeacherClassroom } from '@/lib/actions/auth/classRoom';
// import { useSession } from 'next-auth/react';
// import { FormError } from "@/components/shared/form-error";
// import { FormSuccess } from "@/components/shared/form-success";
// import { Button as MaterialBtn } from '@mui/material';
// import { addPost } from '@/lib/actions/auth/post';
// import BlurLoader from '@/components/shared/blurLoader';
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import RichTextExample from '@/components/shared/TextEditor';

// interface ClassRoomId {
//     class_room_id: string | number;
// }

// interface CreateAssignmentPorps {
//     params: ClassRoomId;
// }

// interface AssignmentRes {
//     success?: string | undefined;
//     error?: string | undefined;
// };

// interface Images {
//     files: File[];
// }

// interface ImagesData {
//     image: string | null;
// }

// const CreateAssignment: React.FC<CreateAssignmentPorps> = ({ params: { class_room_id } }) => {

//     const { data: session, status, update } = useSession({ required: true });
//     const user = session?.user;

//     const [title, setTitle] = useState<string | null>("");
//     const [description, setDescription] = useState<string | null>("");
//     // const [dueDate, setDueDate] = useState<string | null>("");
//     // const [content, setContent] = useState<string | null>("");
//     const [classRoom, setClassRoom] = useState<any>("");
//     const [errMsg, setErr] = useState<string>("");
//     const [successMsg, setSuccess] = useState<string>("");
//     const [imageData, setImagesData] = useState<ImagesData[]>([]);
//     const [files, setFiles] = useState<Images>({ files: [] });
//     const [images, setImages] = useState<Images>({ files: [] });
//     const [isPending, setIsPending] = useState<boolean>(false);
//     const [createFile, setCreateFile] = useState<boolean>(false);
//     const [createdFiles, setCreatedFiles] = useState<{
//         files: {
//             name?: string;
//             type?: string;
//             content?: string;
//         }[]
//     }>({ files: [] });

//     const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         setIsPending(true);
//         setErr("");
//         setSuccess("");

//         try {
//             const formData = new FormData();

//             formData.append('image-length', images.files.length.toString());
//             formData.append('created-files-length', createdFiles.files.length.toString());
//             formData.append('file-length', files?.files?.length.toString());
//             images?.files.forEach((element, index) => {
//                 formData.append(`image-${index + 1}`, element);
//             });
//             createdFiles?.files.forEach((element, index) => {
//                 if (element.content && element.name) {
//                     const blob = new Blob([element?.content], { type: 'text/html' });
//                     formData.append(`created-files-${index + 1}`, blob, element.name);
//                 };
//             });
//             files?.files.forEach((element, index) => {
//                 formData.append(`file-${index + 1}`, element);
//             })
//             formData.append('title', title as string);
//             formData.append('description', description as string);
//             formData.append('teacher', user?._id as string);
//             formData.append('classRoom', class_room_id as any);

//             const res: AssignmentRes | undefined = await addPost(formData as FormData);

//             if (res?.success) {
//                 setSuccess(res?.success);
//                 setIsPending(false);
//                 window.location.href = `/class-room/${class_room_id}`;
//             } else {
//                 setErr(res?.error || "Some thing went wrong!");
//                 setIsPending(false);
//             };
//         } catch (error) {
//             setErr(error instanceof Error ? error.message : "Some thing went wrong!");
//             setIsPending(false);
//         };
//     };

//     useEffect(() => {
//         checkClassRoom();
//     }, []);

//     async function checkClassRoom() {
//         try {
//             const classRoomRes = await getTeacherClassroom(class_room_id);

//             setClassRoom(classRoomRes?.classRoom || {});
//         } catch (error) {
//             console.log(error);
//         };
//     };

//     async function handleChangeFile(e: ChangeEvent<HTMLInputElement>) {
//         const file = e.currentTarget.files && e.currentTarget.files[0];
//         if (file) {
//             if (file.size / 1024 / 1024 > 50) {
//                 setErr('File size too big (max 50MB)')
//             } else {
//                 setFiles({ files: [...files?.files, file] });
//                 const reader = new FileReader();
//                 reader.readAsDataURL(file);
//             }
//         }
//     };

//     async function handleChangeImage(e: ChangeEvent<HTMLInputElement>) {
//         const file = e.currentTarget.files && e.currentTarget.files[0];

//         if (file) {
//             if (file.size / 1024 / 1024 > 50) {
//                 setErr('File size too big (max 50MB)')
//             } else {
//                 setImages({ files: [...images?.files, file] });
//                 const reader = new FileReader();
//                 reader.onload = (e) => {
//                     setImagesData((prev) => ([...prev, { image: e.target?.result as string }]))
//                 };
//                 reader.readAsDataURL(file);
//             }
//         }
//     };

//     const deleteImage = (index: number) => {
//         const imagesCopy = [...imageData];
//         const imagesFileCopy = [...images?.files];

//         imagesFileCopy.splice(index, 1);
//         imagesCopy.splice(index, 1);

//         setImages({ files: imagesFileCopy });
//         setImagesData(imagesCopy);
//     };

//     const deleteFile = (index: number) => {
//         const filesFileCopy = [...files.files];

//         filesFileCopy.splice(index, 1);

//         setFiles({ files: filesFileCopy });
//     };

//     const deleteCreatedFile = (index: number) => {
//         const filesFileCopy = [...createdFiles.files];

//         filesFileCopy.splice(index, 1);

//         setCreatedFiles({ files: filesFileCopy });
//     };

//     const handleChangeCreatedFiles = (data: { name: string; type: string; content: string }) => {
//         setCreatedFiles({ files: [...createdFiles?.files, data] });
//     };

//     if (!classRoom) return <p>loading</p>;

//     if (!Object.keys(classRoom).length) return <p>404</p>;

//     if (createFile) return <RichTextExample setCreatedFiles={handleChangeCreatedFiles} closeRichEditor={() => setCreateFile(false)} />;

//     return (
//         <>
//             <Link href="/">
//                 <Button
//                     size="lg"
//                     className="mt-16 absolute left-3 top-3 text-white px-4 py-2 rounded-md"
//                 >
//                     Go Dashboard
//                 </Button></Link>
//             <div className='flex justify-center w-full bg-#000'>
//                 {isPending && <BlurLoader />}
//                 <div className='flex p-6 bg-#000'>
//                     <form className='flex-col flex' onSubmit={handleCreatePost}>
//                         <input placeholder='Title' value={title as string} onChange={e => setTitle(e.target.value)} type="text" />
//                         <input placeholder='description' value={description as string} onChange={e => setDescription(e.target.value)} type="text" />
//                         {/* <input placeholder='due date' value={dueDate} onChange={e => setDueDate(e.target.value)} type="date" />
//                     <input placeholder='content' value={content} onChange={e => setContent(e.target.value)} type="text" /> */}
//                         <input placeholder='Image' accept="image/*" onChange={handleChangeImage} type="file" />
//                         {imageData?.map((element, index) => {
//                             return (
//                                 <>
//                                     <img className="w-20" key={index} src={element?.image as string} />
//                                     <p className='cursor-pointer' onClick={() => deleteImage(index)}>x</p>
//                                 </>
//                             )
//                         })}

//                         <input accept=".pdf,.doc,.gif,.txt" className="h-12" placeholder='File' onChange={handleChangeFile} type="file" />
//                         <p>or</p>
//                         <MaterialBtn
//                             className="mt-1 bg-black hover:bg-zinc-700 text-white px-4 py-2 rounded-md"
//                             onClick={() => setCreateFile(true)}
//                         >
//                             Create file
//                         </MaterialBtn>
//                         {files?.files?.map((element, index) => {
//                             return (
//                                 <p key={index}>{element?.name} <span className='cursor-pointer' onClick={() => deleteFile(index)}>x</span></p>
//                             )
//                         })}
//                         {createdFiles?.files?.map((element, index) => {
//                             return (
//                                 <p key={index}>{element?.name}
//                                     <iframe srcDoc={element.content} style={{ width: '100%', height: 'auto', border: '1px solid #ccc' }} />
//                                     <span className='cursor-pointer' onClick={() => deleteCreatedFile(index)}>x</span></p>
//                             )
//                         })}
//                         <FormError message={errMsg} />
//                         <FormSuccess message={successMsg} />
//                         <MaterialBtn
//                             className="mt-16 bg-black hover:bg-zinc-700 text-white px-4 py-2 rounded-md"
//                             type="submit"
//                         >
//                             Create post
//                         </MaterialBtn>
//                     </form>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default CreateAssignment;
"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { getTeacherClassroom } from '@/lib/actions/auth/classRoom';
import { useSession } from 'next-auth/react';
import { FormError } from "@/components/shared/form-error";
import { FormSuccess } from "@/components/shared/form-success";
import { Button as MaterialBtn, TextField } from '@mui/material';
import { addPost } from '@/lib/actions/auth/post';
import BlurLoader from '@/components/shared/blurLoader';
import { Button } from "@/components/ui/button";
import { styled } from '@mui/material/styles';
import Link from "next/link";
import RichTextExample from '@/components/shared/TextEditor';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import '../../teacher-dashboard/style.css';

interface ClassRoomId {
    class_room_id: string | number;
}

interface CreateAssignmentPorps {
    params: ClassRoomId;
}

interface AssignmentRes {
    success?: string | undefined;
    error?: string | undefined;
};

interface Images {
    files: File[];
}

interface ImagesData {
    image: string | null;
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const CreateAssignment: React.FC<CreateAssignmentPorps> = ({ params: { class_room_id } }) => {

    const { data: session, status, update } = useSession({ required: true });
    const user = session?.user;

    const [title, setTitle] = useState<string | null>("");
    const [description, setDescription] = useState<string | null>("");
    // const [dueDate, setDueDate] = useState<string | null>("");
    // const [content, setContent] = useState<string | null>("");
    const [classRoom, setClassRoom] = useState<any>("");
    const [errMsg, setErr] = useState<string>("");
    const [successMsg, setSuccess] = useState<string>("");
    const [imageData, setImagesData] = useState<ImagesData[]>([]);
    const [files, setFiles] = useState<Images>({ files: [] });
    const [images, setImages] = useState<Images>({ files: [] });
    const [isPending, setIsPending] = useState<boolean>(false);
    const [createFile, setCreateFile] = useState<boolean>(false);
    const [createdFiles, setCreatedFiles] = useState<{
        files: {
            name?: string;
            type?: string;
            content?: string;
        }[]
    }>({ files: [] });

    const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true);
        setErr("");
        setSuccess("");

        try {
            const formData = new FormData();

            formData.append('image-length', images.files.length.toString());
            formData.append('created-files-length', createdFiles.files.length.toString());
            formData.append('file-length', files?.files?.length.toString());

            images?.files.forEach((element: any, index: number) => {
                formData.append(`image-${index + 1}`, element);
            });

            createdFiles?.files.forEach((element, index) => {
                if (element.content && element.name) {
                    const blob = new Blob([element?.content], { type: 'text/html' });
                    formData.append(`created-files-${index + 1}`, blob, element.name);
                };
            });

            files?.files.forEach((element, index) => {
                formData.append(`file-${index + 1}`, element);
            });

            formData.append('title', title as string);
            formData.append('description', description as string);
            formData.append('teacher', user?._id as string);
            formData.append('classRoom', class_room_id as any);

            const res: AssignmentRes | undefined = await addPost(formData as FormData);

            if (res?.success) {
                setSuccess(res?.success);
                setIsPending(false);
                window.location.href = `/class-room/${class_room_id}`;
            } else {
                setErr(res?.error || "Some thing went wrong!");
                setIsPending(false);
            };
        } catch (error) {
            setErr(error instanceof Error ? error.message : "Some thing went wrong!");
            setIsPending(false);
        };
    };

    useEffect(() => {
        checkClassRoom();
    }, []);

    async function checkClassRoom() {
        try {
            const classRoomRes = await getTeacherClassroom(class_room_id);

            setClassRoom(classRoomRes?.classRoom || {});
        } catch (error) {
            console.log(error);
        };
    };

    async function handleChangeFile(e: ChangeEvent<HTMLInputElement>) {
        const file = e.currentTarget.files && e.currentTarget.files[0];
        if (file) {
            if (file.size / 1024 / 1024 > 50) {
                setErr('File size too big (max 50MB)')
            } else {
                setFiles({ files: [...files?.files, file] });
                const reader = new FileReader();
                reader.readAsDataURL(file);
            }
        }
    };

    async function handleChangeImage(e: ChangeEvent<HTMLInputElement>) {
        const file = e.currentTarget.files && e.currentTarget.files[0];

        if (file) {
            if (file.size / 1024 / 1024 > 50) {
                setErr('File size too big (max 50MB)')
            } else {
                setImages({ files: [...images?.files, file] });
                const reader = new FileReader();
                reader.onload = (e) => {
                    setImagesData((prev) => ([...prev, { image: e.target?.result as string }]))
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const deleteImage = (index: number) => {
        const imagesCopy = [...imageData];
        const imagesFileCopy = [...images?.files];

        imagesFileCopy.splice(index, 1);
        imagesCopy.splice(index, 1);

        setImages({ files: imagesFileCopy });
        setImagesData(imagesCopy);
    };

    const deleteFile = (index: number) => {
        const filesFileCopy = [...files.files];

        filesFileCopy.splice(index, 1);

        setFiles({ files: filesFileCopy });
    };

    const deleteCreatedFile = (index: number) => {
        const filesFileCopy = [...createdFiles.files];

        filesFileCopy.splice(index, 1);

        setCreatedFiles({ files: filesFileCopy });
    };

    const handleChangeCreatedFiles = (data: { name: string; type: string; content: string }) => {
        setCreatedFiles({ files: [...createdFiles?.files, data] });
    };

    if (!classRoom) return <p>loading</p>;

    if (!Object.keys(classRoom).length) return <p>404</p>;

    if (createFile) return <RichTextExample setCreatedFiles={handleChangeCreatedFiles} closeRichEditor={() => setCreateFile(false)} />;

    return (
        <>
            <Link href="/">
                <Button
                    size="lg"
                    className="mt-16 absolute left-3 top-3 text-white px-4 py-2 rounded-md"
                >
                    Go Dashboard
                </Button></Link>
            <div className='flex justify-center items-center w-full h-screen bg-#000'>
                {isPending && <BlurLoader />}
                {/* <div className='flex w-1/3 p-6 bg-#000 border-2 shadow bg-[#F8FAFC]'>
                    <form className='flex-col flex space-y-4 w-full' onSubmit={handleCreatePost}>
                        <h1 className='text-center text-3xl font-bold'>Post</h1>
                        <TextField value={title as string} onChange={e => setTitle(e.target.value)} id="outlined-basic" label="Title" variant="outlined" />
                        <TextField value={description as string} onChange={e => setDescription(e.target.value)} id="outlined-basic" label="Description" variant="outlined" />
                        <MaterialBtn
                            component="label"
                            role={undefined}
                            tabIndex={-1}
                            variant="contained"
                            sx={{ background: 'black', color: 'white', width: '50%', ":hover": { background: '#252C3E' } }}
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload Image <input accept="image/*" onChange={handleChangeImage} type='file' hidden />
                        </MaterialBtn>
                        {imageData?.map((element, index) => {
                            return (
                                <>
                                    <img className="w-20" key={index} src={element?.image as string} />
                                    <p className='cursor-pointer' onClick={() => deleteImage(index)}>×</p>
                                </>
                            )
                        })}
                        <MaterialBtn
                            component="label"
                            role={undefined}
                            variant="contained"
                            sx={{ background: 'black', color: 'white', width: '50%', ":hover": { background: '#252C3E' } }}
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload File <input accept=".pdf,.doc,.gif,.txt" type='file' onChange={handleChangeFile} hidden />
                        </MaterialBtn>
                        <p className='text-center'>or</p>
                        <MaterialBtn
                            sx={{ background: 'black', color: 'white', py: 2, ":hover": { background: '#252C3E' } }}
                            onClick={() => setCreateFile(true)}
                        >
                            Create file
                        </MaterialBtn>
                        {files?.files?.map((element, index) => {
                            return (
                                <p key={index}>{element?.name} <span className='cursor-pointer' onClick={() => deleteFile(index)}>×</span></p>
                            )
                        })}
                        {createdFiles?.files?.map((element, index) => {
                            return (
                                <p key={index}>{element?.name}
                                    <iframe srcDoc={element.content} style={{ width: '100%', height: 'auto', border: '1px solid #ccc' }} />
                                    <span className='cursor-pointer' onClick={() => deleteCreatedFile(index)}>×</span></p>
                            )
                        })}
                        <FormError message={errMsg} />
                        <FormSuccess message={successMsg} />
                        <MaterialBtn
                            sx={{ background: 'black', color: 'white', py: 2, ":hover": { background: '#252C3E' } }}
                            type="submit"
                        >
                            Create post
                        </MaterialBtn>
                    </form>
                </div> */}
                <div className="flex class-room-main-container lg:w-2/6 md:w-4/6 sm:w-10/12 max-[640px]:w-full flex-col p-6 bg-white border-2 shadow-lg mt-8 rounded-lg max-[640px]:mt-10">
                    <form className="flex flex-col space-y-6 w-full" onSubmit={handleCreatePost}>
                        <h1 className="text-center text-3xl md:text-4xl font-bold text-blue-600">Create Post</h1>

                        <TextField
                            value={title as string}
                            onChange={e => setTitle(e.target.value)}
                            id="outlined-basic"
                            label="Title"
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{ style: { color: '#00796B' } }}
                        />

                        <TextField
                            value={description as string}
                            onChange={e => setDescription(e.target.value)}
                            id="outlined-basic"
                            label="Description"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            InputLabelProps={{ style: { color: '#00796B' } }}
                        />

                        <MaterialBtn
                            component="label"
                            variant="contained"
                            sx={{ background: '#00796B', color: 'white', width: '100%', ":hover": { background: '#004D40' } }}
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload Image <input accept="image/*" onChange={handleChangeImage} type="file" hidden />
                        </MaterialBtn>

                        <div className="flex flex-wrap gap-4">
                            {imageData?.map((element, index) => (
                                <div key={index} className="relative w-24 h-24 md:w-32 md:h-32">
                                    <img className="w-full h-full object-cover rounded-md border" src={element?.image as string} alt="Uploaded" />
                                    <button
                                        className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition duration-300 ease-in-out"
                                        onClick={() => deleteImage(index)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>

                        <MaterialBtn
                            component="label"
                            variant="contained"
                            sx={{ background: '#00796B', color: 'white', width: '100%', ":hover": { background: '#004D40' } }}
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload File <input accept=".pdf,.doc,.gif,.txt" type="file" onChange={handleChangeFile} hidden />
                        </MaterialBtn>

                        <p className="text-center text-gray-600">or</p>

                        <MaterialBtn
                            sx={{ background: '#1976D2', color: 'white', py: 2, ":hover": { background: '#1565C0' } }}
                            onClick={() => setCreateFile(true)}
                            fullWidth
                        >
                            Create File
                        </MaterialBtn>

                        <div className="flex flex-wrap gap-4">
                            {files?.files?.map((element, index) => (
                                <div key={index} className="relative w-full bg-gray-100 p-2 rounded-md">
                                    <p className="text-sm truncate">{element?.name}</p>
                                    <button
                                        className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition duration-300 ease-in-out"
                                        onClick={() => deleteFile(index)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-4">
                            {createdFiles?.files?.map((element, index) => (
                                <div key={index} className="relative w-full space-y-2">
                                    <p>{element?.name}</p>
                                    <iframe
                                        srcDoc={element.content}
                                        style={{ width: '100%', height: 'auto', border: '1px solid #ccc', borderRadius: '4px' }}
                                    />
                                    <button
                                        className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition duration-300 ease-in-out"
                                        onClick={() => deleteCreatedFile(index)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>

                        <FormError message={errMsg} />
                        <FormSuccess message={successMsg} />

                        <MaterialBtn
                            sx={{ background: '#00796B', color: 'white', py: 2, ":hover": { background: '#004D40' } }}
                            type="submit"
                            fullWidth
                        >
                            Create Post
                        </MaterialBtn>
                    </form>
                </div>

            </div>
        </>
    );
};

export default CreateAssignment;