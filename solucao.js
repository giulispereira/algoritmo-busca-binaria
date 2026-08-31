// ============================================================
// DUPLA: Giulianna e Murilo
// ALGORITMO: Binary Search (Busca Binária)
// LINGUAGEM: JavaScript (Node.js)
// ============================================================

const fs = require('fs');
const readline = require('readline');

// 1. FUNÇÃO DA BUSCA BINÁRIA (IMPLEMENTADA DO ZERO)
function buscaBinaria(lista, alvo) {
    let inicio = 0;
    let fim = lista.length - 1;

    // Enquanto o intervalo de busca for válido
    while (inicio <= fim) {
        // Encontra a posição do meio arredondando para baixo
        let meio = Math.floor((inicio + fim) / 2);

        // Caso 1: Encontrou o elemento no meio
        if (lista[meio] === alvo) {
            return meio;
        }

        // Caso 2: O valor do meio é menor que o alvo -> busca na metade direita
        if (lista[meio] < alvo) {
            inicio = meio + 1;
        } 
        // Caso 3: O valor do meio é maior que o alvo -> busca na metade esquerda
        else {
            fim = meio - 1;
        }
    }

    // Se o elemento não existir no conjunto
    return -1;
}

// 2. FUNÇÃO AUXILIAR PARA LER OS ARQUIVOS E TESTAR (LEITURA POR STREAM)
async function testar(caminhoArquivo, alvo) {
    console.log("-----------------------------------------");
    console.log("Carregando arquivo:", caminhoArquivo);

    const streamEntrada = fs.createReadStream(caminhoArquivo);
    const leitorLinhas = readline.createInterface({
        input: streamEntrada,
        crlfDelay: Infinity
    });

    const numeros = [];
    let primeiraLinha = true;

    // Processa o arquivo linha por linha para não estourar a memória
    for await (let linha of leitorLinhas) {
        if (primeiraLinha) {
            primeiraLinha = false; // Pula o cabeçalho "numero"
            continue;
        }
        if (linha.trim()) {
            numeros.push(parseInt(linha, 10));
        }
    }

    console.log("Total de elementos carregados:", numeros.length);

    // Medição de tempo e execução da Busca Binária
    console.time("Tempo de Busca");
    const posicao = buscaBinaria(numeros, alvo);
    console.timeEnd("Tempo de Busca");

    if (posicao !== -1) {
        console.log(`Sucesso! O número ${alvo} foi encontrado no índice: ${posicao}`);
    } else {
        console.log(`O número ${alvo} não foi encontrado no conjunto.`);
    }
}

// 3. EXECUÇÃO ASSÍNCRONA NOS TRÊS DATASETS
async function executarTestes() {
    await testar('datasets/numeros_1M_ordenado.csv', 500000);
    await testar('datasets/numeros_10M_ordenado.csv', 500000);
    await testar('datasets/numeros_100M_ordenado.csv', 500000);
}

executarTestes();