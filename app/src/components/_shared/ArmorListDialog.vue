<template>
  <q-dialog
    v-model="props.show"
    :maximized="$q.screen.lt.sm ? true : false"
    :transition-show="$q.screen.lt.sm ? 'slide-up' : ''"
    :transition-hide="$q.screen.lt.sm ? 'slide-down' : ''"
  >
    <q-card>
      <q-toolbar class="bg-dark">
        <template v-if="$q.screen.lt.sm ? true : false">
          <q-btn
            dense
            flat
            round
            :icon="Icon.Back"
            class="q-mr-sm"
            @click="closeDialog()"
          >
            <q-tooltip>Back</q-tooltip>
          </q-btn>
          <span style="font-size: 19px">Select Armor</span>
        </template>

        <template v-else>
          <span style="font-size: 19px">Select Armor</span>
          <q-space />
          <q-btn
            dense
            flat
            round
            class="q-ml-sm"
            :icon="Icon.Close"
            @click="closeDialog()"
          />
        </template>
      </q-toolbar>

      <q-card-section>
        <q-input v-model="searchInput" clearable label="Search">
          <template #prepend>
            <q-icon name="mdi-magnify" />
          </template>
        </q-input>
      </q-card-section>

      <q-table
        class="sticky-header-table"
        row-key="id"
        :rows="rows"
        :columns="table.columns"
        :visible-columns="table.visibleColumns"
        :pagination="table.pagination"
        :rows-per-page-options="[0]"
        :filter="searchInput"
        :loading="loading"
      >
        <template #header-cell-name="props">
          <q-th :props="props">
            <q-icon :name="Icon.Name" size="xs" color="armor" />
            {{ props.col.label }}
          </q-th>
        </template>

        <template #header-cell-class="props">
          <q-th :props="props">
            <q-icon :name="Icon.Armor" size="xs" color="armor" />
            {{ props.col.label }}
          </q-th>
        </template>

        <template #header-cell-maxDurability="props">
          <q-th :props="props">
            <q-icon :name="Icon.MaxDurability" size="xs" color="armor" />
            {{ props.col.label }}
          </q-th>
        </template>

        <template #body="props">
          <q-tr :props="props" @click="onRowClick(props.row)">
            <q-td key="name" :props="props">
              <q-intersection
                once
                transition="scale"
                class="avatar-intersection"
              >
                <q-avatar size="8vh" style="max-height: 100px; max-width: 100px;" rounded>
                  <img
                    style="object-fit: contain;"
                    :src="props.row.image" 
                    @error="$event.target.src=props.row.backupImage"
                  />
                </q-avatar>
              </q-intersection>
              <div>{{ props.row.shortName }}</div>
              <div class="greyed-text">
                <q-icon :name="Icon.ArmorType" /><span>{{ props.row.type.charAt(0).toUpperCase() + props.row.type.slice(1) }}</span>
              </div>
              <div class="money">
                <q-icon :name="Icon.MoneyRubles" /><span>{{ props.row.price > 0 ? numberWithCommas(props.row.price) : '?' }}</span>
              </div>
            </q-td>

            <q-td key="class" :props="props">
              {{ props.row.class }}
            </q-td>

            <q-td key="maxDurability" :props="props">
              {{ props.row.maxDurability }}
            </q-td>
          </q-tr>
        </template>

        <template #loading>
          <q-inner-loading showing>
            <q-spinner-gears size="8rem" color="primary" />
          </q-inner-loading>
        </template>
      </q-table>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from 'vue'
import { Armor } from 'src/models/items/Armor'
import { ArmorRow } from 'src/components/_models/ArmorRow'
import { Icon } from 'src/enums/icon'
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'ArmorListDialog',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    armors: {
      type: Array as PropType<Armor[]>,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    }
  },
  emits: [
    'closeDialog',
    'selectRow'
  ],
  setup (props, { emit }) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const $q = useQuasar();

    const closeDialog = () => {
      emit('closeDialog')
    }

    const searchInput = ref('')

    function onRowClick (row: ArmorRow) {
      emit('selectRow', row)
      emit('closeDialog')
    }

    function createRows (armors: Armor[]): ArmorRow[] {
      const rows: ArmorRow[] = []
      for (const armor of armors) {
        const row = new ArmorRow(
          armor.id,
          armor.shortName,
          armor.type,
          armor.armor.class,
          armor.armor.durability,
          armor.blightbusterIcon,
          armor.icon,
          armor.avg24hPrice)
        rows.push(row)
      }
      return rows
    }

    const rows = computed(() => {
      return createRows(props.armors)
    })

    const table = {
      columns: [
        {
          name: 'id',
          required: false,
          label: 'Id',
          field: 'id',
          align: 'left',
          sortable: false
        },
        {
          name: 'name',
          required: true,
          label: 'Name',
          field: 'shortName',
          align: 'left',
          sortable: true
        },
        {
          name: 'class',
          required: true,
          label: 'Class',
          field: 'class',
          align: 'center',
          sortable: true
        },
        {
          name: 'maxDurability',
          required: true,
          label: 'Durability',
          field: 'maxDurability',
          align: 'center',
          sortable: true
        }
      ],
      visibleColumns: ['name', 'class', 'maxDurability'],
      pagination: {
        rowsPerPage: 0,
        sortBy: 'class',
        descending: true
      }
    }

    function numberWithCommas (x: number): string {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    return { props, Icon, closeDialog, searchInput, table, rows, onRowClick, numberWithCommas }
  }
})
</script>

<style lang="scss">
  .sticky-header-table {
    /* height or max-height is important */
    max-height: 80%;
  }

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th {
    /* bg color is important for th; just specify one */
    background-color: $dark
  }

  thead tr th {
    position: sticky;
    z-index: 1;
  }

  thead tr:first-child th {
    top: 0;
  }

  tr {
    cursor: pointer;
  }

  .avatar-intersection {
    height: 8vh;
    width: 8vh;
    max-height: 100px;
    max-width:100px;
  }
</style>
