<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

// Escolher par ou impar
const opcaoEscolhida = ref('');
const escolherOpcao = (opcao) => {
  opcaoEscolhida.value = opcao;
};

// Popup
const isPopupActive = ref(false);
const togglePopup = (opcao) => {
  escolherOpcao(opcao);
  isPopupActive.value = !isPopupActive.value;
};

// Verificação
const toast = useToast();
const numero = ref('');
const router = useRouter(); //

const verificarNumero = () => {
  if (isNaN(numero.value) || parseInt(numero.value) < 0 || parseInt(numero.value) > 10) {
    toast.error("Digite um número entre 0-10", {
      position: "top-center",
      timeout: 5000,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 0.6,
      showCloseButtonOnHover: false,
      hideProgressBar: true,
      closeButton: "button",
      icon: true,
      rtl: false
    });
    return;
  } else {
    console.log('Número válido:', numero.value);
    router.push({ path: '/game', query: { numero: numero.value, opcao: opcaoEscolhida.value } });
  }
};
</script>


<template>
  <div class="container" :class="{ 'active': isPopupActive }" id="blur">
      <h1>Olá, vamos jogar par ou ímpar?</h1>

    <div id="maos_box">
      <span class="maos_user">
        <img src="/images/maos_0.png" id="mao_user" alt="Mãos fechadas">
      </span>
      <span class="maos_cpu">
        <img src="/images/maos_0.png" id="mao_cpu" alt="Mãos fechadas">
      </span>
    </div>

    <button @click="togglePopup('par')" type="button" id="par" class="game-button">PAR</button>
    <button @click="togglePopup('ímpar')" type="button" id="ímpar" class="game-button">ÍMPAR</button>
  </div>

  <div class="container_number" :class="{ 'active': isPopupActive }" id="popup">
    <div id="number_box">
      <h1>Você é {{ opcaoEscolhida }}, agora digite seu número.</h1>
      <input v-model="numero" class="input_number" name="text" type="number" min="0" max="10" placeholder="0-10">
      <button @click="verificarNumero" class="button_number" type="button" :disabled="numero === ''">Ok</button>
    </div>
  </div>
</template>