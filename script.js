let carrinho = [];
let total = 0;

function adicionarAoCarrinho(nomeProduto, precoProduto) {
    carrinho.push({ nome: nomeProduto, preco: precoProduto });
    atualizarCarrinho();
    total += precoProduto;
    document.getElementById("total").innerText = total.toFixed(2);
    atualizarItensCarrinho();
}

function atualizarCarrinho() {
    const cartCount = document.getElementById("cartCount");
    cartCount.innerText = carrinho.length;

    const carrinhoElement = document.getElementById("carrinho");
    if (carrinho.length > 0) {
        carrinhoElement.classList.remove("carrinho-fechado");
        carrinhoElement.classList.add("carrinho-aberto");
    } else {
        carrinhoElement.classList.remove("carrinho-aberto");
        carrinhoElement.classList.add("carrinho-fechado");
    }
}

function atualizarItensCarrinho() {
    const itensCarrinho = document.getElementById("itensCarrinho");
    itensCarrinho.innerHTML = '';

    carrinho.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.nome} - R$${item.preco.toFixed(2)}`;
        itensCarrinho.appendChild(li);
    });

    atualizarItensPedido();
}

function atualizarItensPedido() {
    const listaPedido = document.getElementById("cart-items");
    listaPedido.innerHTML = '';

    carrinho.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.nome} - R$${item.preco.toFixed(2)}`;
        listaPedido.appendChild(li);
    });

    let totalEl = document.getElementById("cart-total");
    if (!totalEl) {
        totalEl = document.createElement("p");
        totalEl.id = "cart-total";
        document.getElementById("cart").appendChild(totalEl);
    }
    totalEl.innerHTML = `<strong>Total:</strong> R$${total.toFixed(2)}`;
}

function toggleCarrinho() {
    const carrinhoElement = document.getElementById("carrinho");
    if (carrinhoElement.classList.contains("carrinho-fechado")) {
        carrinhoElement.classList.remove("carrinho-fechado");
        carrinhoElement.classList.add("carrinho-aberto");
    } else {
        carrinhoElement.classList.remove("carrinho-aberto");
        carrinhoElement.classList.add("carrinho-fechado");
    }
}

function finalizarPedido() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    const pedido = carrinho.map(item => `${item.nome} - R$${item.preco.toFixed(2)}`).join('\n');
    const mensagem = `Olá, gostaria de fazer um pedido:\n\n${pedido}\n\nTotal: R$${total.toFixed(2)}`;

    const whatsappUrl = `https://wa.me/5543998306254?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappUrl, "_blank");
}

document.getElementById("checkout-button").addEventListener("click", finalizarPedido);
