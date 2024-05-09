document.getElementById('drawTeams').addEventListener('click', function() {
    // Captura os valores dos inputs
    let playersInput = document.getElementById('players').value.split(',');
    const numTeams = parseInt(document.getElementById('numTeams').value);

    // Converte a entrada em objetos de jogadores
    let players = playersInput.map(player => {
        let [name, score] = player.split(':');
        return { name: name.trim(), score: parseInt(score.trim()) };
    });

    // Ordena os jogadores por nota de forma descendente
    players.sort((a, b) => b.score - a.score);

    // Verifica se os inputs são válidos
    if (players.length < numTeams) {
        alert('Não há jogadores suficientes para formar os times desejados!');
        return;
    }

    // Cria os times iniciando com arrays vazios
    let teams = Array.from({ length: numTeams }, () => ({ players: [], scoreSum: 0 }));

    // Distribui os jogadores para equilibrar as somas das notas nos times
    players.forEach(player => {
        teams.sort((a, b) => a.scoreSum - b.scoreSum); // Ordena os times pela soma das notas
        teams[0].players.push(player); // Adiciona o jogador ao time com menor soma de notas
        teams[0].scoreSum += player.score; // Atualiza a soma de notas do time
    });

    // Prepara o HTML para mostrar os resultados
    let resultHTML = '';
    teams.forEach((team, index) => {
        resultHTML += `<h2>Time ${index + 1} (Nota Total: ${team.scoreSum})</h2><ul>`;
        team.players.forEach(player => {
            resultHTML += `<li>${player.name} - Nota: ${player.score}</li>`;
        });
        resultHTML += `</ul>`;
    });

    // Mostra os resultados
    document.getElementById('result').innerHTML = resultHTML;
});

// Evento para recarregar a página
document.getElementById('resetPage').addEventListener('click', function() {
    window.location.reload();
});