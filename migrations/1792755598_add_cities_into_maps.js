const fs = require('fs');
const path = require('path');

const usersDirectory = path.join(__dirname, '../src/files/users');

try {
  if (!fs.existsSync(usersDirectory)) {
    throw new Error('A pasta src/files/users não existe.');
  }

  const users = fs.readdirSync(usersDirectory, {
    withFileTypes: true,
  });

  let updatedCount = 0;
  let skippedCount = 0;

  for (const user of users) {
    if (!user.isDirectory()) {
      continue;
    }

    const mapFilePath = path.join(usersDirectory, user.name, 'map.json');

    if (!fs.existsSync(mapFilePath)) {
      console.log(`Ignorado: ${user.name} não possui map.json.`);
      skippedCount++;
      continue;
    }

    const fileContent = fs.readFileSync(mapFilePath, 'utf8');

    const map = JSON.parse(fileContent.replace(/^\uFEFF/, ''));

    if (map === null || typeof map !== 'object' || Array.isArray(map)) {
      console.log(`Ignorado: map.json inválido para ${user.name}.`);
      skippedCount++;
      continue;
    }

    // Preserva cities caso a chave já exista.
    if (!Object.prototype.hasOwnProperty.call(map, 'cities')) {
      map.cities = {};

      fs.writeFileSync(mapFilePath, JSON.stringify(map, null, 2), 'utf8');

      updatedCount++;
      console.log(`Atualizado: ${user.name}`);
    } else {
      console.log(`Ignorado: ${user.name} já possui a chave cities.`);
      skippedCount++;
    }
  }

  console.log('\nMigration concluída!');
  console.log(`Usuários atualizados: ${updatedCount}`);
  console.log(`Usuários ignorados: ${skippedCount}`);
} catch (error) {
  console.error('Erro ao executar migration:', error.message);

  process.exitCode = 1;
}
