const fs = require('fs');

const getLanguageStats = () => {
  const languages = {};

  // Get the list of files in the repository
  const files = fs.readdirSync('./');

  // Count the lines of code for each language
  files.forEach((file) => {
    const extension = file.split('.').pop();
    if (extension in languages) {
      languages[extension]++;
    } else {
      languages[extension] = 1;
    }
  });

  // Calculate the percentage of each language
  const totalFiles = Object.values(languages).reduce((a, b) => a + b, 0);
  for (const [language, count] of Object.entries(languages)) {
    languages[language] = ((count / totalFiles) * 100).toFixed(2);
  }

  return languages;
};

const updateReadme = () => {
  const readmePath = './README.md';
  const readmeContent = fs.readFileSync(readmePath, 'utf-8');

  // Replace the placeholder with the language stats
  const languageStats = getLanguageStats();
  let updatedReadmeContent = readmeContent.replace(
    /<!-- LANGUAGE_STATS_START -->([\s\S]*?)<!-- LANGUAGE_STATS_END -->/,
    `<!-- LANGUAGE_STATS_START -->\n${JSON.stringify(languageStats, null, 2)}\n<!-- LANGUAGE_STATS_END -->`
  );

  fs.writeFileSync(readmePath, updatedReadmeContent, 'utf-8');
};

updateReadme();
