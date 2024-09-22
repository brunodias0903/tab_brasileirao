document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "live_1cf353d35ffb78a93c2467fd0e8f72";
  const apiUrl = "https://api.api-futebol.com.br/v1/campeonatos/10/tabela";

  const fetchTabela = async () => {
    try {
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });
      const data = await response.json();
      populateTable(data);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  };

  const generateLast5MatchesIcons = (ultimos_jogos) => {
    return ultimos_jogos
      .map((jogo) => {
        if (jogo === "v") {
          return `<img class=result-icon" src="/assets/images/last-game-victory.svg" />`;
        } else if (jogo === "e") {
          return `<img class=result-icon" src="/assets/images/last-game-tie.svg" />`;
        } else if (jogo === "d") {
          return `<img class=result-icon" src="/assets/images/last-game-defeat.svg" />`;
        }
      })
      .join(" ");
  };

  const populateTable = (data) => {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";

    data.forEach((team) => {
      const {
        posicao,
        pontos,
        time,
        jogos,
        vitorias,
        empates,
        derrotas,
        gols_pro,
        gols_contra,
        saldo_gols,
        ultimos_jogos,
      } = team;

      const row = document.createElement("tr");
      if (posicao <= 4) {
        row.classList.add("border-libertadores");
      } else if (posicao >= 5 && posicao <= 6) {
        row.classList.add("border-pre-libertadores");
      } else if (posicao >= 7 && posicao <= 12) {
        row.classList.add("border-sulamericana");
      } else if (posicao >= 17) {
        row.classList.add("border-rebaixamento");
      }

      const last5MatchesIcons = generateLast5MatchesIcons(ultimos_jogos);

      row.innerHTML = `
              <td>
                  <div class="team-info">
                      <span class="position">${posicao}</span>
                      <img src="${time.escudo}" alt="${time.nome_popular}" class="team-logo">
                      <span class="team-name">${time.nome_popular}</span>
                  </div>
              </td>
              <td>${pontos}</td>
              <td>${jogos}</td>
              <td>${vitorias}</td>
              <td>${empates}</td>
              <td>${derrotas}</td>
              <td>${gols_pro}</td>
              <td>${gols_contra}</td>
              <td>${saldo_gols}</td>
              <td>
                <div class="last5matches-container">
                  ${last5MatchesIcons}
                </div>
              </td>
          `;
      tableBody.appendChild(row);
    });
  };

  fetchTabela();
});
