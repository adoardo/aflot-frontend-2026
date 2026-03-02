<template>
    <ClientOnly>
        <NuxtLayout name="default-hero">
            <div class="section-hero section-hero-mal">
                <AfCustomHeader />
                <div class="hero hero-mal">
                    <div class="container">
                        <div class="hero-block hero-block-mal">
                            <div class="vabout-top-block">
                                <a href="/mailing-results" class="vabout-cursor">
                                    ←
                                </a>
                                <div class="vabout-pag">
                                    <a href="/mailing-results" class="vabout-pag-link">Ко всем результатам рассылок</a>
                                </div>
                            </div>
                            <h1 class="hero-title">
                                Результаты рассылки от {{ formattedDate || "-" }}
                            </h1>
                            <div class="hero-title-date">
                                {{ mailing?.vacancy_title || "Без названия" }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section class="section-flot">
                <div class="container">
                    <div class="let">
                        <div class="let-block let-block2">
                            <div class="let-part">
                                <div class="let-top">
                                    <div class="let-top-title">
                                        Было отправлено морякам <span>{{ totalSent }} предложений</span>
                                    </div>
                                </div>

                                <div class="tabs let-tabs">
                                    <div class="tab-header">
                                        <div class="tab-label" @click="setTab(1)" :class="{ active: tab1 }">Принято
                                        </div>
                                        <div class="tab-label" @click="setTab(2)" :class="{ active: tab2 }">Отклонено
                                        </div>
                                        <div class="tab-label" @click="setTab(3)" :class="{ active: tab3 }">Не
                                            определилось</div>
                                    </div>

                                    <!-- Accepted -->
                                    <div v-if="tab1" class="tab-body">
                                        <div class="mal-table-block let-table-block let-table-block2">
                                            <table class="his-table let-table let-table2">
                                                <tbody>
                                                    <tr class="his-tr">
                                                        <th class="his-th">№</th>
                                                        <th class="his-th">ФИО</th>
                                                        <th class="his-th">Должность</th>
                                                        <th class="his-th">Зарплата</th>
                                                        <th class="his-th">Местонахождение</th>
                                                        <th class="his-th">Работал на судах</th>
                                                        <th class="his-th">Результат</th>
                                                    </tr>

                                                    <tr v-for="(s, i) in acceptedList" :key="'acc-' + i"
                                                        class="his-tr let-tr-red">
                                                        <td class="his-td">
                                                            <div class="let-td-num">{{ i + 1 }}</div>
                                                        </td>
                                                        <td class="his-td"><a :href="`/sailor/${s._id}`"
                                                                class="let-td-name"> {{ s.fio }}</a></td>
                                                        <td class="his-td">
                                                            <AbbrList :items="s.positions ?? s.position" />
                                                        </td>
                                                        <td class="his-td">
                                                            <template v-if="s.salary">{{ s.salary }} USD</template>
                                                            <template v-else-if="s.salary_from">от {{ s.salary_from }}
                                                                USD</template>
                                                            <template v-else-if="s.salary_to">до {{ s.salary_to }}
                                                                USD</template>
                                                            <template v-else>—</template>
                                                        </td>
                                                        <td class="his-td">
                                                            <AbbrList :items="s.location" />
                                                        </td>
                                                        <td class="his-td">
                                                            {{ s.vessel_experience.slice(0, 2).join(', ') }}
                                                            <span v-if="s.vessel_experience.length > 2"
                                                                class="let-td-link">
                                                                еще {{ s.vessel_experience.length - 2 }}
                                                            </span>
                                                        </td>
                                                        <td class="his-td">
                                                            <div class="let-td-button">Принято</div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <!-- Rejected -->
                                    <div v-if="tab2" class="tab-body">
                                        <div class="mal-table-block let-table-block let-table-block2">
                                            <table class="his-table let-table let-table2">
                                                <tbody>
                                                    <tr class="his-tr">
                                                        <th class="his-th">№</th>
                                                        <th class="his-th">ФИО</th>
                                                        <th class="his-th">Должность</th>
                                                        <th class="his-th">Зарплата</th>
                                                        <th class="his-th">Местонахождение</th>
                                                        <th class="his-th">Работал на судах</th>
                                                        <th class="his-th">Результат</th>
                                                    </tr>

                                                    <tr v-for="(s, i) in rejectedList" :key="'rej-' + i"
                                                        class="his-tr let-tr-blue">
                                                        <td class="his-td">
                                                            <div class="let-td-num">{{ i + 1 }}</div>
                                                        </td>
                                                        <td class="his-td"><a :href="`/sailor/${s._id}`"
                                                                class="let-td-name">{{ s.fio }}</a></td>
                                                        <td class="his-td">
                                                            <AbbrList :items="s.positions ?? s.position" />
                                                        </td>
                                                        <td class="his-td">
                                                            <template v-if="s.salary_from && s.salary_to">{{
                                                                s.salary_from }} - {{ s.salary_to }} USD</template>
                                                            <template v-else-if="s.salary_from">от {{ s.salary_from }}
                                                                USD</template>
                                                            <template v-else-if="s.salary_to">до {{ s.salary_to }}
                                                                USD</template>
                                                            <template v-else>—</template>
                                                        </td>
                                                        <td class="his-td">
                                                            <AbbrList :items="s.location" />
                                                        </td>
                                                        <td class="his-td">
                                                            {{ s.vessel_experience.slice(0, 2).join(', ') }}
                                                            <span v-if="s.vessel_experience.length > 2"
                                                                class="let-td-link">
                                                                еще {{ s.vessel_experience.length - 2 }}
                                                            </span>
                                                        </td>
                                                        <td class="his-td">
                                                            <div class="let-td-button">Отклонено</div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <!-- Undecided -->
                                    <div v-if="tab3" class="tab-body">
                                        <div class="mal-table-block let-table-block let-table-block2">
                                            <table class="his-table let-table let-table2">
                                                <tbody>
                                                    <tr class="his-tr">
                                                        <th class="his-th">№</th>
                                                        <th class="his-th">ФИО</th>
                                                        <th class="his-th">Должность</th>
                                                        <th class="his-th">Зарплата</th>
                                                        <th class="his-th">Местонахождение</th>
                                                        <th class="his-th">Работал на судах</th>
                                                        <th class="his-th">Результат</th>
                                                    </tr>

                                                    <tr v-for="(s, i) in undecidedList" :key="'und-' + i"
                                                        class="his-tr let-tr-gray">
                                                        <td class="his-td">
                                                            <div class="let-td-num">{{ i + 1 }}</div>
                                                        </td>
                                                        <td class="his-td"><a :href="`/sailor/${s._id}`"
                                                                class="let-td-name">{{ s.fio }}</a></td>
                                                        <td class="his-td">
                                                            <AbbrList :items="s.positions ?? s.position" />
                                                        </td>
                                                        <td class="his-td">
                                                            <div>{{ s.salary }} RUB</div>
                                                        </td>
                                                        <td class="his-td">
                                                            <AbbrList :items="s.location" />
                                                        </td>
                                                        <td class="his-td">
                                                            {{ s.vessel_experience.slice(0, 2).join(', ') }}
                                                            <span v-if="s.vessel_experience.length > 2"
                                                                class="let-td-link">
                                                                еще {{ s.vessel_experience.length - 2 }}
                                                            </span>
                                                        </td>
                                                        <td class="his-td">
                                                            <div class="let-td-button">Не решил</div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="let-part">
                                <div class="let-end">
                                    <div class="let-end-top">
                                        <div class="let-end-title">
                                            Итого:
                                            <span>{{ totalSent }} предложений</span>
                                        </div>
                                    </div>
                                    <div class="let-end-block">
                                        <div class="let-end-item">
                                            Принято:
                                            <span>{{ totalAccepted }} предложений</span>
                                        </div>
                                        <div class="let-end-item">
                                            Отклонено:
                                            <span>{{ totalRejected }} предложений</span>
                                        </div>
                                        <div class="let-end-item">
                                            Не определилось:
                                            <span>{{ totalUndecided }} предложений</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <AfCustomFooter />
        </NuxtLayout>
    </ClientOnly>
</template>

<script setup>
import { useRoute } from "vue-router"
import api from "@/api/api"
import { ref, onMounted, nextTick, defineComponent, computed, h } from "vue"

const mon = ref([
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
])
const formattedDate = ref('');

// ✅ normalize: array | string | object -> string[]
const normalizeToArray = (v) => {
    if (!v) return []
    if (Array.isArray(v)) {
        return v
            .map(x => (typeof x === "string" ? x : (x?.name ?? x?.title ?? String(x))))
            .map(x => String(x).trim())
            .filter(Boolean)
    }
    if (typeof v === "object") {
        // если прилетит объект (например country/region/city) — берём значения
        return Object.values(v).map(x => String(x).trim()).filter(Boolean)
    }
    return [String(v).trim()].filter(Boolean)
}

// ✅ Vue-friendly tooltip list (NO v-html)
const AbbrList = defineComponent({
    name: "AbbrList",
    props: {
        items: { type: [Array, String, Object], default: () => [] },
        emptyText: { type: String, default: "-" },
    },
    setup(props) {
        const arr = computed(() => normalizeToArray(props.items))
        return () => {
            const list = arr.value
            const first = list[0] ?? props.emptyText
            const rest = list.slice(1)

            if (!rest.length) return h("span", first)

            return h("span", { class: "with-tooltip" }, [
                first,
                h("span", { class: "tooltip-content" }, rest.map((it, i) => h("div", { key: i }, it))),
            ])
        }
    },
})

definePageMeta({
    middleware: ["company"],
})

const route = useRoute()
const mailingId = ref(null)
const mailing = ref(null)
const acceptedList = ref([])
const rejectedList = ref([])
const undecidedList = ref([])
const totalSent = ref(0)
const totalAccepted = ref(0)
const totalRejected = ref(0)
const totalUndecided = ref(0)

// Tabs
const tab1 = ref(true)
const tab2 = ref(false)
const tab3 = ref(false)
function setTab(n) { tab1.value = n === 1; tab2.value = n === 2; tab3.value = n === 3 }

// === Force client execution ===
onMounted(async () => {
    await nextTick()
    const params = new URLSearchParams(window.location.search);
    mailingId.value = params.get("m");
    console.log("mailingId:", mailingId.value)

    if (!mailingId.value) {
        console.warn("❌ No mailing_id in URL")
        return
    }

    await fetchMailingDetails()
})

async function fetchMailingDetails() {
    console.log("fetchMailingDetails() called ✅")
    try {
        const { data } = await api.get(`/mailing-results/${mailingId.value}`)
        mailing.value = data
        console.log(data)
        console.log("data")

        let tmp = mailing.value.mailing_date
        tmp = tmp.split('-')
        let month = mon.value[tmp[1] - 1].toUpperCase();
        formattedDate.value = parseInt(tmp[2]) + ' ' + month + ' ' + tmp[0]

        acceptedList.value = data.sailors.filter(s => s.response === "accepted")
        rejectedList.value = data.sailors.filter(s => s.response === "rejected")
        undecidedList.value = data.sailors.filter(s => !s.response || s.response === "undecided")

        totalSent.value = data.total_sent || data.sailors.length
        totalAccepted.value = acceptedList.value.length
        totalRejected.value = rejectedList.value.length
        totalUndecided.value = undecidedList.value.length
    } catch (err) {
        console.error("Ошибка загрузки данных рассылки:", err)
    }
}
</script>

<style lang="scss" scoped>
.tarif-list a.tactive {
    border-bottom: 4px solid #3b45a9;
    color: #3b45a9;
}

.tab-body {
    display: block;
}

.let-td-name {
    cursor: pointer !important;
}

:deep(.with-tooltip) {
    position: relative;
    cursor: default;
    display: inline-block;
    color: #333;
}

:deep(.tooltip-content) {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    top: 100%;
    left: 0;
    width: max-content;
    background: white;
    border: 1px solid #ccc;
    padding: 6px 10px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    z-index: 10;
    transition: opacity 0.2s;
    white-space: nowrap;
}

:deep(.with-tooltip:hover .tooltip-content) {
    visibility: visible;
    opacity: 1;
}
</style>