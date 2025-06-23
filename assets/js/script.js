const menuBtn = document.getElementById("menu-toggle");
const aside = document.getElementById("menu-lateral");

menuBtn.addEventListener("click", () => {
  aside.classList.toggle("ativo");
  menuBtn.classList.toggle("ativo"); // ativa a animação do X
});


fetch("/assets/json/dados.json")
  .then((resposta) => resposta.json())
  .then((dados) => {
    console.log("JSON carregado:", dados);

    const vendas = dados.find((d) => d.tipo === "vendas");
    new Chart(document.getElementById("graficoVendas").getContext("2d"), {
      type: "bar",
      data: {
        labels: vendas.meses,
        datasets: [{
          label: "Vendas Mensais (R$)",
          data: vendas.valores,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Gráfico de Vendas por Mês",
            align: "end",
            font: { size: 18 },
            color: "#333"
          }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });

    // Acessos
    const acessos = dados.find((d) => d.tipo === "acessos");
    new Chart(document.getElementById("graficoAcessos").getContext("2d"), {
      type: "line",
      data: {
        labels: acessos.meses,
        datasets: [{
          label: "Acessos ao Sistema",
          data: acessos.valores,
          borderColor: "rgba(75, 192, 192, 1)",
          fill: false,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Gráfico de Acessos ao Sistema",
            align: "end",
            font: { size: 18 },
            color: "#333"
          }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });

    // Setores
    const setores = dados.find((d) => d.tipo === "setores");
    new Chart(document.getElementById("graficoSetores").getContext("2d"), {
      type: "pie",
      data: {
        labels: setores.labels,
        datasets: [{
          label: "Participação por Setor",
          data: setores.valores,
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)"
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Gráfico de Participação por Setor",
            align: "end",
            font: { size: 18 },
            color: "#333"
          }
        }
      }
    });

    // Produtividade
    const produtividade = dados.find((d) => d.tipo === "produtividade");
    new Chart(document.getElementById("graficoProdutividade").getContext("2d"), {
      type: "doughnut",
      data: {
        labels: produtividade.labels,
        datasets: [{
          label: "Tarefas Concluídas",
          data: produtividade.valores,
          backgroundColor: [
            "rgba(255, 159, 64, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(75, 192, 192, 0.6)"
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Gráfico de Produtividade",
            align: "end",
            font: { size: 18 },
            color: "#333"
          }
        }
      }
    });

    // Competências
    const competencias = dados.find((d) => d.tipo === "competencias");
    new Chart(document.getElementById("graficoCompetencias").getContext("2d"), {
      type: "radar",
      data: {
        labels: competencias.labels,
        datasets: [{
          label: "Avaliação de Competências",
          data: competencias.valores,
          backgroundColor: "rgba(153, 102, 255, 0.4)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Gráfico de Avaliação de Competências",
            align: "end",
            font: { size: 18 },
            color: "#333"
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 10
          }
        }
      }
    });

  })
  .catch((erro) => {
    console.error("Erro ao carregar o JSON:", erro);
  });
