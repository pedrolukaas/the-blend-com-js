const listaProdutos = document.getElementById("lista-produtos");

async function carregarProdutos() {
  try {
    const resposta = await fetch(
      "https://tech4produtos.fly.dev/produtos/restaurante=Blend%20House"
    );

    if (!resposta.ok) {
      throw new Error("Erro ao buscar produtos: " + resposta.status);
    }

    const produtos = await resposta.json();

    console.log("Produtos recebidos:", produtos);

    listaProdutos.innerHTML = "";

    produtos.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("product-card");

      const imagem = document.createElement("img");

      let caminhoImagem = item.imagem;

      if (caminhoImagem.includes("hamburguer-3.png")) {
        caminhoImagem = "arquivo/imagens/hamburguer-3.png";
      }

      if (caminhoImagem.includes("hamburguer-4.png")) {
        caminhoImagem = "arquivo/imagens/hamburguer 4.png";
      }

      imagem.src = caminhoImagem;
      imagem.alt = item.produto;

      imagem.onerror = function () {
        console.log("Imagem não encontrada:", caminhoImagem);
      };

      const nome = document.createElement("h3");
      nome.textContent = item.produto;

      const descricao = document.createElement("p");
      descricao.textContent = item.descricao;

      const botao = document.createElement("a");
      botao.href = "detalhes.html?id=" + encodeURIComponent(item.id);
      botao.classList.add("btn");
      botao.textContent = "Ver Detalhes";

      card.append(imagem, nome, descricao, botao);
      listaProdutos.appendChild(card);
    });

    if (produtos.length === 0) {
      listaProdutos.textContent = "Nenhum produto encontrado.";
    }
  } catch (erro) {
    console.error(erro);
    listaProdutos.textContent = "Erro ao carregar o cardápio.";
  }
}

carregarProdutos();