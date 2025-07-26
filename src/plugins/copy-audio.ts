import type { AstroIntegration } from 'astro';
import { existsSync, promises as fs } from 'fs';
import path from 'path';

async function ensureDir(dir: string): Promise<void> {
  if (!existsSync(dir)) {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function findFiles(dir: string, ext: string): Promise<string[]> {
  let results: string[] = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const subResults = await findFiles(fullPath, ext);
      results = results.concat(subResults);
    } else if (entry.isFile() && entry.name.endsWith(ext)) {
      results.push(fullPath);
    }
  }
  
  return results;
}

export default function copyAudioFiles(): AstroIntegration {
  return {
    name: 'copy-audio-files',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        try {
          const srcDir = path.resolve(process.cwd(), 'src');
          const outputDir = dir.pathname;

          console.log(`Searching for MP3 files in ${srcDir}...`);
          const mp3Files = await findFiles(srcDir, '.mp3');
          
          logger.info(`Found ${mp3Files.length} MP3 files to copy`);

          for (const file of mp3Files) {
            const relativePath = path.relative(srcDir, file);
            console.log(`Copying ${relativePath} to output directory...`);
            const srcPath = path.join(srcDir, relativePath);
            const destPath = path.join(outputDir, relativePath);
            const destDir = path.dirname(destPath);

            await ensureDir(destDir);

            await fs.copyFile(srcPath, destPath);
            logger.info(`Copied ${relativePath} to output directory`);
          }

          logger.info(`Successfully copied ${mp3Files.length} MP3 files`);
        } catch (error) {
          logger.error(`Error copying MP3 files: ${error}`);
        }
      },
      
      'astro:server:setup': ({ server, logger }) => {
        server.middlewares.use((req, res, next) => {
          const url = req.url;
          
          if (url && url.endsWith('.mp3')) {
            const srcPath = path.join(process.cwd(), 'src', url);
            
            if (existsSync(srcPath)) {
              res.setHeader('Content-Type', 'audio/mpeg');
              fs.readFile(srcPath)
                .then(data => {
                  res.end(data);
                  logger.info(`Served MP3 file: ${url}`);
                })
                .catch(err => {
                  logger.error(`Error serving MP3 file: ${err}`);
                  next();
                });
              return;
            }
          }
          
          next();
        });
        
        logger.info('MP3 file middleware enabled for development server');
      }
    },
  };
}
