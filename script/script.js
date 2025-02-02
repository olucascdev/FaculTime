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
        iniciarConfetes();
    });

    function iniciarConfetes() {
        tsParticles.load("tsparticles", {
            fullScreen: { enable: false },
            particles: {
                number: { value: 0 },
                shape: { type: ["circle", "square", "triangle"] },
                size: { value: { min: 4, max: 8 } },
                move: {
                    enable: true,
                    speed: 4,
                    direction: "bottom",
                    outModes: { default: "out" }
                },
                opacity: { value: 0.8 },
                color: {
                    value: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]
                }
            },
            emitters: {
                position: { x: 50, y: 0 },
                rate: { quantity: 5, delay: 0.2 },
                life: { duration: 2.5, count: 1 } // Agora para após 2.5 segundos
            }
        });
    }
    
    document.getElementById("resetar").addEventListener("click", function () {
        location.reload(); // Recarrega a página, resetando tudo
    });    
});