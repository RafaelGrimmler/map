const fs = require('fs');
const path = require('path');

const citiesFilePath = path.join(__dirname, '../src/files/cities.json');

const southernStates = ['RS', 'SC', 'PR'];

try {
  const fileContent = fs.readFileSync(citiesFilePath, 'utf8');

  const cities = JSON.parse(fileContent.replace(/^\uFEFF/, ''));

  if (!Array.isArray(cities)) {
    throw new Error('cities.json deve conter um array.');
  }

  let deactivatedCount = 0;

  const updatedCities = cities.map((city) => {
    const shouldDeactivate =
      !southernStates.includes(city.state?.abbr) && city.elevation > 6;

    if (shouldDeactivate && city.inactive !== true) {
      deactivatedCount++;

      return {
        ...city,
        inactive: true,
      };
    }

    return city;
  });

  fs.writeFileSync(
    citiesFilePath,
    JSON.stringify(updatedCities, null, 2),
    'utf8',
  );

  console.log(`Migration concluída: ${deactivatedCount} cidades desativadas.`);
} catch (error) {
  console.error('Erro ao executar migration:', error.message);

  process.exitCode = 1;
}
