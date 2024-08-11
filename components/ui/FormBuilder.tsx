// import { Dispatch, SetStateAction, useState } from 'react';
// import styled from 'styled-components';

// type FieldType = 'text' | 'number' | 'files' | 'images' | 'file' | 'image' | 'radio' | 'checkbox' | 'select';

// interface Field {
//     id: number;
//     label: string;
//     type: FieldType;
//     required: boolean;
//     options?: string[];
// }

// interface FormBuilder {
//     closeFormBuilder: () => void;
//     fields: Field[];
//     setFields: Dispatch<SetStateAction<Field[]>>;
// }

// const Container = styled.div`
//   max-width: 800px;
//   margin: 0 auto;
//   padding: 20px;
// `;

// const FormBuilderWrapper = styled.div`
//   background-color: #f9f9f9;
//   padding: 20px;
//   border-radius: 8px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
// `;

// const Title = styled.h2`
//   margin-bottom: 20px;
//   font-size: 24px;
//   color: #333;
// `;

// const FormControl = styled.div`
//   margin-bottom: 20px;
// `;

// const Label = styled.label`
//   display: block;
//   margin-bottom: 5px;
//   font-weight: bold;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 10px;
//   margin-bottom: 10px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   box-sizing: border-box;
// `;

// const Select = styled.select`
//   width: 100%;
//   padding: 10px;
//   margin-bottom: 10px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   box-sizing: border-box;
// `;

// const Checkbox = styled.input`
//   margin-right: 10px;
// `;

// const AddOptionButton = styled.button`
//   padding: 10px;
//   margin-top: 10px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   background-color: #0070f3;
//   color: white;
//   cursor: pointer;
// `;

// const AddFieldButton = styled.button`
//   width: 100%;
//   padding: 10px;
//   margin-top: 10px;
//   border: none;
//   border-radius: 4px;
//   background-color: #0070f3;
//   color: white;
//   cursor: pointer;
// `;

// const FormPreview = styled.div`
//   margin-top: 40px;
// `;

// const FieldWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 20px;
// `;

// const PreviewLabel = styled.label`
//   display: block;
//   margin-bottom: 5px;
//   font-weight: bold;
// `;

// const PreviewField = styled.div`
//   flex: 1;
// `;

// const DeleteButton = styled.button`
//   padding: 10px;
//   margin-left: 10px;
//   border: none;
//   border-radius: 4px;
//   background-color: #ff4d4d;
//   color: white;
//   cursor: pointer;
// `;

// const SubmitButton = styled.button`
//   width: 100%;
//   padding: 10px;
//   border: none;
//   border-radius: 4px;
//   background-color: #0070f3;
//   color: white;
//   cursor: pointer;
// `;

// const CustomRadioWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-bottom: 10px;
// `;

// const CustomRadioLabel = styled.label`
//   display: flex;
//   align-items: center;
//   margin-bottom: 5px;
//   cursor: pointer;
// `;

// const CustomRadioInput = styled.input`
//   margin-right: 10px;
// `;

// const FileInputWrapper = styled.div`
//   position: relative;
//   overflow: hidden;
//   display: inline-block;
// `;

// const FileInputLabel = styled.label`
//   background-color: #0070f3;
//   color: white;
//   padding: 10px 20px;
//   border-radius: 4px;
//   cursor: pointer;
// `;

// const FileInput = styled.input`
//   position: absolute;
//   left: 0;
//   top: 0;
//   opacity: 0;
//   cursor: pointer;
// `;

// const OptionWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 5px;
// `;

// const OptionInput = styled.input`
//   flex: 1;
//   padding: 10px;
//   margin-right: 10px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   box-sizing: border-box;
// `;

// const OptionDeleteButton = styled.button`
//   padding: 10px;
//   border: none;
//   border-radius: 4px;
//   background-color: #ff4d4d;
//   color: white;
//   cursor: pointer;
// `;

// const FormBuilder: React.FC<FormBuilder> = ({ fields, setFields, closeFormBuilder }) => {
//     const [nextId, setNextId] = useState(1);
//     const [newField, setNewField] = useState<Field>({
//         id: 0,
//         label: '',
//         type: 'text',
//         required: false,
//         options: [],
//     });

//     const addField = () => {
//         if (!newField.label) {
//             alert('Label is required');
//             return;
//         }
//         setFields([...fields, { ...newField, id: nextId }]);
//         setNextId(nextId + 1);
//         setNewField({
//             id: 0,
//             label: '',
//             type: 'text',
//             required: false,
//             options: [],
//         });
//     };

//     const deleteField = (id: number) => {
//         setFields(fields.filter((field) => field.id !== id));
//     };

//     const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         const { name, value, type } = e.target;
//         const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : false;
//         setNewField({
//             ...newField,
//             [name]: type === 'checkbox' ? checked : value,
//         });
//     };

//     const handleOptionsChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
//         const newOptions = newField.options ? [...newField.options] : [];
//         newOptions[index] = e.target.value;
//         setNewField({ ...newField, options: newOptions });
//     };

