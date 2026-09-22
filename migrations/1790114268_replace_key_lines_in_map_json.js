const fs = require('fs');
const path = require('path');

const usersFolderPath = path.join(__dirname, '../src/files/users');

try {
  const users = fs.readdirSync(usersFolderPath, {
    withFileTypes: true,
  });

  users
    .filter(user => user.isDirectory())
    .forEach(user => {
      const userMapPath = path.join(
        usersFolderPath,
        user.name,
        'map.json'
      );

      // Ignora usuários que não possuem map.json
      if (!fs.existsSync(userMapPath)) {
        console.log(
          `- ${user.name}: map.json não encontrado`
        );
        return;
      }

      try {
        const fileContent = fs.readFileSync(
          userMapPath,
          'utf8'
        );

        const map = JSON.parse(fileContent);

        if (!Array.isArray(map.lines)) {
          console.log(
            `- ${user.name}: nenhuma linha encontrada`
          );
          return;
        }

        const updatedLines = map.lines.map(line => {
          const { lines, ...rest } = line;

          return {
            ...rest,
            points: lines,
          };
        });

        const updatedMap = {
          ...map,
          lines: updatedLines,
        };

        fs.writeFileSync(
          userMapPath,
          JSON.stringify(updatedMap, null, 2),
          'utf8'
        );

        console.log(
          `✓ ${user.name}: map.json atualizado`
        );
      } catch (error) {
        console.error(
          `✗ ${user.name}: erro ao processar map.json`,
          error.message
        );
      }
    });

  console.log('\nMigration concluída.');
} catch (error) {
  console.error(
    'Erro ao acessar a pasta de usuários:',
    error.message
  );
}