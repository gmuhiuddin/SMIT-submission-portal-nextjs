import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from "draftjs-to-html";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button } from "@/components/ui/button";
import Link from "next/link";

const MySwal = withReactContent(Swal);

const Editor = dynamic(() => import('react-draft-wysiwyg').then(mod => mod.Editor), { ssr: false });

interface Files {
    files: {
        name?: string;
        type?: string;
        content?: string;
    }[]
}

interface RichTextEditor {
    setCreatedFiles: (data: { name: string; type: string; content: string }) => void;
    closeRichEditor: () => void;
}

const RichTextExample: React.FC<RichTextEditor> = ({ setCreatedFiles, closeRichEditor }) => {
    const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
    const [errMsg, setErrMsg] = useState<string>("");

    const onEditorStateChange = (newEditorState: EditorState): void => {
        setEditorState(newEditorState);
    };

    const handleSaveChanges = () => {
        const fileName = prompt("Please enter file name");

        if (fileName && fileName.length >= 3) {
            const rawContentState = convertToRaw(editorState.getCurrentContent());
            const fileHtml = draftToHtml(rawContentState);

            setCreatedFiles({
                type: "text/html",
                name: `${fileName}.txt`,
                content: fileHtml
            });

            closeRichEditor();
        } else {
            setErrMsg("File name must be at least 3 charachters")
        };
    };

    const handleExitEditor = () => {
        const isExitConfirm = confirm("Discard changes");

        if (isExitConfirm) {
            closeRichEditor();
        };
    };

    return (
        <>
            <Button
                onClick={handleExitEditor}
                size="lg"
                className="mt-16 absolute left-3 top-3 text-white px-4 py-2 rounded-md"
            >
            Discard
            </Button>
            <div className='w-full h-full pt-28 px-5'>
                <Editor
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChange}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class shadow-sm p-1"
                    toolbarClassName="toolbar-class"
                />
                <button className='block ml-auto p-3 my-3 bg-black rounded text-white' onClick={handleSaveChanges}>Upload file</button>
            </div>
        </>
    );
};

export default RichTextExample;