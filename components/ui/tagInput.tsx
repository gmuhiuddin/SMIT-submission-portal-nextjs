import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

interface Tag {
  id: string;
  value: string;
}

interface TagInputProps {
  tags: Tag[];
  setTags: (newTags: Tag[]) => void;
}

const TagInputComponent: React.FC<TagInputProps> = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddTag = (tag: string) => {

    if (tag && !tags.find(t => t.value === tag) && tag.includes("@")) {
      setTags([...tags, { id: tag, value: tag }]);
    }
  };

  const handleDelete = (tag: Tag) => {
    setTags(tags.filter(t => t.id !== tag.id));
  };

  const handleTagClick = (tag: Tag) => {
    handleDelete(tag);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      handleAddTag(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="flex flex-col items-start justify-center gap-2 ">
      <div className="flex border border-slate-500 w-full flex-row flex-wrap gap-2.5 rounded-md bg-white px-3 py-2 text-magnum-700 focus:border-flate-950">
        {tags.map(t => (
          <div
            key={t.id}
            className="flex items-center overflow-hidden rounded-md bg-magnum-200 text-magnum-900 break-all cursor-pointer"
            onClick={() => handleTagClick(t)} // Click handler for deleting tags
          >
            <span className="flex items-center border-r border-white/10 px-1.5">{t.value}</span>
            <FaTimes
              className="ml-2 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation(); 
                handleDelete(t);
              }}
            />
          </div>
        ))}
        <input
          type="text"
          placeholder="Enter emails..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="min-w-[4.5rem] shrink grow basis-0 border-0 text-black outline-none focus:!ring-0 text-magnum-700"
        />
      </div>
    </div>
  );
};

export default TagInputComponent;
