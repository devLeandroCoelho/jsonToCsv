// script.js

// Função chamada quando o botão "Exibir Colunas" é clicado
function displayColumns() {
  const jsonInput = document.getElementById("jsonInput").value;

  try {
    const jsonData = JSON.parse(jsonInput);

    // Obtém os cabeçalhos a partir das chaves do primeiro objeto
    const headers = Object.keys(jsonData[0]);

    // Exibe as caixas de seleção para cada coluna
    const columnSelection = document.getElementById("columnSelection");
    columnSelection.innerHTML = "";

    headers.forEach((header) => {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = header;
      checkbox.checked = true;

      const label = document.createElement("label");
      label.htmlFor = header;
      label.appendChild(document.createTextNode(header));

      columnSelection.appendChild(checkbox);
      columnSelection.appendChild(label);
      columnSelection.appendChild(document.createElement("br"));
    });

    // Exibe as caixas de seleção
    columnSelection.style.display = "block";

    // Exibe o botão "Converter para CSV"
    document.getElementById("convertToCSVBtn").style.display = "inline-block";
  } catch (error) {
    alert("Erro ao processar o JSON. Verifique o formato do JSON.");
  }
}

// Função chamada quando o botão "Converter para CSV" é clicado
function convertToCSV() {
  const jsonInput = document.getElementById("jsonInput").value;

  try {
    const jsonData = JSON.parse(jsonInput);

    // Obtém as caixas de seleção das colunas
    const columnCheckboxes = document.querySelectorAll(
      '#columnSelection input[type="checkbox"]'
    );
    const selectedColumns = Array.from(columnCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.id);

    // Converte o objeto JavaScript para CSV considerando apenas as colunas selecionadas
    const csvData = convertJSONToCSV(jsonData, selectedColumns);

    // Exibe o CSV gerado em formato de tabela
    displayCSV(csvData);

    // Ativa o link para download
    enableDownloadLink(csvData);
  } catch (error) {
    alert("Erro ao converter JSON para CSV. Verifique o formato do JSON.");
  }
}

// Função para converter um objeto JSON para CSV considerando apenas as colunas selecionadas
function convertJSONToCSV(jsonData, selectedColumns) {
  const csvRows = [];

  // Adiciona as colunas selecionadas à primeira linha do CSV
  csvRows.push(selectedColumns.join(","));

  // Para cada objeto no JSON, adiciona uma linha ao CSV com valores das colunas selecionadas
  for (const row of jsonData) {
    const values = selectedColumns.map((column) => row[column]);
    csvRows.push(values.join(","));
  }

  // Junta as linhas em uma string CSV
  return csvRows.join("\n");
}

// Função para exibir o CSV gerado na página em uma tabela
function displayCSV(csvData) {
  const csvOutput = document.getElementById("csvOutput");

  // Divide o CSV em linhas
  const rows = csvData.split("\n");

  // Cria uma tabela HTML
  const table = document.createElement("table");
  table.classList.add("csv-table");

  // Adiciona cada linha como uma linha de tabela
  rows.forEach((rowText) => {
    const row = document.createElement("tr");

    // Divide a linha em células
    const cells = rowText.split(",");

    // Adiciona cada célula como uma célula de tabela
    cells.forEach((cellText) => {
      const cell = document.createElement("td");
      cell.textContent = cellText;
      row.appendChild(cell);
    });

    // Adiciona a linha à tabela
    table.appendChild(row);
  });

  // Substitui o conteúdo atual pelo novo conteúdo formatado
  csvOutput.innerHTML = "";
  csvOutput.appendChild(table);
}

// Função para ativar o link de download com o CSV gerado
function enableDownloadLink(csvData) {
  const downloadLink = document.getElementById("downloadLink");
  // Cria um link de download com os dados CSV codificados
  downloadLink.href = `data:text/csv;charset=utf-8,${encodeURIComponent(
    csvData
  )}`;
  // Exibe o link de download
  downloadLink.style.display = "block";
}
