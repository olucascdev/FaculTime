document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("calcForm").addEventListener("submit", function(event) {
        event.preventDefault();

        let anoEntrada = parseInt(document.getElementById("anoEntrada").value);
        let semestreEntrada = parseInt(document.getElementById("semestreEntrada").value);
        let totalPeriodos = parseInt(document.getElementById("totalPeriodos").value);
        let duracaoPeriodoMeses = 6;

        function calcularTempoRestante(anoEntrada, semestreEntrada, totalPeriodos, duracaoPeriodoMeses) {
            let mesEntrada = semestreEntrada === 1 ? 1 : 7;
            let dataInicio = new Date(anoEntrada, mesEntrada - 1);
            let mesesTotais = totalPeriodos * duracaoPeriodoMeses;
            let dataFormatura = new Date(dataInicio);
            dataFormatura.setMonth(dataInicio.getMonth() + mesesTotais);

            let hoje = new Date();
            let diferencaMeses = (dataFormatura.getFullYear() - hoje.getFullYear()) * 12 + (dataFormatura.getMonth() - hoje.getMonth());

            let anosRestantes = Math.floor(diferencaMeses / 12);
            let mesesRestantes = diferencaMeses % 12;

            return {
                dataFormatura: dataFormatura.toLocaleDateString("pt-BR", { month: "long", year: "numeric" }),
                anosRestantes,
                mesesRestantes
            };
        }

        let resultado = calcularTempoRestante(anoEntrada, semestreEntrada, totalPeriodos, duracaoPeriodoMeses);

        document.getElementById("resultado").innerHTML = `
            <p class="text-lg font-semibold">Data prevista para formatura: <strong>${resultado.dataFormatura}</strong></p>
            <p class="text-lg font-semibold">Tempo restante: <strong>${resultado.anosRestantes} anos e ${resultado.mesesRestantes} meses</strong></p>
        `;
    });
});