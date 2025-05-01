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

// Função para gerar código PIX
function gerarCodigoPix(chave, nome, cidade, valor) {
    const payloadFormat = "000201";
    const merchantAccount = `0014BR.GOV.BCB.PIX01${chave.length}${chave}`;
    const merchantInfo = `520400005303986540${valor.toFixed(2).length}${valor.toFixed(2).replace('.', '')}5802BR59${nome.length}${nome}60${cidade.length}${cidade}`;
    const crc = "6304"; // Apenas marcador, não faz o cálculo CRC aqui

    // Isso é um exemplo simplificado. Para produção, use uma biblioteca para montar EMV-Payload corretamente.
    const payload = `${payloadFormat}${merchantAccount}${merchantInfo}${crc}`;

    return payload;
}

// Função para gerar e exibir o QR Code do PIX
function gerarQRCodePIX() {
    const chave = "14958480943";  // Substitua pela sua chave Pix
    const nome = "Armazém da Sra. Lourdes";
    const cidade = "Rio Branco do Ivai";

    // Obter o total do carrinho
    const total = parseFloat(document.getElementById("total").innerText);

    const codigoPix = gerarCodigoPix(chave, nome, cidade, total);

    // Gerar o QR Code visual
    document.getElementById("qrcode").innerHTML = "";
    QRCode.toCanvas(document.getElementById("qrcode"), codigoPix, function (error) {
        if (error) console.error(error);
        console.log("QR Code gerado!");
    });
}

// Adicionar evento para gerar o QR Code quando o botão for clicado
document.getElementById("gerar-qr-button").addEventListener("click", gerarQRCodePIX);
