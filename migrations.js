import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuração dos caminhos (compatível com ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HISTORY_FILE = path.join(__dirname, 'migrations_history.json');
const MIGRATIONS_DIR = path.join(__dirname, 'migrations');

async function runMigrations() {
  try {
    // 1. Garante a existência do arquivo de histórico
    let history = [];
    try {
      const historyData = await fs.readFile(HISTORY_FILE, 'utf-8');
      history = JSON.parse(historyData);
    } catch (error) {
      if (error.code === 'ENOENT') {
        // Arquivo não existe, cria com um array vazio
        await fs.writeFile(HISTORY_FILE, JSON.stringify([], null, 2));
      } else {
        throw error;
      }
    }

    // 2. Garante que a pasta 'migrations/' existe
    try {
      await fs.access(MIGRATIONS_DIR);
    } catch {
      console.log(`Pasta '${MIGRATIONS_DIR}' não encontrada. Criando pasta...`);
      await fs.mkdir(MIGRATIONS_DIR);
      console.log('Nenhuma migração para executar.');
      return;
    }

    // 3. Lê todos os arquivos da pasta migrations/
    const allFiles = await fs.readdir(MIGRATIONS_DIR);
    
    // Filtra apenas arquivos (ex: .js, .sql) e ignora arquivos ocultos
    const migrationFiles = allFiles.filter(file => !file.startsWith('.')).sort();

    // 4. Filtra os arquivos que ainda não foram executados
    const pendingMigrations = migrationFiles.filter(file => !history.includes(file));

    if (pendingMigrations.length === 0) {
      console.log('Todas as migrações já estão atualizadas. Nada a executar.');
      return;
    }

    console.log(`Encontradas ${pendingMigrations.length} migração(ões) pendente(s).`);

    // 5. Executa cada migração pendente sequencialmente
    for (const file of pendingMigrations) {
      const filePath = path.join(MIGRATIONS_DIR, file);
      
      console.log(`Executando: ${file}...`);

      try {
        // --- LOGICA DE EXECUÇÃO ---
        // Se suas migrações forem arquivos JS com um export default de uma função:
        const migrationModule = await import(`file://${filePath}`);
        if (typeof migrationModule.default === 'function') {
          await migrationModule.default();
        } else {
          console.warn(`[Aviso] O arquivo ${file} não exporta uma função padrão (default).`);
        }
        // ---------------------------

        // 6. Atualiza o histórico após o sucesso da execução
        history.push(file);
        await fs.writeFile(HISTORY_FILE, JSON.stringify(history, null, 2));
        console.log(`Sucesso: ${file} registrada no histórico.`);

      } catch (execError) {
        console.error(`Erro ao executar a migração ${file}:`, execError);
        console.error('Processo interrompido para evitar inconsistências.');
        process.exit(1);
      }
    }

    console.log('Todas as migrações foram executadas com sucesso!');

  } catch (globalError) {
    console.error('Erro crítico no script de migrações:', globalError);
    process.exit(1);
  }
}

// Inicia o processo
runMigrations();
