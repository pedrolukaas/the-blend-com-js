
const nomeProduto = document.getElementById("nome-produto");
const descricaoProduto = document.getElementById("descricao-produto");
const imagemProduto = document.getElementById("imagem-produto");

const botaoPedido = document.getElementById("realizar-pedido");
const modal = document.getElementById("pedido-modal");

const produtoPedido = document.getElementById("pedido-produto");
const quantidadePedido = document.getElementById("quantidade-pedido");
const nomeCliente = document.getElementById("nome-cliente");

const confirmarPedido = document.getElementById("confirmar-pedido");
const fecharPedido = document.getElementById("fechar-pedido");
const cancelarPedido = document.getElementById("cancelar-pedido");

const pedidoSucesso = document.getElementById("pedido-sucesso");
const mensagemSucesso = document.getElementById("mensagem-sucesso");

let produtoAtual = null;

async function carregarDetalhes() {
  try {
    const parametros = new URLSearchParams(window.location.search);
    const id = parametros.get("id");

    if (!id) {
      nomeProduto.textContent = "Produto não selecionado.";
      descricaoProduto.textContent =
        "Volte ao cardápio e escolha um hambúrguer.";

      imagemProduto.style.display = "none";
      return;
    }

    const resposta = await fetch(
      `https://tech4produtos.fly.dev/produtos/${encodeURIComponent(id)}`
    );

    if (!resposta.ok) {
      throw new Error("Erro ao buscar produto: " + resposta.status);
    }

    const produto = await resposta.json();

    produtoAtual = produto;

    nomeProduto.textContent = produto.produto;
    descricaoProduto.textContent = produto.descricao;

    imagemProduto.src = produto.imagem;
    imagemProduto.alt = produto.produto;

    botaoPedido.disabled = false;
  } catch (erro) {
    console.error("Erro:", erro);
    nomeProduto.textContent = "Não foi possível carregar o produto.";
    descricaoProduto.textContent =
      "Tente voltar ao cardápio e selecionar novamente.";
  }
}

function abrirPedido() {
  if (!produtoAtual) {
    alert("Escolha um hambúrguer primeiro!");
    return;
  }

  produtoPedido.textContent = produtoAtual.produto;
  quantidadePedido.value = 1;
  nomeCliente.value = "";

  pedidoSucesso.hidden = true;
  confirmarPedido.hidden = false;
  cancelarPedido.hidden = false;

  modal.classList.add("ativo");
  modal.setAttribute("aria-hidden", "false");

  nomeCliente.focus();
}

function fecharModal() {
  modal.classList.remove("ativo");
  modal.setAttribute("aria-hidden", "true");
}

botaoPedido.addEventListener("click", abrirPedido);

fecharPedido.addEventListener("click", fecharModal);
cancelarPedido.addEventListener("click", fecharModal);

modal.addEventListener("click", function (evento) {
  if (evento.target === modal) {
    fecharModal();
  }
});

document.addEventListener("keydown", function (evento) {
  if (evento.key === "Escape" && modal.classList.contains("ativo")) {
    fecharModal();
  }
});

confirmarPedido.addEventListener("click", function () {
  const quantidade = Number(quantidadePedido.value);
  const cliente = nomeCliente.value.trim();

  if (
    !Number.isInteger(quantidade) ||
    quantidade < 1 ||
    quantidade > 99
  ) {
    alert("Digite uma quantidade entre 1 e 99.");
    quantidadePedido.focus();
    return;
  }

  if (!cliente) {
    alert("Digite seu nome para continuar.");
    nomeCliente.focus();
    return;
  }

  mensagemSucesso.textContent =
    `${cliente}, seu pedido simulado de ${quantidade} ` +
    `${quantidade === 1 ? "unidade" : "unidades"} de ` +
    `${produtoAtual.produto} foi confirmado!`;

  pedidoSucesso.hidden = false;
  confirmarPedido.hidden = true;
  cancelarPedido.hidden = true;
});

document.getElementById("voltar-cardapio").addEventListener("click", function () {
  window.location.href = "cardapio.html";
});

carregarDetalhes();
document.addEventListener("DOMContentLoaded", function () {
  const botaoPedido = document.getElementById("realizar-pedido");
  const modalPedido = document.getElementById("pedido-modal");
  const nomeProduto = document.getElementById("nome-produto");
  const pedidoProduto = document.getElementById("pedido-produto");

  if (!botaoPedido || !modalPedido) {
    console.log("Não encontrei o botão ou o modal.");
    return;
  }

  botaoPedido.addEventListener("click", function () {
    if (pedidoProduto && nomeProduto) {
      pedidoProduto.textContent = nomeProduto.textContent;
    }

    modalPedido.classList.add("ativo");
    modalPedido.setAttribute("aria-hidden", "false");
  });
});
