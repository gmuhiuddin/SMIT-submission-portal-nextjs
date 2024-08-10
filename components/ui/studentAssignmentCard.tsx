import React, { useState } from 'react';
import { Button, Typography, IconButton } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Link from 'next/link';

interface StudentAssignmentCardProps {
  title: string;
  description: string;
  isSubmitted: boolean;
  hasWarning: boolean;
  astId: string;
}

const StudentAssignmentCard: React.FC<StudentAssignmentCardProps> = ({ title, description, isSubmitted, hasWarning, astId }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const isLongDescription = description.length > 50;
  const truncatedDescription = description.substring(0, 50);

  return (
    <div className="w-full bg-white shadow-md rounded-lg flex flex-col p-4 mb-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">{title}</h2>
        <div className="flex items-center space-x-4">
          {hasWarning && (
            <IconButton aria-label="warning" color="error">
              <WarningAmberIcon />
            </IconButton>
          )}
          <Link href={`/std-assignment/${astId}`}>
          <Button
            variant="outlined"
            color="primary"
            className="text-blue-500 hover:text-blue-700 font-semibold border border-blue-500 hover:bg-blue-50 transition"
          >
            See Activity
          </Button>
          </Link>
        </div>
      </div>
      <Typography variant="body2" className="text-gray-700 mt-2">
        {isLongDescription ? (showMore ? description : `${truncatedDescription}... `) : description}
        {isLongDescription && (
          <span
            onClick={toggleShowMore}
            className="text-blue-500 hover:text-blue-700 cursor-pointer text-sm font-semibold"
          >
            {showMore ? 'Show Less' : 'Show More'}
          </span>
        )}
      </Typography>
      <div className="flex justify-end mt-2">
        <Typography
          variant="body2"
          className={`font-semibold ${isSubmitted ? 'text-green-600' : 'text-red-600'}`}
        >
          {isSubmitted ? 'Submitted' : 'Not Submitted'}
        </Typography>
      </div>
    </div>
  );
};

export default StudentAssignmentCard;