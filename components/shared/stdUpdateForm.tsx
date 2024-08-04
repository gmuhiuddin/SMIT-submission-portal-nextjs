"use client"

import { updateSubmission } from "@/lib/actions/auth/submission";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface StdFormInterface {
    fields: any;
    submissionFields: any;
}

const StdUpdateForm: React.FC<StdFormInterface> = ({ fields, submissionFields }) => {
    const { data: session, status, update } = useSession({ required: true });
    const user = session?.user;
    const [formData, setFormData] = useState<any>({});
    const [updateBtnDisabled, setUpdateBtnDisabled] = useState(true);
    
    useEffect(() => {
        const initialData: any = {};
        fields.forEach((field: any) => {
            if(field.type == "file" || field.type == "image"){
            initialData[field.id] = submissionFields.find((fld: any) => fld.id == field.id).url || '';
            }else{
                initialData[field.id] = submissionFields.find((fld: any) => fld.id == field.id).res || '';
            };
        }); 
        setFormData(initialData);
    }, [fields, submissionFields]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setUpdateBtnDisabled(false);
        const { id, value } = e.target;
        setFormData((prevData: any) => ({ ...prevData, [id]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdateBtnDisabled(false);
        const { id, files } = e.target;
        if (files?.length) {
            setFormData((prevData: any) => ({ ...prevData, [id]: files[0] }));
        };
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUpdateBtnDisabled(false);
        const formDate = new FormData();
        Object.keys(formData).forEach((key) => {
            formDate.append(key, formData[key]);
        });

        // Update submission
        // const submissionRes = await updateSubmission({
        //     formFieldsReply: formDate,
        //     student: user?._id as string,
        //     assignment: "submissionFields.assignmentId",
        // });

        // console.log(submissionRes);
    };

    return (
        <form onSubmit={handleFormSubmit}>
            {fields.map((field: any) => (
                <div key={field.id} className="field-wrapper">
                    <div className="preview-field">
                        <label className="preview-label">
                            {field.label}
                            {field.required && ' *'}
                            {field.type === 'text' && (
                                <input
                                    type="text"
                                    id={field.id}
                                    required={field.required}
                                    value={formData[field.id] || ''}
                                    onChange={handleInputChange}
                                />
                            )}
                            {field.type === 'number' && (
                                <input
                                    type="number"
                                    id={field.id}
                                    required={field.required}
                                    value={formData[field.id] || ''}
                                    onChange={handleInputChange}
                                />
                            )}
                            {field.type === 'file' && (
                                <div className="file-input-wrapper">
                                    <label className="file-input-label" htmlFor={`file-${field.id}`}>Choose File</label>
                                    <input
                                        type="file"
                                        id={`file-${field.id}`}
                                        required={field.required}
                                        onChange={handleFileChange}
                                    />
                                </div>
                            )}
                            {field.type === 'image' && (
                                <div className="file-input-wrapper">
                                    <label className="file-input-label" htmlFor={`image-${field.id}`}>Choose Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id={`image-${field.id}`}
                                        required={field.required}
                                        onChange={handleFileChange}
                                    />
                                </div>
                            )}
                            {field.type === 'radio' && (
                                <div className="custom-radio-wrapper">
                                    {field.options?.map((option: any, index: number) => (
                                        <label key={index} className="custom-radio-label">
                                            <input
                                                type="radio"
                                                name={`radio-${field.id}`}
                                                value={option}
                                                required={field.required}
                                                checked={formData[field.id] === option}
                                                onChange={handleInputChange}
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>
                            )}
                            {field.type === 'checkbox' && (
                                <input
                                    type="checkbox"
                                    id={field.id}
                                    required={field.required}
                                    checked={formData[field.id] || false}
                                    onChange={(e) => setFormData((prevData: any) => ({ ...prevData, [field.id]: e.target.checked }))}
                                />
                            )}
                            {field.type === 'select' && (
                                <select
                                    id={field.id}
                                    required={field.required}
                                    value={formData[field.id] || ''}
                                    onChange={handleInputChange}
                                >
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
            ))}
            <button disabled={updateBtnDisabled} type="submit">Update</button>
        </form>
    );
};

export default StdUpdateForm;