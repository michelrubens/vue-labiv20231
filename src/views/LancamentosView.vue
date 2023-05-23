<template>
    <div>
        <p>
            <label>Justificativa: </label>
            <input type="text" v-model="justificativa" />
        </p>
        <p>
            <label>Data/hora início: </label>
            <input type="datetime-local" v-model="dataHoraInicio" />
        </p>
        <p>
            <label>Data/hora fim: </label>
            <input type="datetime-local" v-model="dataHoraFim" />
        </p>
        <p>
            <label>Tipo: </label>
            <input type="text" v-model="tipo" />
        </p>
        <button @click="cadastrar">Cadastrar</button>
        <table>
            <thead>
                <td>Justificativa</td>
                <td>Data/Hora Início</td>
                <td>Data/Hora Fim</td>
                <td>Tipo</td>
            </thead>
            <tr v-for="lancamento in lancamentos" :key="lancamento.justificativa">
                <td>{{ lancamento.justificativa }}</td>
                <td>{{ lancamento.dataHoraInicio }}</td>
                <td>{{ lancamento.dataHoraFim }}</td>
                <td v-if="lancamento.tipo === 'N'">Normal</td>
                <td v-else-if="lancamento.tipo === 'E'">Extra</td>
            </tr>
        </table>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

const justificativa = ref("");
const dataHoraInicio = ref("");
const dataHoraFim = ref("");
const tipo = ref("");

const lancamentos = ref([{justificativa: "", dataHoraInicio: "", dataHoraFim: "", tipo: "N"}]);

async function atualizar() {
    lancamentos.value = (await axios.get('lancamento')).data;
}

async function cadastrar() {
    await axios.post('lancamento',
        {
            justificativa: justificativa.value,
            dataHoraInicio: dataHoraInicio.value,
            dataHoraFim: dataHoraFim.value,
            tipo: tipo.value
        });
    atualizar();
    justificativa.value = "";
    dataHoraInicio.value = "";
    dataHoraFim.value = "";
    tipo: tipo.value = "";
}

onMounted(() => {
    atualizar();
});
</script>
