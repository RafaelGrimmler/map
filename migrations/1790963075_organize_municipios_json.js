const fs = require('fs');
const path = require('path');

const municipiosFilePath = path.join(__dirname, '../src/files/municipios.json');

const states = {
  11: { state_name: 'Rondônia', state_name_acronym: 'RO' },
  12: { state_name: 'Acre', state_name_acronym: 'AC' },
  13: { state_name: 'Amazonas', state_name_acronym: 'AM' },
  14: { state_name: 'Roraima', state_name_acronym: 'RR' },
  15: { state_name: 'Pará', state_name_acronym: 'PA' },
  16: { state_name: 'Amapá', state_name_acronym: 'AP' },
  17: { state_name: 'Tocantins', state_name_acronym: 'TO' },
  21: { state_name: 'Maranhão', state_name_acronym: 'MA' },
  22: { state_name: 'Piauí', state_name_acronym: 'PI' },
  23: { state_name: 'Ceará', state_name_acronym: 'CE' },
  24: { state_name: 'Rio Grande do Norte', state_name_acronym: 'RN' },
  25: { state_name: 'Paraíba', state_name_acronym: 'PB' },
  26: { state_name: 'Pernambuco', state_name_acronym: 'PE' },
  27: { state_name: 'Alagoas', state_name_acronym: 'AL' },
  28: { state_name: 'Sergipe', state_name_acronym: 'SE' },
  29: { state_name: 'Bahia', state_name_acronym: 'BA' },
  31: { state_name: 'Minas Gerais', state_name_acronym: 'MG' },
  32: { state_name: 'Espírito Santo', state_name_acronym: 'ES' },
  33: { state_name: 'Rio de Janeiro', state_name_acronym: 'RJ' },
  35: { state_name: 'São Paulo', state_name_acronym: 'SP' },
  41: { state_name: 'Paraná', state_name_acronym: 'PR' },
  42: { state_name: 'Santa Catarina', state_name_acronym: 'SC' },
  43: { state_name: 'Rio Grande do Sul', state_name_acronym: 'RS' },
  50: { state_name: 'Mato Grosso do Sul', state_name_acronym: 'MS' },
  51: { state_name: 'Mato Grosso', state_name_acronym: 'MT' },
  52: { state_name: 'Goiás', state_name_acronym: 'GO' },
  53: { state_name: 'Distrito Federal', state_name_acronym: 'DF' },
};

try {
  const fileContent = fs.readFileSync(municipiosFilePath, 'utf8');

  // Remove BOM caso o arquivo possua
  const cleanFileContent = fileContent.replace(/^\uFEFF/, '');

  const municipios = JSON.parse(cleanFileContent);

  if (!Array.isArray(municipios)) {
    throw new Error('municipios.json deve conter um array.');
  }

  const updatedMunicipios = municipios.map((municipio) => {
    const state = states[String(municipio.codigo_uf)];

    return {
      name: municipio.nome,
      latitude: municipio.latitude,
      longitude: municipio.longitude,
      radius: 1000,
      inactive: false,
      state: {
        name: state?.state_name ?? 'Unknown',
        abbr: state?.state_name_acronym ?? 'Unknown',
      },
    };
  });

  fs.writeFileSync(
    municipiosFilePath,
    JSON.stringify(updatedMunicipios, null, 2),
    'utf8',
  );

  console.log(
    `Migration concluída: ${updatedMunicipios.length} municípios atualizados.`,
  );
} catch (error) {
  console.error('Erro ao executar migration:', error.message);

  process.exitCode = 1;
}
