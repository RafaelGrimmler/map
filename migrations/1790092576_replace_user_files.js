const fs = require('fs');
const path = require('path');

const currentMapFolderPath = path.join(__dirname, '../src/files/maps');
const usersFolderPath = path.join(__dirname, '../src/files/users');

try {
  // Cria a pasta users caso ela ainda não exista
  if (!fs.existsSync(usersFolderPath)) {
    fs.mkdirSync(usersFolderPath, { recursive: true });
    console.log(`Pasta criada: ${usersFolderPath}`);
  }

  // Busca os arquivos da pasta maps
  const fileNames = fs.readdirSync(currentMapFolderPath);

  console.log('Arquivos encontrados:');

  fileNames.forEach(fileName => {
    console.log(`- ${fileName}`);
  });

  // Processa apenas arquivos JSON
  const jsonFiles = fileNames.filter(fileName => {
    return path.extname(fileName).toLowerCase() === '.json';
  });

  jsonFiles.forEach(fileName => {
    const filePath = path.join(currentMapFolderPath, fileName);

    try {
      // Lê o JSON original
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const userData = JSON.parse(fileContent);

      const {
        userMap,
        image,
        name,
        youtube,
        vehicle,
        lines
      } = userData;

      // Validação básica
      if (!userMap) {
        console.warn(
          `Arquivo ${fileName} ignorado: propriedade "userMap" não encontrada.`
        );
        return;
      }

      // Cria a pasta do usuário
      const userFolderPath = path.join(usersFolderPath, userMap);

      if (!fs.existsSync(userFolderPath)) {
        fs.mkdirSync(userFolderPath, { recursive: true });
        console.log(`\nPasta de usuário criada: ${userMap}`);
      } else {
        console.log(`\nPasta de usuário já existe: ${userMap}`);
      }

      // --------------------------------
      // profile.json
      // --------------------------------

      const profile = {
        name,
        youtube,
        image
      };

      const profilePath = path.join(userFolderPath, 'profile.json');

      fs.writeFileSync(
        profilePath,
        JSON.stringify(profile, null, 2),
        'utf8'
      );

      // --------------------------------
      // map.json
      // --------------------------------

      const map = {
        lines
      };

      const mapPath = path.join(userFolderPath, 'map.json');

      fs.writeFileSync(
        mapPath,
        JSON.stringify(map, null, 2),
        'utf8'
      );

      // --------------------------------
      // vehicles.json
      // --------------------------------

      const vehicles = [
        {
          name: vehicle
        }
      ];

      const vehiclesPath = path.join(userFolderPath, 'vehicles.json');

      fs.writeFileSync(
        vehiclesPath,
        JSON.stringify(vehicles, null, 2),
        'utf8'
      );

      console.log(`  ✓ profile.json`);
      console.log(`  ✓ map.json`);
      console.log(`  ✓ vehicles.json`);
    } catch (error) {
      console.error(
        `Erro ao processar o arquivo ${fileName}:`,
        error.message
      );
    }
  });

  console.log('\nMigração concluída.');
} catch (error) {
  console.error('Erro ao executar o script:', error.message);
}