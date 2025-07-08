import fs from 'fs';
import path from 'path';

const resumeDir = path.join(process.cwd(), 'public/resume');
const outputFile = path.join(process.cwd(), 'lib/resume-info.json');

try {
  const files = fs.readdirSync(resumeDir);

  if (files.length === 0) {
    throw new Error('No resume file found in public/resume directory.');
  }

  const filename = files[0];
  const format = path.extname(filename).replace('.', '').toUpperCase();

  const resumeInfo = {
    filename,
    format,
  };

  fs.writeFileSync(outputFile, JSON.stringify(resumeInfo, null, 2));
  console.log(`Successfully created resume-info.json with file: ${filename}`);

} catch (error) {
  console.error('Error creating resume-info.json:', error.message);
  // Create a fallback file so the build doesn't fail
  const fallbackInfo = {
    filename: 'resume.pdf',
    format: 'PDF',
    error: 'File not found. Using fallback.',
  };
  fs.writeFileSync(outputFile, JSON.stringify(fallbackInfo, null, 2));
  console.log('Created a fallback resume-info.json.');
  process.exit(1); // Exit with error code to notify of the issue
} 