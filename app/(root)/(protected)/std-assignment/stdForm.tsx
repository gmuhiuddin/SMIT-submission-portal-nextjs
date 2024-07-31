"use client"

import React from "react";

interface StdFormInterface {
    assignment: any
}

const StdForm: React.FC<StdFormInterface> = ({ assignment }) => {

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fields = e.target as HTMLFormElement;

        const fieldsOfAssignment = assignment.assignment.formFields;

        const formDate = new FormData();

        fieldsOfAssignment.forEach((element: any, index: number) => {
            if(element.type == "file" || element.type == "image"){
                const file = fields[index] as HTMLInputElement;
                if(file.files?.length){
                    formDate.append(element.id, file.files[0]);
                };
            }else{
                formDate.append(element.id, (fields[index] as HTMLInputElement).value);
            };
        });

        console.log((fields[0] as HTMLInputElement).value, fieldsOfAssignment, formDate.get("1"));
    };

    return (
        <form onSubmit={handleFormSubmit}>
            {assignment.assignment.formFields.map((field: any, index: number) => {
                // console.log(element);

                return (
                    <div key={field.id} className="field-wrapper">
                        <div className="preview-field">
                            <label className="preview-label">
                                {field.label}
                                {field.required && ' *'}
                                {field.type === 'text' && <input type="text" required={field.required} />}
                                {field.type === 'number' && <input type="number" required={field.required} />}
                                {field.type === 'file' && (
                                    <div className="file-input-wrapper">
                                        <label className="file-input-label" htmlFor={`file-${field.id}`}>Choose File</label>
                                        <input type="file" id={`file-${field.id}`} required={field.required} />
                                    </div>
                                )}
                                {field.type === 'image' && (
                                    <div className="file-input-wrapper">
                                        <label className="file-input-label" htmlFor={`image-${field.id}`}>Choose Image</label>
                                        <input type="file" accept="image/*" id={`image-${field.id}`} required={field.required} />
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
                )
            })}
            <button type="submit">Submit</button>
        </form>
    );
};

export default StdForm;