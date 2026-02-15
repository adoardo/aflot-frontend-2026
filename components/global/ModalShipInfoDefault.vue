<template>
  <div
      class="menu-reg menu-none menu-reg-sailor cabinet"
      id="ship-info-default"
      :class="{ 'menu-show': isOpen }"
  >
    <div class="modal-block">
      <div class="modal-top">
        <h2 class="modal-title">
          Подробнее о судне EVER GIVEN:
        </h2>
        <!-- /.modal-title -->
        <img class="js-modal-close modal-close" src="assets/img/modal/close.png"
             @click="closeModal('shipinfodefault')">
      </div>
      <!-- /.modal-top -->



      <div class="vabout-info vabout-info-vak modal-vabout">
        <div class="vabout-item">
          <div class="vabout-subtitle">Название судна:</div>
          <!-- /.vabout-subtitle -->
          <div class="vabout-subtext">{{(getCurrentShip.vessel_name) ? getCurrentShip.vessel_name : '-'}}</div>
          <!-- /.vabout-subtext -->
        </div>
        <!-- /.vabout-item -->
        <div class="vabout-item">
          <div class="vabout-subtitle">Тип судна:</div>
          <!-- /.vabout-subtitle -->
          <div class="vabout-subtext">{{(getCurrentShip.ship_type) ? getCurrentShip.ship_type : '-'}}</div>
          <!-- /.vabout-subtext -->
        </div>
        <!-- /.vabout-item -->
        <div class="vabout-item">
          <div class="vabout-subtitle">DWT (t) - валовая вместимость:</div>
          <!-- /.vabout-subtitle -->
          <div class="vabout-subtext">{{(getCurrentShip.dwt) ? getCurrentShip.dwt : '-'}}</div>
          <!-- /.vabout-subtext -->
        </div>
        <!-- /.vabout-item -->
        <div class="vabout-item">
          <div class="vabout-subtitle">Длина</div>
          <!-- /.vabout-subtitle -->
          <div class="vabout-subtext">{{(getCurrentShip.length) ? getCurrentShip.length : '-'}}</div>
          <!-- /.vabout-subtext -->
        </div>
        <!-- /.vabout-item -->
        <div class="vabout-item">
          <div class="vabout-subtitle">IMO:</div>
          <!-- /.vabout-subtitle -->
          <div class="vabout-subtext">{{(getCurrentShip.imo) ? getCurrentShip.imo : '-'}}</div>
          <!-- /.vabout-subtext -->
        </div>
        <!-- /.vabout-item -->

        <div class="vabout-item">
          <div class="vabout-subtitle">Год постройки:</div>
          <!-- /.vabout-subtitle -->
          <div class="vabout-subtext">{{(getCurrentShip.year_built) ? getCurrentShip.year_built : '-'}}</div>
          <!-- /.vabout-subtext -->
        </div>
        <!-- /.vabout-item -->

        <div class="vabout-item">
          <div class="vabout-subtitle">kW - двигательная установка:</div>
          <!-- /.vabout-subtitle -->
          <div class="vabout-subtext">{{(getCurrentShip.kw) ? getCurrentShip.kw : '-'}}</div>
          <!-- /.vabout-subtext -->
        </div>
        <!-- /.vabout-item -->

        <div class="vabout-item">
          <div class="vabout-subtitle">Ширина:</div>
          <!-- /.vabout-subtitle -->
          <div class="vabout-subtext">{{(getCurrentShip.width) ? getCurrentShip.width : '-'}}</div>
          <!-- /.vabout-subtext -->
        </div>
        <!-- /.vabout-item -->
      </div>
      <!-- /.vabout-info -->


    </div>
    <!-- /.modal-block -->

  </div>
  <div
      :class="['header-overlay', { 'header-overlay__active': isOpen }]"
      @click="closeModal('shipinfodefault')"
  ></div>
</template>

<script setup>
import {useModalStore} from "~/store/modal";
import AfCloseModal from "@/components/uikit/AfCloseModal";

import {useGlobalSettings} from "~/store/useGlobalSettings";
import watchScrollModal from "~/utils/watchScrollModal";

const globalSettings = useGlobalSettings();
const {getCurrentShip} = storeToRefs(globalSettings)

const {closeModal, toggleModal} = useModalStore();

const props = defineProps({
  isOpen: {
    type: Boolean,
  }
});

watch(() => props.isOpen, watchScrollModal)
</script>