import React, {useEffect, useState} from 'react'
import { Link } from 'react-router'
import ScoreCircle from './ScoreCircle'
import { usePuterStore } from '~/lib/puter';

const ResumeCard = ({resume : {id, companyName, jobTitle, feedback, imagePath}}: {resume: Resume}) => {
    const { fs } = usePuterStore();
    const [resumeUrl, setResumeUrl] = useState('');

     useEffect(() => {
        const loadResume = async () => {
          const blob = await fs.read(imagePath);
          if(!blob) return;
          let url = URL.createObjectURL(blob);
          setResumeUrl(url);
        }
        loadResume();
      },[imagePath])

//     useEffect(() => {
//       const loadResume = async () => {
//     try {
//       const blob = await fs.read(imagePath);
//       if (!blob) return;
//       let url = URL.createObjectURL(blob);
//       setResumeUrl(url);
//     } catch (err) {
//       console.error("Failed to load resume image:", err);
//       setResumeUrl(""); // Optionally clear the image
//     }
//   };
//   loadResume();
// }, [imagePath]);

  return (
    <Link to={`/resume/${id}`} className='resume-card animate-in fade-in duration-1000 w-92'>
        <div className='resume-card-header'>
            <div className='flex flex-col gap-2'>
            { companyName && <h2 className='!text-black font-bold break-words'>{companyName}</h2>}
            { jobTitle && <h3 className='text-lg break-words text-gray-500'>{jobTitle}</h3>}
            {!companyName && !jobTitle && <h2 className='!text-black font-bold'>Resume</h2>}
        </div>
        <div className='flex-shrink-0'>
            <ScoreCircle score = {feedback.overallScore} />
        </div>
        </div>
        {resumeUrl && (
        <div className='gradient-border animate-in fade-in duration-1000'>
            <div className='w-full h-full'>
                <img src = {resumeUrl} alt="resume" className='w-250 h-[380px] max-sm:h-[200px] object-cover object-top -mt-8 max-md:mt-2 max-mid:h-[250px]' />
            </div>
        </div>
        )}
        
    </Link>
  )
}

export default ResumeCard