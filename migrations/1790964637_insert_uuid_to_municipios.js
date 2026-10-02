const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');

const municipiosFilePath = path.join(__dirname, '../src/files/municipios.json');

try {
  const fileContent = fs.readFileSync(municipiosFilePath, 'utf8');

  const municipios = JSON.parse(fileContent.replace(/^\uFEFF/, ''));

  if (!Array.isArray(municipios)) {
    throw new Error('municipios.json deve conter um array.');
  }

  const updatedMunicipios = municipios.map((municipio) => ({
    id: randomUUID(),
    ...municipio,
  }));

  fs.writeFileSync(
    municipiosFilePath,
    JSON.stringify(updatedMunicipios, null, 2),
    'utf8',
  );

  console.log(
    `Migration concluída: ${updatedMunicipios.length} municípios receberam UUID.`,
  );
} catch (error) {
  console.error('Erro ao executar migration:', error.message);

  process.exitCode = 1;
}
