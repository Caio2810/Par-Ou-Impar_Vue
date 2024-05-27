<script setup>
import { defineProps, ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  numero: {
    type: Number,
    required: true,
  },
  opcao: {
    type: String,
    required: true,
  },
});

const router = useRouter();

// randomiza o valor da escolha da CPU
const maoCpu = ref(0);
const gerarNumeroAleatorio = () => {
  maoCpu.value = Math.floor(Math.random() * 11);
};

// soma os valores
const soma = computed(() => {
  const resultadoSoma = parseInt(props.numero) + parseInt(maoCpu.value);
  return {
    resultadoSoma,
    resultado: resultadoSoma % 2 === 0 ? 'par' : 'ímpar'
  };
});

// função para determinar se o usuário ganhou ou perdeu
const escolhaResultado = computed(() => {
  return props.opcao === soma.value.resultado
    ? "Você ganhou, parabéns!"
    : "Você perdeu, tente novamente...";
});

function refresh() {
  location.reload();
}

function voltar() {
  router.push('/');
}

onMounted(() => {
  gerarNumeroAleatorio(); // chama a função para gerar um número aleatório quando o componente é montado
});
</script>

<template>
  <div class="container" id="escolha">
    <h1>{{ numero }} + {{ maoCpu }} = {{ soma.resultadoSoma }}, {{ soma.resultado }} venceu!</h1>
    <h1>{{ escolhaResultado }}</h1>

    <div id="maos_box">
      <span class="maos_user" id="maos_user">
        <img :src="'/images/maos_' + numero + '.png'" id="mao_user" alt="Mãos fechadas">
      </span>

      <span class="maos_cpu" id="maos_cpu">
        <img :src="'/images/maos_' + maoCpu + '.png'" id="mao_cpu" alt="Mãos fechadas">
      </span>
    </div>

    <button @click="refresh">JOGAR <br> NOVAMENTE</button>
    <button @click="voltar">VOLTAR <br> AO INÍCIO</button>
  </div>
</template>

<style scoped src="./src/assets/game.css"></style>
