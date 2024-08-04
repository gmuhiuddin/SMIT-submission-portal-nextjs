"use client"

import { addSubmission } from "@/lib/actions/auth/submission";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import StdUpdateForm from "./submissionUpdateForm";

interface StdFormInterface {
    fields: any;
    sumbissionFields: any;
}

const StdFormDisplay: React.FC<StdFormInterface> = ({ fields, sumbissionFields }) => {

    const { data: session, status, update } = useSession({ required: true });
    const user = session?.user;

    const [isUpdate, setIsUpdate] = useState(false);

    // const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     const fields = e.target as HTMLFormElement;

    //     const fieldsOfAssignment = assignment.assignment.formFields;

    //     const formDate = new FormData();

    //     fieldsOfAssignment.forEach((element: any, index: number) => {
    //         if (element.type == "file" || element.type == "image") {
    //             const file = fields[index] as HTMLInputElement;
    //             if (file.files?.length) {
    //                 formDate.append(element.id, file.files[0]);
    //             };
    //         } else {
    //             formDate.append(element.id, (fields[index] as HTMLInputElement).value);
    //         };
    //     });

    //     const submissionRes = await addSubmission({
    //         formFieldsReply: formDate,
    //         student: user?._id as string,
    //         assignment: assignment.assignment._id,
    //     });

    //     console.log(submissionRes);

    // };

    return (
        <>
            {isUpdate ?
                <StdUpdateForm fields={fields} submissionFields={sumbissionFields} />
                :
                fields.map((field: any, index: number) => (
                    <div key={field.id} className="field-wrapper">
                        <div className="preview-field">
                            <label className="preview-label">
                                {field.label}
                                {field.required && ' *'}
                                {field.type === 'text' && <input type="text"
                                    value={sumbissionFields[index].res}
                                    disabled required={field.required} />}
                                {field.type === 'number' && <input disabled type="number"
                                    value={sumbissionFields[index].res}
                                    required={field.required} />}
                                {field.type === 'file' && (
                                    <div className="file-input-wrapper">
                                        <label className="file-input-label" htmlFor={`file-${field.id}`}>File</label>
                                        <p>{sumbissionFields[index].name}</p>
                                    </div>
                                )}
                                {field.type === 'image' && (
                                    <div className="file-input-wrapper">
                                        <label className="file-input-label" htmlFor={`image-${field.id}`}>Image</label>
                                        <p>{sumbissionFields[index].name}</p>

                                    </div>
                                )}
                                {field.type === 'radio' && (
                                    <div className="custom-radio-wrapper">
                                        {field.options?.map((option: any, index: number) => (
                                            <label key={index} className="custom-radio-label">
                                                <input
                                                    disabled
                                                    type="radio"
                                                    value={sumbissionFields[index].res}
                                                    name={`radio-${field.id}`}
                                                    required={field.required}
                                                />
                                                {option}
                                            </label>
                                        ))}
                                    </div>
                                )}
                                {field.type === 'checkbox' && <input type="checkbox"
                                    value={sumbissionFields[index].res}
                                    required={field.required} />}
                                {field.type === 'select' && (
                                    <select
                                        value={sumbissionFields[index].res}
                                        disabled required={field.required}>
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
                ))
            }
        </>
    );
};

export default StdFormDisplay;