//     const deleteOption = (index: number) => {
//         const newOptions = newField.options ? [...newField.options] : [];
//         newOptions.splice(index, 1);
//         setNewField({ ...newField, options: newOptions });
//     };

//     return (
//         <div className='h-screen pt-20 w-full'>
//             <Container>
//                 <FormBuilderWrapper>
//                     <Title>Form Builder</Title>
//                     <FormControl>
//                         <Label>
//                             Label: <span style={{ color: 'red' }}>*</span>
//                             <Input
//                                 type="text"
//                                 name="label"
//                                 value={newField.label}
//                                 onChange={handleFieldChange}
//                                 required
//                             />
//                         </Label>
//                         <Label>
//                             Type:
//                             <Select name="type" value={newField.type} onChange={handleFieldChange}>
//                                 <option value="text">Text</option>
//                                 <option value="number">Number</option>
//                                 <option value="file">File</option>
//                                 <option value="Multiple Files">Multiple Files</option>
//                                 <option value="image">Image</option>
//                                 <option value="Multiple Images">Multiple Images</option>
//                                 <option value="radio">Radio</option>
//                                 <option value="checkbox">Checkbox</option>
//                                 <option value="select">Select</option>
//                             </Select>
//                         </Label>
//                         <Label>
//                             <Checkbox
//                                 type="checkbox"
//                                 name="required"
//                                 checked={newField.required}
//                                 onChange={handleFieldChange}
//                             />
//                             Required
//                         </Label>
//                         {(newField.type === 'radio' || newField.type === 'select') && (
//                             <div>
//                                 <Label>Options:</Label>
//                                 {newField.options?.map((option, index) => (
//                                     <OptionWrapper key={index}>
//                                         <OptionInput
//                                             type="text"
//                                             value={option}
//                                             onChange={(e) => handleOptionsChange(e, index)}
//                                         />
//                                         <OptionDeleteButton type="button" onClick={() => deleteOption(index)}>
//                                             Delete
//                                         </OptionDeleteButton>
//                                     </OptionWrapper>
//                                 ))}
//                                 <AddOptionButton
//                                     type="button"
//                                     onClick={() =>
//                                         setNewField({ ...newField, options: [...(newField.options || []), ''] })
//                                     }
//                                 >
//                                     Add Option
//                                 </AddOptionButton>
//                             </div>
//                         )}
//                         <AddFieldButton type="button" onClick={addField}>
//                             Add Field
//                         </AddFieldButton>
//                     </FormControl>
//                 </FormBuilderWrapper>

//                 <FormPreview>
//                     <Title>Form Preview</Title>
//                     {/* <form onSubmit={(e) => e.preventDefault()}> */}
//                         {fields.map((field) => (
//                             <FieldWrapper key={field.id}>
//                                 <PreviewField>
//                                     <PreviewLabel>
//                                         {field.label}
//                                         {field.required && ' *'}
//                                         {field.type === 'text' && <Input type="text" required={field.required} />}
//                                         {field.type === 'number' && <Input type="number" required={field.required} />}
//                                         {field.type === 'file' && (
//                                             <FileInputWrapper>
//                                                 <FileInputLabel htmlFor={`file-${field.id}`}>Choose File</FileInputLabel>
//                                                 <FileInput type="file" id={`file-${field.id}`} required={field.required} />
//                                             </FileInputWrapper>
//                                         )}
//                                         {field.type === 'image' && (
//                                             <FileInputWrapper>
//                                                 <FileInputLabel htmlFor={`image-${field.id}`}>Choose Image</FileInputLabel>
//                                                 <FileInput type="file" accept="image/*" id={`image-${field.id}`} required={field.required} />
//                                             </FileInputWrapper>
//                                         )}
//                                         {field.type === 'radio' && (
//                                             <CustomRadioWrapper>
//                                                 {field.options?.map((option, index) => (
//                                                     <CustomRadioLabel key={index}>
//                                                         <CustomRadioInput
//                                                             type="radio"
//                                                             name={`radio-${field.id}`}
//                                                             required={field.required}
//                                                         />
//                                                         {option}
//                                                     </CustomRadioLabel>
//                                                 ))}
//                                             </CustomRadioWrapper>
//                                         )}
//                                         {field.type === 'checkbox' && <Checkbox type="checkbox" required={field.required} />}
//                                         {field.type === 'select' && (
//                                             <Select required={field.required}>
//                                                 {field.options?.map((option, index) => (
//                                                     <option key={index} value={option}>
//                                                         {option}
//                                                     </option>
//                                                 ))}
//                                             </Select>
//                                         )}
//                                     </PreviewLabel>
//                                 </PreviewField>
//                                 <DeleteButton type="button" onClick={() => deleteField(field.id)}>
//                                     Delete
//                                 </DeleteButton>
//                             </FieldWrapper>
//                         ))}
//                         <SubmitButton onClick={closeFormBuilder}>Submit</SubmitButton>
//                     {/* </form> */}
//                 </FormPreview>
//             </Container>
//         </div>
//     );
// };

