// ============================================================
// DUPLA: Giulianna e Murilo
// ALGORITMO: Binary Search (Busca Binária)
// LINGUAGEM: JavaScript (Node.js)
// ============================================================

const fs = require('fs');
const readline = require('readline');

function buscaBinaria(lista, alvo) {
    let inicio = 0;
    let fim = lista.length - 1;

    while (inicio <= fim) {
        let meio = Math.floor((inicio + fim) / 2);

        
        if (lista[meio] === alvo) {
            return meio;
        }

        
        if (lista[meio] < alvo) {
            inicio = meio + 1;
        } 
        // a busca foca na metade da esquerda
        else {
            fim = meio - 1;
        }
    }

    //   número não foi encontrado na lista, aí retorna -1 para indicar isso
    return -1;
}

// lê tudo picotadinho pra não ficar mto pesado
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

    // processa o arquivo linha por linha pra n estourar a memória
    for await (let linha of leitorLinhas) {
        if (primeiraLinha) {
            primeiraLinha = false; // pula o cabeçalho "numero"
            continue;
        }
        if (linha.trim()) {
            numeros.push(parseInt(linha, 10)); // esse parseInt é pra transformar em nmr inteiro
        }
    }

    console.log("Total de elementos carregados:", numeros.length);

    // parteziha o tempo de busca
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