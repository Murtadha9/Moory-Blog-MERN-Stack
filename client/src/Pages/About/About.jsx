
import React from 'react'

const About = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-4xl text-red-300 font font-semibold text-center my-7'>
             Moory Blog
          </h1>
          <h1 className='text-2xl text-yellow-200 font font-semibold text-center my-7'>
          Programming Quotes
          </h1>
          <div className='text-md text-gray-500 flex flex-col gap-6'>
            <p>
            The best programs are written so that computing machines can perform them quickly and so that
             human beings can understand them clearly
            . A programmer is ideally an essayist who works with traditional aesthetic
             and literary forms as well as mathematical concepts, to communicate 
            the way that an algorithm works and to convince a reader that the results will be correct.
            </p>

            <p>
            Truth can only be found in one place: the code
            </p>

            <p>
            The computer programmer is a creator of universes for which he alone is the lawgiver.
             No playwright, no stage director, no emperor, however powerful, has ever exercised 
             such absolute authority to arrange a stage or field of battle and to command such
              unswervingly dutiful actors or troops.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About
