const fs = require('fs');
const path = require('path');

const citiesFilePath = path.join(__dirname, '../src/files/cities.json');

try {
  const fileContent = fs.readFileSync(citiesFilePath, 'utf8');

  const cities = JSON.parse(fileContent.replace(/^\uFEFF/, ''));

  if (!Array.isArray(cities)) {
    throw new Error('cities.json deve conter um array.');
  }

  let updatedCount = 0;

  const updatedCities = cities.map((city) => {
    if (city.state?.abbr === 'RS' && city.elevation === 12) {
      updatedCount++;

      return {
        ...city,
        elevation: 9,
      };
    }

    return city;
  });

  fs.writeFileSync(
    citiesFilePath,
    JSON.stringify(updatedCities, null, 2),
    'utf8',
  );

  console.log(
    `Migration concluída: ${updatedCount} cidades do RS tiveram elevation alterado de 12 para 9.`,
  );
} catch (error) {
  console.error('Erro ao executar migration:', error.message);

  process.exitCode = 1;
}
