const fs = require('fs');
const path = require('path');

const citiesFilePath = path.join(__dirname, '../src/files/cities.json');

try {
  const fileContent = fs.readFileSync(citiesFilePath, 'utf8');

  const cities = JSON.parse(fileContent.replace(/^\uFEFF/, ''));

  if (!Array.isArray(cities)) {
    throw new Error('cities.json deve conter um array.');
  }

  const updatedCities = cities.map((city) => ({
    ...city,
    elevation: 4,
  }));

  fs.writeFileSync(
    citiesFilePath,
    JSON.stringify(updatedCities, null, 2),
    'utf8',
  );

  console.log(
    `Migration concluída: ${updatedCities.length} cidades atualizadas.`,
  );
} catch (error) {
  console.error('Erro ao executar migration:', error.message);

  process.exitCode = 1;
}
