<template>
  <q-dialog
    v-model="props.show"
    persistent
    :maximized="true"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-toolbar class="bg-primary">
        <q-btn dense flat round icon="mdi-arrow-left" class="q-mr-sm"
               @click="closeDialog()"
        >
          <q-tooltip>
            Close
          </q-tooltip>
        </q-btn>
        <span style="font-size: 19px">Select Ammunition</span>
      </q-toolbar>

      <q-card-section>
        <q-input v-model="searchInput" label="Search">
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
      >
        <template #header-cell-name="props">
          <q-th :props="props">
            <q-icon name="mdi-lead-pencil" size="xs" color="bullet" />
            {{ props.col.label }}
          </q-th>
        </template>

        <template #header-cell-penetration="props">
          <q-th :props="props">
            <q-icon name="mdi-arrow-collapse-right" size="xs" color="bullet" />
            {{ props.col.label }}
          </q-th>
        </template>

        <template #header-cell-damage="props">
          <q-th :props="props">
            <q-icon name="mdi-heart-broken" size="xs" color="bullet" />
            {{ props.col.label }}
          </q-th>
        </template>

        <template #body="props">
          <q-tr :props="props" @click="onRowClick(props.row)">
            <q-td key="name" :props="props">
              <div>{{ props.row.shortName }}</div>
              <div class="greyed-text">
                <q-icon name="mdi-bullet" /><span>{{ props.row.caliber }}</span>
              </div>
              <div class="money">
                <q-icon name="mdi-currency-rub" /><span>{{ props.row.price > 0 ? numberWithCommas(props.row.price) : '?' }}</span>
              </div>
            </q-td>

            <q-td key="penetration" :props="props">
              {{ props.row.penetration }}
            </q-td>

            <q-td key="damage" :props="props">
              {{ props.row.damage }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from 'vue'
import { Ammunition } from 'src/models/items/Ammunition'
import { AmmunitionRow } from 'src/components/_models/AmmunitionRow'

export default defineComponent({
  name: 'AmmunitionListDialog',
  props: {
    show: {
      type: Boolean,
      required: true
    },
    ammunitions: {
      type: Array as PropType<Ammunition[]>,
      required: true
    }
  },
  emits: [
    'closeDialog', 
    'selectRow'
  ],
  setup (props, { emit }) {
    const closeDialog = () => {
      emit('closeDialog')
    }

    const searchInput = ref('')

    function onRowClick (row: AmmunitionRow) {
      emit('selectRow', row)
      emit('closeDialog')
    }

    function createRows (ammunitions: Ammunition[]): AmmunitionRow[] {
      const rows: AmmunitionRow[] = []
      for (const ammunition of ammunitions) {
        const row = new AmmunitionRow(
          ammunition.id,
          ammunition.shortName,
          ammunition.caliber,
          ammunition.penetration,
          ammunition.damage,
          ammunition.blightbusterIcon,
          ammunition.icon,
          ammunition.avg24hPrice)
        rows.push(row)
      }
      return rows
    }

    const rows = computed(() => {
      return createRows(props.ammunitions)
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
          name: 'penetration',
          required: true,
          label: 'Pen',
          field: 'penetration',
          align: 'center',
          sortable: true
        },
        {
          name: 'damage',
          required: true,
          label: 'Dmg',
          field: 'damage',
          align: 'center',
          sortable: true
        }
      ],
      visibleColumns: ['name', 'penetration', 'damage'],
      pagination: {
        rowsPerPage: 0,
        sortBy: 'penetration',
        descending: true
      }
    }

    function formatCellLength (string: string, maxLength: number): string {
      let newString = string.substring(0, maxLength)
      newString = string.length > maxLength ? newString.concat('...') : newString
      return newString
    }

    function numberWithCommas (x: number): string {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    return { 
      props, 
      closeDialog, 
      searchInput, 
      table, 
      rows,
      onRowClick, 
      formatCellLength, 
      numberWithCommas 
    }
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
</style>
