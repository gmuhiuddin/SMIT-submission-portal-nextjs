"use client"

import { addSubmission } from "@/lib/actions/auth/submission";
import { useSession } from "next-auth/react";
import React, { ChangeEvent, useState } from "react";

interface StdFormInterface {
    assignment: any
}

interface Images {
    files: File[];
}

const StdForm: React.FC<StdFormInterface> = ({ assignment }) => {

    const { data: session, status, update } = useSession({ required: true });
    const user = session?.user;

    const [submissionFields, setSubmissionFields] = useState<any>({});
    const [files, setFiles] = useState<Images>({ files: [] });
    const [images, setImages] = useState<Images>({ files: [] });
    const [err, setErr] = useState("");

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // const submissionRes = await addSubmission({
        //     formFieldsReply: formDate,
        //     student: user?._id as string,
        //     assignment: assignment.assignment._id,
        // });
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
                reader.readAsDataURL(file);
            }
        }
    };

    const deleteImg = (index: number) => {
        images.files.splice(index, 1);
    };

    const deleteFile = (index: number) => {
        files.files.splice(index, 1);
    };

    const handleChangeInput = (value: any, id: any) => {
        const copySbmFld = [...submissionFields];

        copySbmFld[id] = value;

        setSubmissionFields(copySbmFld);
    };

    const handleMultipleImgChange = (value: any, id: any) => {
        const copySbmFld = [...submissionFields];

        const files = copySbmFld[id] || [];

        files.push(value);

        copySbmFld[id] = files;

        setSubmissionFields(copySbmFld);
    };

    return (
        <form onSubmit={handleFormSubmit}>
            {assignment.assignment.formFields.map((field: any, index: number) => {

                return (
                    <div key={field.id} className="field-wrapper">
                        <div className="preview-field">
                            <label className="preview-label">
                                {field.label}
                                {field.required && ' *'}
                                {field.type === 'text' && <input type="text" required={field.required} onChange={(e) => handleChangeInput(e.target.value, field.id)} />}
                                {field.type === 'number' && <input type="number" required={field.required} onChange={(e) => handleChangeInput(e.target.value, field.id)} />}
                                {field.type === 'file' && (
                                    <div className="file-input-wrapper">
                                        <label className="file-input-label" htmlFor={`file-${field.id}`}>Choose File</label>
                                        <input onChange={(e) => handleChangeInput(e.target?.files?.length && e.target.files[0], field.id)} type="file" id={`file-${field.id}`} />
                                    </div>
                                )}
                                {field.type === 'files' && (
                                    <div className="file-input-wrapper">
                                        <label className="file-input-label" htmlFor={`file-${field.id}`}>Choose File</label>
                                        <input onChange={(e) => handleMultipleImgChange(e.target?.files?.length && e.target.files[0], field.id)} type="file" id={`file-${field.id}`} />
                                        {submissionFields[field.id].map((element: any, index: number) => {
                                            return (
                                                <>
                                                    <p>{element.name}</p>
                                                    <p onClick={() => deleteFile(index)}>x</p>
                                                </>
                                            );
                                        })}
                                    </div>
                                )}
                                {field.type === 'images' && (
                                    <div className="file-input-wrapper">
                                        <label className="file-input-label" htmlFor={`image-${field.id}`}>Choose Image</label>
                                        <input onChange={(e) => handleMultipleImgChange(e.target?.files?.length && e.target.files[0], field.id)} type="file" accept="image/*" id={`image-${field.id}`} />
                                        {submissionFields[field.id].map((element: any, index: number) => {

                                            return (
                                                <>
                                                    <img width={25} src={URL.createObjectURL(element)} />
                                                    <button onClick={() => deleteImg(index)}>x</button>
                                                </>
                                            );
                                        })}
                                    </div>
                                )}
                                {field.type === 'image' && (
                                    <div className="file-input-wrapper">
                                        <label className="file-input-label" htmlFor={`image-${field.id}`}>Choose Image</label>
                                        <input onChange={handleChangeImage} type="file" accept="image/*" id={`image-${field.id}`} />
                                    </div>
                                )}
                                {field.type === 'radio' && (
                                    <div className="custom-radio-wrapper">
                                        {field.options?.map((option: any, index: number) => (
                                            <label key={index} className="custom-radio-label">
                                                <input
                                                    type="radio"
                                                    name={`radio-${field.id}`}
                                                    required={field.required}
                                                />
                                                {option}
                                            </label>
                                        ))}
                                    </div>
                                )}
                                {field.type === 'checkbox' && <input type="checkbox" required={field.required} />}
                                {field.type === 'select' && (
                                    <select required={field.required}>
                                        {field.options?.map((option: any, index: number) => (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </label>
                        </div>
                    </div>
                    // <div className="flex items-center p-4 border border-gray-300 rounded-lg shadow-md bg-white my-3">
                    //     <img src={element.image} alt={element.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                    //     <div>
                    //         <span className="block text-lg font-semibold">{element.name}  
                    //             <button
                    //             //   onClick={sendWarningToStudent}
                    //             className="text-yellow-500 hover:text-yellow-700"
                    //         >
                    //             <FaExclamationTriangle className="ml-20 w-4 h-4" />
                    //         </button>
                    //             <button
                    //                 //   onClick={onDelete}
                    //                 className="text-red-500 hover:text-red-700"
                    //             >
                    //                 <FaTrash className="ml-2 w-4 h-4" />
                    //             </button>
                    //         </span>
                    //         <span className="block text-sm text-gray-500">{element.email}</span>
                    //     </div>
                    // </div>
                );
            })}
            <button type="submit">Submit</button>
        </form>
    );
};

export default StdForm;