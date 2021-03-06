function populateUFs() {
  //função para meter os estados atraves de uma api no Selecionar o Estado
  const ufSelect = document.querySelector("select[name=uf]");
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => res.json())
    .then((states) => {
      for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }
    });
}

populateUFs();

function getCities(event) {
  //vai buscar ao html o select com nome city / input state
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name=state]");
  const ufValue = event.target.value;
  const indexOfSelectSate = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectSate].text;
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;
  // para voltar a estado antes de escolha de estado
  citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
  citySelect.innerHTML = true
  fetch(url)
    .then((res) => res.json())
    .then((cities) => {
      
      for (const city of cities) {
        citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`;
      }
      citySelect.disabled = false;
    });
}

// -Função serve para dizer quando mudei de estado no console.log
document.querySelector("select[name=uf]").addEventListener("change", getCities); 