// export default FormBuilder;

"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import FormBuilder from "@/components/ui/FormBuilder";

type FieldType =
    | "url"
    | "text"
    | "image"
    | "file"
    | "images"
    | "files"
    | "number"
    | "radio"
    | "checkbox"
    | "select";

interface Field {
    id: number;
    label: string;
    type: FieldType;
    required: boolean;
    options?: string[];
}

interface DynamicForm {
    closeFormBuilder: () => void;
    fields: Field[];
    setFields: Dispatch<SetStateAction<Field[]>>;
}

const DynamicFormPage: React.FC<DynamicForm> = ({ setFields, fields, closeFormBuilder }) => {
    const [formSuccess, setFormSuccess] = useState<boolean>(false);

    const handleAddField = () => {
        const newField: Field = {
            id: fields.length + 1,
            label: "",
            type: "text",
            required: false,
        };
        setFields([...fields, newField]);
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        closeFormBuilder();
    };

    const handleFieldChange = (id: number, key: keyof Field, value: any) => {
        setFields((prevFields) =>
            prevFields.map((field) =>
                field.id === id ? { ...field, [key]: value } : field
            )
        );
    };

    const handleRemoveField = (id: number) => {
        setFields((prevFields) => prevFields.filter((field) => field.id !== id));
    };

    return (
        <div className="container class-room-main-container cmx-auto p-8 flex flex-col items-center">
            <form onSubmit={handleFormSubmit}>
                {fields.length ?
                    fields.map((field: any) => (
                        <div key={field.id} className="space-y-4 border p-4 rounded">
                            <div>
                                <label className="block text-lg font-medium">
                                    Field Label
                                    <input
                                        type="text"
                                        value={field.label}
                                        onChange={(e) =>
                                            handleFieldChange(field.id, "label", e.target.value)
                                        }
                                        className="mt-2 w-full p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </label>
                            </div>

                            <div>
                                <label className="block text-lg font-medium">
                                    Field Type
                                    <select
                                        value={field.type}
                                        onChange={(e) =>
                                            handleFieldChange(
                                                field.id,
                                                "type",
                                                e.target.value as FieldType
                                            )
                                        }
                                        className="mt-2 w-full p-2 border border-gray-300 rounded"
                                        required
                                    >
                                        <option value="text">Text</option>
                                        <option value="url">URL</option>
                                        <option value="number">Number</option>
                                        <option value="file">File</option>
                                        <option value="image">Image</option>
                                        <option value="Multiple Files">Multiple Files</option>
                                        <option value="Multiple Images">Multiple Images</option>
                                        <option value="radio">Radio</option>
                                        <option value="checkbox">Checkbox</option>
                                        <option value="select">Select/Option</option>
                                    </select>
                                </label>
                            </div>

                            {["radio", "select"].includes(field.type) && (
                                <div>
                                    <label className="block text-lg font-medium">
                                        Options (comma separated)
                                        <input
                                            type="text"
                                            value={field.options?.join(",") || ""}
                                            onChange={(e) =>
                                                handleFieldChange(
                                                    field.id,
                                                    "options",
                                                    e.target.value.split(",")
                                                )
                                            }
                                            className="mt-2 w-full p-2 border border-gray-300 rounded"
                                        />
                                    </label>
                                </div>
                            )}

                            <div className="flex justify-between items-center">
                                <label className="block text-lg font-medium">
                                    Required
                                    <input
                                        type="checkbox"
                                        checked={field.required}
                                        onChange={(e) =>
                                            handleFieldChange(field.id, "required", e.target.checked)
                                        }
                                        className="ml-2"
                                    />
                                </label>
                                <Button
                                    type="button"
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={() => handleRemoveField(field.id)}
                                >
                                    Remove Field
                                </Button>
                            </div>
                        </div>
                    ))
                    :
                    "No fields please add a fields"
                }

                <div>
                    <Button
                        type="button"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={handleAddField}
                    >
                        Add Field
                    </Button>

                    <Button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded mt-8 ml-2"
                    >
                        Submit Form
                    </Button>
                </div>
            </form>
            {/* <h1 className="text-3xl font-bold mb-8">Create Your Form</h1>
      <form onSubmit={handleFormSubmit} className="space-y-8">
        <div>
          <label className="block text-lg font-medium">
            Form Title
            <input
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="mt-2 w-full p-2 border border-gray-300 rounded"
              required
            />
          </label>
        </div>

        <div>
          <label className="block text-lg font-medium">
            Form Description
            <textarea
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              className="mt-2 w-full p-2 border border-gray-300 rounded"
              rows={4}
            />
          </label>
        </div>

        
      </form> */}

            {
                formSuccess && (
                    <div className="mt-8 p-4 border border-green-500 rounded bg-green-100">
                        <p>Form submitted successfully!</p>
                    </div>
                )
            }
        </div >
    );
};

export default DynamicFormPage;