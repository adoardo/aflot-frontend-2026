<template>
    <div
            class="menu-reg menu-none menu-reg-sailor cabinet"
            id="add-existing-ship"
            :class="{ 'menu-show': isOpen }"
    >
        <div class="modal-block">
            <div class="modal-top">
                <h2 class="modal-title">
                    Добавить судно из «Морского флота»
                </h2>
                <!-- /.modal-title -->
                <img class="js-modal-close modal-close" src="assets/img/modal/close.png"
                     @click="closeModal('existingship')">
            </div>
            <!-- /.modal-top -->

            <div class="suda-item__text">
                Для добавления судна, введите IMO или название корабля в строку поиска, затем выберите
                соответствующее судно
                из списка выдачи. В случае, если вы не найдете подходящее судно воспользуйтесь <a
                    class="suda-item__link">данной формой.</a>
            </div>
            <!-- /.suda-item__text -->
            <div class="cabinet tag-input modal-tag-input">
                <AfDropDox
                        v-model="unregisteredShip"
                        :options-list="unregisteredNames"
                        title="Судно:"
                        :single="true"
                />


                <div style="display: none;" class="tag-input__label">Судно:</div>
                <div style="display: none;" class="tag-input__list">

                    <div class="tag-input__item">
                        EVER GIVEN <span class="modal-tag__gray">IMO 9811000</span>
                        <button class="tag-input__delete">
                            <img src="assets/img/resume/close.svg" alt="delete">
                        </button>
                    </div>
                </div>
            </div>
            <!-- /.tag-input -->

            <div class="vabout-info vabout-info-vak modal-vabout">
                <div class="vabout-item">
                    <div class="vabout-subtitle">Название судна:</div>
                    <!-- /.vabout-subtitle -->
                    <div class="vabout-subtext" v-html="shipToAdd.vessel_name"></div>
                    <!-- /.vabout-subtext -->
                </div>
                <!-- /.vabout-item -->
                <div class="vabout-item">
                    <div class="vabout-subtitle">Тип судна:</div>
                    <!-- /.vabout-subtitle -->
                    <div class="vabout-subtext" v-html="shipToAdd.ship_type"></div>
                    <!-- /.vabout-subtext -->
                </div>
                <!-- /.vabout-item -->
                <div class="vabout-item">
                    <div class="vabout-subtitle">DWT (t) - валовая вместимость:</div>
                    <!-- /.vabout-subtitle -->
                    <div class="vabout-subtext" v-html="shipToAdd.dwt"></div>
                    <!-- /.vabout-subtext -->
                </div>
                <!-- /.vabout-item -->
                <div class="vabout-item">
                    <div class="vabout-subtitle">Длина</div>
                    <!-- /.vabout-subtitle -->
                    <div class="vabout-subtext" v-html="shipToAdd.length"></div>
                    <!-- /.vabout-subtext -->
                </div>
                <!-- /.vabout-item -->
                <div class="vabout-item">
                    <div class="vabout-subtitle">IMO:</div>
                    <!-- /.vabout-subtitle -->
                    <div class="vabout-subtext" v-html="shipToAdd.imo"></div>
                    <!-- /.vabout-subtext -->
                </div>
                <!-- /.vabout-item -->

                <div class="vabout-item">
                    <div class="vabout-subtitle">Год постройки:</div>
                    <!-- /.vabout-subtitle -->
                    <div class="vabout-subtext" v-html="shipToAdd.year_built"></div>
                    <!-- /.vabout-subtext -->
                </div>
                <!-- /.vabout-item -->

                <div class="vabout-item">
                    <div class="vabout-subtitle">kW - двигательная установка:</div>
                    <!-- /.vabout-subtitle -->
                    <div class="vabout-subtext" v-html="shipToAdd.kw"></div>
                    <!-- /.vabout-subtext -->
                </div>
                <!-- /.vabout-item -->

                <div class="vabout-item">
                    <div class="vabout-subtitle">Ширина:</div>
                    <!-- /.vabout-subtitle -->
                    <div class="vabout-subtext" v-html="shipToAdd.width"></div>
                    <!-- /.vabout-subtext -->
                </div>
                <!-- /.vabout-item -->
            </div>
            <!-- /.vabout-info -->
        </div>
        <!-- /.modal-block -->

        <button :class="{ mbdis: !sendEnable }" class="modal-button" @click="send">
            <img src="assets/img/modal/plus-white.png" alt="image">
            Добавить в «мои суда»
        </button>
        <!-- /.modal-button -->

    </div>
    <div
            :class="['header-overlay', { 'header-overlay__active': isOpen }]"
            @click="closeModal('existingship')"
    ></div>
</template>

<script setup>
    import {useModalStore} from "~/store/modal";
    import AfCloseModal from "@/components/uikit/AfCloseModal";
    import AfDropDox from "@/components/uikit/AfDropDox";

    import {ref} from "vue";
    import api from "@/api/api";

    import {useUsersStore} from "~/store/useUserStore";
    
    import watchScrollModal from "~/utils/watchScrollModal";

    const userStore = useUsersStore();
    const {userInfo, isAuth} = storeToRefs(userStore)

    const {closeModal, toggleModal} = useModalStore();

    const props = defineProps({
        isOpen: {
            type: Boolean,
        },
    });

    const unregistered = ref();
    const unregisteredNames = ref([]);

    const sendEnable = ref(false);

    const unregisteredShip = ref('');
    const shipToAdd = ref({
        dwt: "-",
        imo: "-",
        kw: "-",
        length: "-",
        ship_type: "-",
        vessel_name: "-",
        width: "-",
        year_built: "-",
        _id: ""
    });

    const init = async () => {
      unregistered.value = []
      if (userInfo.value.info.role == 'Компания') {
        try {
          await api.get("/navy/unregistered?email=" + userInfo.value.info.email).then((data) => {
            unregistered.value = data.data

            let tmp = [];
            for (let i = 0; i < data.data.length; i++) {
              tmp.push(data.data[i].vessel_name);
            }
            unregisteredNames.value = tmp;
          });
        } catch (e) {
          console.log('unregistered vessels',e)
        }
      }

    }
    if (isAuth.value) {
        init();
    }

    watch(unregisteredShip, () => {
        sendEnable.value = false;
        shipToAdd.value = {
            dwt: "-",
            imo: "-",
            kw: "-",
            length: "-",
            ship_type: "-",
            vessel_name: "-",
            width: "-",
            year_built: "-",
            _id: ""
        };
        for (let i = 0; i < unregistered.value.length; i++) {
            if (unregistered.value[i].vessel_name == unregisteredShip.value) {
                shipToAdd.value = unregistered.value[i];
                sendEnable.value = true;
            }
        }
    });

    watch(() => props.isOpen, watchScrollModal)

    const send = async () => {

        if (sendEnable) {
            try {
                await api.post("/navy/register_existing?id=" + shipToAdd.value._id + '&email=' + userInfo.value.info.email).then((data) => {
                    window.location.reload();
                });
            } catch (e) {
                sendEnable.value = false
            }
        }


    }
</script>

<style scoped>

#add-existing-ship {
    padding: 20px 20px 0px 20px ;
    overflow: hidden;
}
</style>