import AdmZip from 'adm-zip';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const zip = new AdmZip();
const pluginDir = join(rootDir, 'wordpress', 'cpc-calculator');

// Add plugin directory contents to zip
zip.addLocalFolder(pluginDir, 'marketing-calculators');

// Write zip file
zip.writeZip(join(rootDir, 'wordpress', 'marketing-calculators.zip'));

console.log('WordPress plugin zip created successfully!');