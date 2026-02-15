<template>
    <div
            class="menu-reg menu-none menu-reg-sailor cabinet"
            id="msocwhois-modal"
            :class="{ 'menu-show': isOpen }"
    >
        <div class="modal-block">
            <div class="modal-top">
                <h2 class="modal-title">
                    Пожалуйста, выберите кто Вы
                </h2>
                <!-- /.modal-title -->
                <img @click="closeModal('msocwhois')" class="js-modal-close modal-close" src="assets/img/modal/close.png" alt="image">

            </div>
            <!-- /.modal-top -->

            <div class="suda-item__text suda-item-role-sel">
                <label>
                    <input id="def-ckh" type="checkbox" class="radio" ckecked value="1" @click="changeRole('seilor')" name="fooby[1][]" />Моряк</label>
                <label>
                    <input type="checkbox" class="radio" value="1" @click="changeRole('company')" name="fooby[1][]" />Компания</label>
            </div>
            <button class="header-menu__button suda-item-role-accept" @click="submitRole">Подтвердить<span> → </span></button>
        </div>
        <!-- /.modal-button -->

    </div>
    <div
            :class="['header-overlay header-overlay-commonmodal', { 'header-overlay__active': isOpen }]"
            @click="closeModal('msocwhois')"
    ></div>
</template>

<script setup>
    import {useModalStore} from "~/store/modal";
    import { useUsersStore } from "~/store/useUserStore";
    import watchScrollModal from "~/utils/watchScrollModal";

    const {closeModal, openModal, toggleModal} = useModalStore();
    const userStore = useUsersStore();

    const props = defineProps({
        isOpen: {
            type: Boolean,
        },
        msg: {
            type: String,
            default: 'Ошибка. Пожалуйста, попробуйте позже.',
        },
    });

    let role = ref("seilor");

    watch(() => props.isOpen, watchScrollModal)

    const submitRole = async () => {
        closeModal('msocwhois')
        openModal(role)
    }

    const changeRole = async (r) => {
        role = r;
        userStore.setAuthRole(r)
    }

    onMounted(() => {
        $(".suda-item-role-sel input:checkbox").on('click', function() {
            // in the handler, 'this' refers to the box clicked on
            var $box = $(this);
            $("label").removeClass("ckeched-st");

            $box.parent().addClass("ckeched-st");
            // the name of the box is retrieved using the .attr() method
            // as it is assumed and expected to be immutable
            var group = "input:checkbox[name='" + $box.attr("name") + "']";
            // the checked state of the group/box on the other hand will change
            // and the current value is retrieved using .prop() method
            $(group).prop("checked", false);
            $box.prop("checked", true);

            console.log(role.currentRole);
        });

        $('#def-ckh').click();
    });

</script>

<style>
    .header-overlay__active.header-overlay-commonmodal {
        z-index: 30;
    }
    .menu-reg.menu-show#msocwhois-modal {
        z-index: 40 !important;
    }

    #msocwhois-modal {
      [type="checkbox"] {
        position: absolute;
        left: 12px;
        top: 15px;
        z-index: 0;
      }
      [type="checkbox"] + label {
        position: absolute;
      }
      [type="checkbox"] + label::before {
        width: 15px;
        height: 15px;
        border-radius: 5px;
        border: 2px solid #8cad2d;
        background-color: #fff;
        display: block;
        content: "";
        float: left;
        margin-right: 5px;
        z-index: 5;
        position: relative;
      }
      [type="checkbox"]:checked+label::before {
        box-shadow: inset 0px 0px 0px 3px #fff;
        background-color: #8cad2d;
      }
    }


    .suda-item-role-sel {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
    }
    .suda-item-role-sel label {
        position: relative;
        border: 1px solid transparent;
        padding: 10px;
        margin-bottom: 10px;
        width: 220px;
        padding-left: 40px;
        font-size: 22px;
        cursor:pointer;
        transition: .2s;
        font-weight: 600;
    }
    .suda-item-role-sel label:hover {
        border: 1px solid #ababff;
    }
    .suda-item-role-sel label.ckeched-st {
        border: 1px solid #ababff;
    }
    .ckeched-st::before {
        display: flex;
        position: absolute;
        width:50px;
        height:50px;
        background: red;
        left:0px;
        top:0px;
    }
</style>
