// Função para adicionar ao carrinho
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

// Função para gerar o QR Code PIX
document.getElementById("gerar-qr-button").addEventListener("click", function() {
    if (total === 0) {
        alert("O carrinho está vazio. Adicione produtos antes de gerar o QR Code.");
        return;
    }

    // Defina o valor do PIX com base no total do carrinho
    const valorPIX = total.toFixed(2); // Utiliza o valor total do carrinho

    // Dados para o PIX (ajuste conforme sua chave e informações de pagamento)
    const pixData = {
        chave: "14958480943",  // Substitua com sua chave PIX
        nome: "Armazém da Sra. Lourdes",
        cidade: "Cidade",
    };

    // Gerar a string do código PIX com o valor dinâmico
    const pixString = `00020101021129370016BR.GOV.BCB.PIX0113${pixData.chave}14958480943${valorPIX.replace('.', '')}5802BR5915${pixData.nome}6009${pixData.cidade}62070503***6304`;

    // Gerar o QR Code PIX
    QRCode.toCanvas(document.getElementById("qrcode"), pixString, function (error) {
        if (error) console.error(error);
        else console.log("QR Code gerado com sucesso!");
    });
});
