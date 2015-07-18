angular.module('ListaDeCompras', ['ionic'])
.controller('PopupCtrl',function($scope, $ionicPopup, $timeout, $compile) {

  $scope.itens = [];
  $scope.total = 0.00;
  $scope.indiceItens = 0;

 $scope.removerItem = function(data){
     console.log(data);
     var alertPopup = $ionicPopup.alert({
 			title: '<strong>Informação</strong>',
 			template: 'Vai remover o item'
 		});
 };

 // An alert dialog
 $scope.adicionarItem = function() {

 	var item = document.getElementById('item').value;
 	var valorUnitario = document.getElementById('valor').value;
        var quantidade = document.getElementById('quantidade').value;
        
 	if( item.length > 1 && valorUnitario.length >= 1 && quantidade >= 1 ) {
                
                // Removendo a vírgula e transformando o valor em centavos para não ter erro no cálculo
                valorUnitario = valorUnitario.replace(',', '.') * 100;
                
                //calculando o valor total do item informado
 		var valorTotal = valorUnitario * quantidade;
                
                var novoItem = {
                    nome: item,
                    valorUnitario: valorUnitario,
                    quantidade: quantidade,
                    total: valorTotal
                 };

                 $scope.total += valorTotal;
                 $scope.itens.push(novoItem);

                 console.log($scope.itens);

 		//exibindo o alerta
// 		var alertPopup = $ionicPopup.alert({
// 			title: '<strong>Produto "' + item + '" adicionado com sucesso!</strong>',
// 			template: 'Ainda não há a opção de remover...'
// 		});

                
 		//montando a nova linha da tabela
 		var newHtmlContent =  '<tr><td>' + item + '</td><td class="td-centered">' + quantidade + ' x ' + (valorUnitario/100).toFixed(2).replace('.', ',') + '</td><td  class="td-centered">' + (valorTotal/100).toFixed(2).replace('.', ',') + '</td></tr>';

 		// obtendo o conteudo atual da tabela
 		var tabela = document.getElementById('items-content');

 		// concatenando a nova linha na primeira linha da tabela geral
                tabela.innerHTML = newHtmlContent + tabela.innerHTML;

 		// obtendo o total já contabilizado
 		var totalContabilizado = document.getElementById('amount');

 		// Juntando o valor do item informado
 		totalContabilizado = $scope.total;

 		// manipulando o elemento que mantem o total da compra
 		var elementTotal = document.getElementById('amount');
 		elementTotal.value = totalContabilizado.toFixed(2);

 		// atualizando o total para o usuário
                var totalReal = $scope.total / 100;
 		var totalView = document.getElementById('valorTotal');
 		totalView.innerHTML = 'R$ ' + totalReal.toFixed(2).replace('.', ',');

 		// limpando os inputs
 		document.getElementById('item').value = '';
 		document.getElementById('valor').value = '';
 		document.getElementById('quantidade').value = '';
                
                $scope.indiceItens++;
                
 	} else {
 		var alertPopup = $ionicPopup.alert({
 			title: '<strong>Preencha os dados do produto corretamente!</strong>',
 			template: 'O nome, valor e quantidade devem ser informados.'
 		});
 	}

 	alertPopup.then(function(res) {

 	});
 };
});
