var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-digitacao");

$(function(){
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
});

function atualizaTamanhoFrase() {
    var frase  = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras); // text-> serve para modificar o conteúdo de texto das tags
}

function inicializaContadores() {
    // evento
    campo.on("input", function(){ // on -> sempre estar escutando o evento
        var conteudo = campo.val(); // val -> é para alterar os valores dos campos de input
    
        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdPalavras);
    
        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    
    });
}

function inicializaCronometro() {
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function(){ // one -> só funciona o evento uma vez
        var cronometroID = setInterval(function(){
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                clearInterval(cronometroID); // clearInterval -> para a cronometro
                finalizaJogo();
            }
        }, 1000);
    });    
}

function finalizaJogo() {
    campo.attr("disabled", true); // attr -> é para alterar os atributos de elemento
    // campo.("campo-desativado"); // adiciona classe do CSS
    campo.toggleClass("campo-desativado"); // se a classe exsitir ele tira se não ele adiciona
    inserePlacar();    
}

function inicializaMarcadores() {
    var frase = $(".frase").text();
    campo.on("input", function() {
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length); // substr -> divide a string em intervalo
        
        if (digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });    
}

function removeLinha(event){
    event.preventDefault();
    $(this).parent().parent().remove();
}

function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    // campo.remoceClass("campo-desativado"); // remove class
    campo.toggleClass("campo-desativado"); // se a classe existir ele tira se não ele adiciona
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
}