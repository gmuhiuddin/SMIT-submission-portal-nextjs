"use client";

import { sendCommentOnAssignment } from '@/lib/actions/auth/comment';
import { addSubmission } from '@/lib/actions/auth/submission';
import CustomAlert from '../ui/customAlert';
import React, { useState } from 'react';
import { FaBars, FaCheckCircle, FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import BlurLoader from './blurLoader';

interface AssignmentDetailProps {
  title: string;
  description: string;
  dueDate: string;
  formFields: FormField[];
  userId: string | number | any;
  astId: string | number | any;
  submission: any;
}

interface FormField {
  id: string;
  type: 'text' | 'url' | 'number' | 'select' | 'checkbox' | 'radio' | 'image' | 'Multiple Images' | 'file' | 'Multiple Files';
  label: string;
  options?: string[]; // For select, checkbox, radio
  required: boolean;
}

const AssignmentDetailPage: React.FC<AssignmentDetailProps> = ({ title, description, dueDate, formFields, astId, userId, submission }) => {
  const [formData, setFormData] = useState<any>({});
  const [comment, setComment] = useState('');
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [isCommentPending, setIsCommentPending] = useState(false);

  const date = new Date();
  const todayDate = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? 0 + String(date.getMonth() + 1) : date.getMonth() + 1}-${date.getDate() < 10 ? 0 + String(date.getDate()) : date.getDate()}`;

  const handleFieldChange = (id: string, value: any) => {
    if (!value || !id) return;
    setFormData((prevData: any) => ({ ...prevData, [id]: value }));
  };

  const handleMultipleFilesOrImagesChange = (id: string, file: any) => {
    if (!file || !id) return;

    const files = formData[id] || [];

    files.push(file);

    setFormData((prevData: any) => ({ ...prevData, [id]: files }));
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    const astFormFields = formFields;

    const sbmData = new FormData();

    astFormFields.forEach((element: any) => {
      const field = formData[element.id];

      if (element.required && !field) return setErr("All fields are required");
      if (element.type == "Multiple Images" && element.required && !field.length) return setErr("All fields are required");
      if (element.type == "Multiple Files" && element.required && !field.length) return setErr("All fields are required");

      if (element.type == "Multiple Files" || element.type == "Multiple Images") {
        const fileLength = field.length;

        sbmData.append(element.id, fileLength);

        field.forEach((file: any, index: any) => {
          sbmData.append(`${element.id}-${index}`, file);
        });
      } else {
        sbmData.append(element.id, field);
      };
    });

    const submissionRes: any = await addSubmission({
      formFieldsReply: sbmData,
      student: userId as string,
      assignment: astId,
    });

    if (submissionRes.success) {
      setSuccess("Submission sucessfully");
      window.location.reload();
    } else {
      setErr(submissionRes.error || "Some thing went wrong!");
    setIsPending(false);
    };
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCommentPending(true);
    setSuccess("");
    setErr("");

    const res = await sendCommentOnAssignment({
      postId: astId,
      txt: comment
    });

    if (res.success) {
      setComment("");
      setSuccess("Comment sent successful");
      setIsCommentPending(false);
    } else {
      setTimeout(() => {
        setComment("");
      }, 1000);
      setIsCommentPending(false);
      setErr(res.error || "Some thing went wrong!");
    };
  };

  const getFormFieldById = (id: any) => {
    return formData[id] || null;
  };

  const renderFormField = (field: FormField) => {
    switch (field.type) {
      case 'text':
      case 'url':
      case 'number':
        return (
          <input
            type={field.type}
            id={field.id}
            placeholder={field.label}
            required={field.required}
            className="border border-slate-500 px-3 py-1 rounded-md focus:outline-none focus:border-slate-950 w-full"
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
          />
        );
      case 'select':
        return (
          <select
            id={field.id}
            required={field.required}
            className="input-field block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
          >
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'checkbox':
      case 'radio':
        return (
          <div className="flex items-center space-x-4">
            {field.options?.map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type={field.type}
                  value={option}
                  className="input-field"
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );
      case 'image':
      case 'file':
        return (
          <div className="file-field">
            {getFormFieldById(field.id) && <img width={25} src={URL.createObjectURL(getFormFieldById(field.id))} alt={getFormFieldById(field.id).name} />}
            <label htmlFor={field.id} className="block text-base font-medium rounded text-gray-700 p-4 bg-[#bef264] cursor-pointer">{field.label} {field.type}{field.required && "*"}</label>
            <input
              type="file"
              id={field.id}
              accept={field.type === 'image' ? 'image/*' : '*.pdf,*.txt,*.doc,*.tiff,*.gif,*.jpeg'}
              className="hidden"
              onChange={(e) => handleFieldChange(field.id, e.target?.files?.length && e.target.files[0])}
            />
          </div>
        );
      case 'Multiple Images':
      case 'Multiple Files':
        return (
          <div className="file-field">
            <div className='w-full flex flex-grow'>
              {getFormFieldById(field.id) && getFormFieldById(field.id).map((element: any, index: number) => (<img key={index} src={URL.createObjectURL(element)} alt={element.name} />))}
            </div>
            <label htmlFor={field.id} className="block text-base font-medium rounded text-gray-700 p-4 bg-[#bef264] cursor-pointer">{field.label} {field.type == "Multiple Files" ? "files" : "images"}{field.required && "*"}</label>
            <input
              type="file"
              id={field.id}
              multiple
              accept={field.type === 'Multiple Images' ? 'image/*' : '*.pdf,*.txt,*.doc,*.tiff,*.gif,*.jpeg'}
              className="hidden"
              onChange={(e) => handleMultipleFilesOrImagesChange(field.id, e.target?.files?.length && e.target.files[0])}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const renderSubmittedField = (field: FormField, value: any) => {
    switch (field.type) {
      case 'text':
      case 'url':
      case 'number':
        return (
          <div className="submitted-field mb-4" key={field.id}>
            <label className="text-sm font-medium text-gray-700">{field.label}</label>
            <p className="text-gray-600">{value.value}</p>
          </div>
        );
      case 'select':
      case 'radio':
        return (
          <div className="submitted-field mb-4" key={field.id}>
            <label className="text-sm font-medium text-gray-700">{field.label}</label>
            <p className="text-gray-600">{value.value}</p>
          </div>
        );
      case 'checkbox':
        return (
          <div className="submitted-field mb-4" key={field.id}>
            <label className="text-sm font-medium text-gray-700">{field.label}</label>
            <ul className="list-disc list-inside">
              {value.map((option: string, index: number) => (
                <li key={index} className="text-gray-600">{option}</li>
              ))}
            </ul>
          </div>
        );
      case 'image':
      // case 'Multiple Images':
      case 'file':
        // case 'Multiple Files':
        return (
          <div className="submitted-field mb-4" key={field.id}>
            <label className="text-sm font-medium text-gray-700">{field.label}</label>
            <img width={55} src={value.url} alt={value.name} />
          </div>
        );
      case 'Multiple Images':
      case 'Multiple Files':
        return (
          <div className="submitted-field mb-4" key={field.id}>
            <label className="text-sm font-medium text-gray-700">{field.label}</label>
            {value.map((element: any, index: number) => {
              return <img key={index} src={element.url} alt={element.name} />
            })}
          </div>
        );
      default:
        return null;
    }
  };

  const getSubmitedField = (id: any) => {
    return submission.formFieldsReply.find((sbm: any) => sbm.id == id);
  };

  return (
    <div className="assignment-detail-page flex flex-col lg:flex-row w-full">
      {isPending && <BlurLoader />}
      <div className="assignment-top-content p-6 bg-white shadow-lg rounded-lg flex flex-col w-full max-[1023px]:items-center lg:w-96">
        <div className="assignment-details mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 mb-1">Description: {description}</p>
          <p className="text-gray-600 mb-1">Due Date: {dueDate}</p>
        </div>
        <div className="send-comment-section mb-6">
          <form onSubmit={handleCommentSubmit}>
            <label htmlFor="comment" className="block text-lg font-medium text-gray-700 mb-2">Add Comment</label>
            <textarea
              id="comment"
              value={comment}
              onChange={handleCommentChange}
              className="border border-slate-500 px-3 py-1 rounded-md focus:outline-none focus:border-slate-950 min-h-20 w-80 lg:w-full"
              rows={3}
              placeholder="Enter your comment"
            />
            <br />
            <button
              disabled={isCommentPending}
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4 hover:bg-blue-600 transition-all disabled:bg-blue-300"
            >
              Submit Comment
            </button>
          </form>
        </div>
      </div>

      <main className="assignment-form-container max-[1023px]:w-full flex flex-col bg-white shadow-lg rounded-lg px-12 py-4 lg:w-3/4 flex-1">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{submission ? "Your submission" : "Assignment Submission"}</h2>
        {submission ?
          <div>
            {formFields.map((field) => {
              return getSubmitedField(field.id) ? renderSubmittedField(field, getSubmitedField(field.id)) : null
            })}
          </div>
          :
          <form onSubmit={handleSubmit} >
            <div className='flex items-center flex-wrap'>
              {formFields.map((field) => (
                <div key={field.id} className="form-group m-2">
                  <p>{field.label}</p>
                  {renderFormField(field)}
                </div>
              ))}
            </div>
            <br />
            <div className="col-span-full">
              {dueDate < todayDate ?
                <p className='ml-2 text-red-500 text-lg flex items-center'><FaExclamationTriangle className='mr-2' /> Submission date due!</p>
                : <button
                  type="submit"
                  className=" bg-[#bef264] text-black font-bold py-2 px-4 rounded hover:bg-[#a3d636] transition-all ml-2"
                >
                  Submit Assignment
                </button>}
            </div>
          </form>
        }
      </main>
      {success && <CustomAlert isErrMsg={false} txt={success} />}
      {err && <CustomAlert isErrMsg={true} txt={err} />}
    </div>
  );
};

export default AssignmentDetailPage;